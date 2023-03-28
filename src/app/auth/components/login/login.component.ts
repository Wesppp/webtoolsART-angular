import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
import {BackendErrorsInterface} from "../../../shared/types/backendErrors.interface";
import {select, Store} from "@ngrx/store";
import {backendErrorsSelector, isSubmittingSelector} from "../../store/selectors";
import {loginAction} from "../../store/actions/login.action";
import {LoginRequestInterface} from "../../types/loginRequest.interface";
import {ClearAuthFormService} from "../../services/clear-auth-form.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../../shared/styles/formStyles.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
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

  initializeListeners(): void {
    this.clearFormSubscription = this.clearAuthFormService.clearForm$
      .subscribe(() => this.form.reset())
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
  }

  ngOnDestroy(): void {
    this.clearFormSubscription.unsubscribe()
  }
}
