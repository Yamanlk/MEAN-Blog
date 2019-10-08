import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ENTER, COMMA } from "@angular/cdk/keycodes"
import { MatChipInputEvent, MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  seperationKeys: number[] = [ENTER, COMMA]
  languages: string[] = [];
  languageOptions: Observable<string[]>;
  allLanguages = ["Nodejs", "Express", "Angular", "React"];

  @ViewChild("languagesInput", { static: false }) languageInput: ElementRef<HTMLInputElement>;
  @ViewChild("languagesAutocomplete", { static: false }) languagesAutocomplete: MatAutocomplete;

  boiForm = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    email: new FormControl(''),
    languages: new FormControl(this.languages)
  })

  constructor() { }

  ngOnInit() {
    this.languageOptions = this.boiForm.controls.languages.valueChanges.pipe(
      startWith(null),
      map(value => {
        return value ? this._filterLanguageOptions(value) : [...(this.allLanguages.filter(language => this.languages.includes(language) ? null : language))]
      })
    )
  }

  addLanguage(event: MatChipInputEvent): void {
    if (this.languagesAutocomplete.isOpen) return;

    const input = event.input;
    const value = event.value;
    if (value.trim() && this.allLanguages.includes(value)) {
      this.languages.push(value);
      input.value = "";
      this.boiForm.controls.languages.setValue(null);
    }
  }

  removeLanguage(languageToRemove: string) {
    this.languages = this.languages.filter(language => language === languageToRemove ? null : language);
    this.boiForm.controls.languages.setValue(null);
  }

  onSelectChip(chip) {
    this.removeLanguage(chip);
    this.languageInput.nativeElement.value = chip;
    this.boiForm.controls.languages.setValue(chip);
  }

  onSelectLanguage(event: MatAutocompleteSelectedEvent) {
    this.languages.push(event.option.viewValue);
    this.languageInput.nativeElement.value = "";
    this.boiForm.controls.languages.setValue(null)
  }
  private _filterLanguageOptions(value: string): string[] {
    const filterValue = value.toLocaleLowerCase();
    return this.allLanguages.filter((language) => {
      if(this.languages.includes(language)) return null;
      return language.toLocaleLowerCase().includes(filterValue) ? language : null;
    })
  }

}
