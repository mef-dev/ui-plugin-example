import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
    selector: 'app-example',
    templateUrl: './example.component.html',
    styleUrls: ['./example.component.scss'],
})
export class ExampleComponent  {
    options: FormGroup;
    agreeRequiredControl = new FormControl(false);
    firstNameControl = new FormControl('');
    surnameControl = new FormControl('');
    emailControl = new FormControl('');

    constructor(fb: FormBuilder) {
        this.options = fb.group({
            agreeRequired: this.agreeRequiredControl,
            firstName: this.firstNameControl,
            surname: this.surnameControl,
            email: this.emailControl,
        });
    }
}
