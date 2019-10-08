import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Globals } from '../globals.service';
import { BlogService } from '../blog.service';
import { MatAutocomplete, MatChipInputEvent, MatAutocompleteSelectedEvent } from '@angular/material';
import {Categories} from "shared"
import {ENTER, COMMA} from "@angular/cdk/keycodes"
import {Observable} from "rxjs"
import {map, startWith} from "rxjs/operators"
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.css']
})
export class ArticleFormComponent implements OnInit {


  seperationKeys: number[] = [ENTER, COMMA]
  tags: string[] = [];
  tagsOptions: Observable<string[]>;
  allTags = Categories;

  @ViewChild("tagInput", { static: false }) tagInput: ElementRef<HTMLInputElement>;
  @ViewChild("tagsAutocomplete", { static: false }) tagAutocomplete: MatAutocomplete;

  articleForm = new FormGroup({
    title: new FormControl(""),
    content: new FormControl(""),
    categories: new FormControl(this.tags),
    categoriesInput: new FormControl('')
  })


  constructor(public globals: Globals, private blogService: BlogService) { }

  get title(): AbstractControl {
    return this.articleForm.get("title");
  }
  get content(): AbstractControl {
    return this.articleForm.get("content");
  }

  ngOnInit() {

    this.articleForm.get("title").setValidators([
      Validators.minLength(this.globals.AtricleValidationGlobals.title.minLength),
      Validators.maxLength(this.globals.AtricleValidationGlobals.title.maxLength),
      Validators.pattern(this.globals.AtricleValidationGlobals.title.onlyIncludeRegex),
      this.globals.AtricleValidationGlobals.title.required ? Validators.required : null
    ])
    this.articleForm.get("content").setValidators([
      Validators.minLength(this.globals.AtricleValidationGlobals.content.minLength),
      Validators.maxLength(this.globals.AtricleValidationGlobals.content.maxLength),
      Validators.pattern(this.globals.AtricleValidationGlobals.content.onlyIncludeRegex),
      this.globals.AtricleValidationGlobals.content.required ? Validators.required : null
    ])
    this.articleForm.get("categories").setValidators(Validators.required);

    this.tagsOptions = this.articleForm.get("categoriesInput").valueChanges.pipe(
      startWith(null),
      map(value => {
        return value ? this._filterTagsOptions(value) : [...(this.allTags.filter(tag => this.tags.includes(tag) ? null : tag))]
      })
    )
  }

  submitArticle() {
    let article = {
      title: this.articleForm.get("title").value,
      content: this.articleForm.get("content").value,
      categories: this.tags
    }
    this.blogService.creatArticle(article);
  }

  addTag(event: MatChipInputEvent): void {
    if (this.tagAutocomplete.isOpen) return;

    const input = event.input;
    const value = event.value;
    if (value.trim() && this.allTags.includes(value)) {
      this.tags.push(value);
      input.value = "";
      this.articleForm.get("categoriesInput").setValue(null);
      this.articleForm.get("categories").setValue(this.tags);
    }
  }

  removeTag(tagToRemove: string) {
    this.tags = this.tags.filter(tag => tag === tagToRemove ? null : tag);
    this.articleForm.get("categoriesInput").setValue(null);
  }

  onSelectChip(chip) {
    this.removeTag(chip);
    this.tagInput.nativeElement.value = chip;
    this.articleForm.get("categories").setValue(chip);
  }

  onSelectTag(event: MatAutocompleteSelectedEvent) {
    this.tags.push(event.option.viewValue);
    this.tagInput.nativeElement.value = "";
    this.articleForm.get("categoriesInput").setValue(null);
    this.articleForm.get("categories").setValue(this.tags)
  }

  private _filterTagsOptions(value: string): string[] {
    const filterValue = value.toLocaleLowerCase();
    return this.allTags.filter((tag) => {
      if (this.tags.includes(tag)) return null;
      return tag.toLocaleLowerCase().includes(filterValue) ? tag : null;
    })
  }

}
