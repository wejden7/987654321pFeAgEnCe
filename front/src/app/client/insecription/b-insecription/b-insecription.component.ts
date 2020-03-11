import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from"../../helpers/must-match.validator";


@Component({
  selector: 'app-b-insecription',
  templateUrl: './b-insecription.component.html',
  styleUrls: ['./b-insecription.component.css']
})
export class BInsecriptionComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  mobNumberPattern = "^((\\+91-?)|0)?[0-9]{8}$";  
  
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
            this.registerForm = this.formBuilder.group({

                email: ['', [Validators.required, Validators.email]],
                nom:['', [Validators.required, Validators.pattern(this.mobNumberPattern)]],
                prenom:['', Validators.required],
                password: ['', [Validators.required, Validators.minLength(8)]],
                confirmPassword: ['', Validators.required],
              }, {
                validator: MustMatch('password', 'confirmPassword')
     
              });
   
  
}
get f() { return this.registerForm.controls; }
          onSubmit() {
                this.submitted = true;
// stop here if form is invalid
                    if (this.registerForm.invalid) {
                           return;
                       }
  // display form values on success
                      alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
                      }

}
