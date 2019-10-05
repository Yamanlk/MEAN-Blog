import {Injectable} from '@angular/core'
import {UserValidator, ArticleValidatior, Categories} from 'shared'

@Injectable({
    providedIn: "root"
})
export class Globals {
    UserValidationGlobals = {...UserValidator}
    AtricleValidationGlobals = {...ArticleValidatior, categories: Categories}
}