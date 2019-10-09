import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ENTER, COMMA } from "@angular/cdk/keycodes"
import { MatChipInputEvent, MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material';
import { Observable, Subscription } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Categories, ISUser } from "shared"
import { UserAuthenticationService } from '../user-authentication.service';
import { Router } from '@angular/router';
import { Globals } from '../globals.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {

  seperationKeys: number[] = [ENTER, COMMA]
  languages: string[] = [];
  languageOptions: Observable<string[]>;
  allLanguages = Categories;

  @ViewChild("languagesInput", { static: false }) languageInput: ElementRef<HTMLInputElement>;
  @ViewChild("languagesAutocomplete", { static: false }) languagesAutocomplete: MatAutocomplete;


  user: ISUser;
  userSubscription: Subscription;
  boiForm = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    //should be added in user schema in mongodb
    // email: new FormControl(''),
    // languages: new FormControl(this.languages)
  })

  constructor(private authentecationService: UserAuthenticationService, private router: Router, public globals: Globals) { }

  public get firstname(): AbstractControl {
    return this.boiForm.get("firstname")
  }

  public get lastname(): AbstractControl {
    return this.boiForm.get("lastname");
  }

  ngOnInit() {
    this.boiForm.controls.firstname.setValidators([
      Validators.minLength(this.globals.UserValidationGlobals.firstname.minLength),
      Validators.maxLength(this.globals.UserValidationGlobals.firstname.maxLength),
      Validators.pattern(this.globals.UserValidationGlobals.firstname.onlyIncludeRegex),
      this.globals.UserValidationGlobals.firstname.required ? Validators.required: undefined
    ])

    this.boiForm.controls.lastname.setValidators([
      Validators.minLength(this.globals.UserValidationGlobals.lastname.minLength),
      Validators.maxLength(this.globals.UserValidationGlobals.lastname.maxLength),
      Validators.pattern(this.globals.UserValidationGlobals.lastname.onlyIncludeRegex),
      this.globals.UserValidationGlobals.lastname.required ? Validators.required: undefined
    ])

    this.userSubscription = this.authentecationService.loggedUserSubject.subscribe(user => {
      this.user = user
    })
    this.user = this.authentecationService.getUser();
    if (!this.user) { this.router.navigateByUrl(""); }
    this.boiForm.setValue({
      firstname: this.user.firstname,
      lastname: this.user.lastname,
      // email: "",
      // languages: []
    })

    // this.languageOptions = this.boiForm.controls.languages.valueChanges.pipe(
    //   startWith(null),
    //   map(value => {
    //     return value ? this._filterLanguageOptions(value) : [...(this.allLanguages.filter(language => this.languages.includes(language) ? null : language))]
    //   })
    // )
  }


  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
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

  submitForm() {
    let newUser = this.boiForm.value;
    this.authentecationService.updateUser(newUser);
  }

  private _filterLanguageOptions(value: string): string[] {
    const filterValue = value.toLocaleLowerCase();
    return this.allLanguages.filter((language) => {
      if (this.languages.includes(language)) return null;
      return language.toLocaleLowerCase().includes(filterValue) ? language : null;
    })
  }

}
