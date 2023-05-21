import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FormValueInterface} from "../../types/formValue.interface";

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit {
  @Input() isSubmitting!: boolean
  @Input() commentText: string = ''
  @Input() submitButtonLabel: string = 'Send'
  @Input() isLoggedIn!: boolean | null

  @Output() submitFormEvent = new EventEmitter<FormValueInterface>()

  public form!: FormGroup

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
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
