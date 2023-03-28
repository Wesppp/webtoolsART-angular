import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RxwebValidators } from "@rxweb/reactive-form-validators";
import {select, Store} from "@ngrx/store";
import { registerAction } from "../../store/actions/register.action";
import { RegisterRequestInterface } from "../../types/registerRequest.interface";
import {Observable, Subscription} from "rxjs";
import {backendErrorsSelector, isSubmittingSelector} from "../../store/selectors";
import {BackendErrorsInterface} from "../../../shared/types/backendErrors.interface";
import {ClearAuthFormService} from "../../services/clear-auth-form.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../../../shared/styles/formStyles.scss']
})
export class RegisterComponent implements OnInit, OnDestroy{
  public form!: FormGroup

  public isSubmitting$!: Observable<boolean>
  public errors$!: Observable<BackendErrorsInterface | null>
  private clearFormSubscription!: Subscription

  constructor(private fb: FormBuilder,
              private store: Store,
              private clearAuthFormService: ClearAuthFormService) {
  }

  ngOnInit(): void {
    this.createForm()
    this.initializeValues()
    this.initializeListeners()
  }

  createForm(): void {
    this.form = this.fb.group({
      username: ['',
        [
          Validators.required,
          Validators.maxLength(20)
        ]
      ],
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
      ],
      comparePassword: ['',
        [
          Validators.required,
          Validators.minLength(8),
          RxwebValidators.compare({fieldName:'password'})
        ]
      ]
    })
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
    this.errors$ = this.store.pipe(select(backendErrorsSelector))
  }

  initializeListeners(): void {
    this.clearFormSubscription = this.clearAuthFormService.clearForm$
      .subscribe(() => this.form.reset())
  }

  get username() {
    return this.form.get('username')
  }

  get email() {
    return this.form.get('email')
  }

  get password() {
    return this.form.get('password')
  }

  get comparePassword() {
    return this.form.get('comparePassword')
  }


  submit(): void {
    if (this.form.invalid) { return }
    const request: RegisterRequestInterface = {
      username: this.form.value.username,
      password: this.form.value.password,
      email: this.form.value.email
    }

    this.store.dispatch(registerAction({request}))
  }

  ngOnDestroy(): void {
    this.clearFormSubscription.unsubscribe()
  }
}
