import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FormValueInterface} from "../../types/formValue.interface";
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {isLoggedInSelector} from "../../../../../auth/store/selectors";

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit {
  @Input() isSubmitting!: boolean
  @Input() commentText: string = ''
  @Input() submitButtonLabel: string = 'Send'

  @Output() submitFormEvent = new EventEmitter<FormValueInterface>()

  public form!: FormGroup
  public isLoggedIn$!: Observable<boolean>

  constructor(private fb: FormBuilder,
              private store: Store) {
  }

  ngOnInit(): void {
    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector))
    this.createForm()
  }

  createForm(): void {
    this.form = this.fb.group({
      text: [this.commentText, [
        Validators.required,
        Validators.maxLength(400),
        Validators.minLength(2)
      ]]
    })
  }

  get text() {
    return this.form.get('text')
  }

  submitForm(formValue: FormValueInterface) {
    this.submitFormEvent.emit(formValue)
    this.form.reset()
  }
}
