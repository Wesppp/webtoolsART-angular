import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {BackendErrorsInterface} from "../../../shared/types/backendErrors.interface";
import {select, Store} from "@ngrx/store";
import {backendErrorsSelector, isSubmittingSelector} from "../../store/selectors";
import {loginAction} from "../../store/actions/login.action";
import {LoginRequestInterface} from "../../types/loginRequest.interface";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../../shared/styles/formStyles.scss']
})
export class LoginComponent implements OnInit {
  public form!: FormGroup

  public isSubmitting$!: Observable<boolean>
  public errors$!: Observable<BackendErrorsInterface | null>

  constructor(private fb: FormBuilder,
              private store: Store) {
  }

  ngOnInit(): void {
    this.createForm()
    this.initializeValues()
  }

  createForm(): void {
    this.form = this.fb.group({
      email: ['',
        [
          Validators.email,
          Validators.required
        ]
      ],
      password: ['',
        [
          Validators.required,
          Validators.minLength(8)
        ]
      ]
    })
  }

  initializeValues(): void {
    this.errors$ = this.store.pipe(select(backendErrorsSelector))
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
  }

  get email() {
    return this.form.get('email')
  }

  get password() {
    return this.form.get('password')
  }

  submit(): void {
    if (this.form.invalid) { return }
    const request: LoginRequestInterface = this.form.value
    this.store.dispatch(loginAction({request}))

    this.form.reset()
  }
}
