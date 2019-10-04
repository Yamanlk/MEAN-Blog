import {Injectable} from '@angular/core'
import {UserValidator} from 'shared'

@Injectable({
    providedIn: "root"
})
export class Globals {
    UserValidationGlobals = {...UserValidator}
}