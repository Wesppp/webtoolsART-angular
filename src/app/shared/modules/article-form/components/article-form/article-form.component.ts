import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {
  InputArticleRequestInterface
} from "../../../../types/inputArticleRequest.interface";
import {ArticleInterface} from "../../../../types/article.interface";
import {ArticleFormDataInterface} from "../../types/articleFormData.interface";

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['../../../../../shared/styles/formStyles.scss']
})
export class ArticleFormComponent implements OnInit {
  @Input() isSubmitting: boolean | null = false
  @Input() article!: ArticleInterface | null

  @Output() submitForm = new EventEmitter<InputArticleRequestInterface>()

  public form!: FormGroup

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.createForm()
  }

  createForm(): void {
    this.form = this.fb.group({
      title: [this.article?.title, [
       Validators.required,
       Validators.maxLength(100),
       Validators.minLength(10)
      ]],
      quickSummary: [this.article?.quickSummary, [
        Validators.required,
        Validators.minLength(200),
        Validators.maxLength(400)
      ]],
      description: [this.article?.description, [
        Validators.required,
        Validators.minLength(600)
      ]],
      sourceLink: [this.article?.sourceLink, [
        Validators.required,
        Validators.pattern('^(https?:\\/\\/)?'+
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+
          '((\\d{1,3}\\.){3}\\d{1,3}))'+
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
          '(\\?[;&a-z\\d%_.~+=-]*)?'+
          '(\\#[-a-z\\d_]*)?$')
      ]],
      categories: [this.article?.categories.join(' '), [
        Validators.pattern(/^(?!.*\b(\w+)\b.*\b\1\b)[a-zA-Z0-9]+(?:\s[a-zA-Z0-9.]*[a-zA-Z0-9]+)*$/i)
      ]]
    })
  }

  get title() {
    return this.form.get('title')
  }

  get description() {
    return this.form.get('description')
  }

  get quickSummary() {
    return this.form.get('quickSummary')
  }

  get sourceLink() {
    return this.form.get('sourceLink')
  }

  get categories() {
    return this.form.get('categories')
  }

  submit(formData: ArticleFormDataInterface) {
    if (this.form.invalid) { return }

    const reqData: InputArticleRequestInterface = {
      ...formData,
      categories: formData.categories.split(' ')
    }

    this.submitForm.emit(reqData)
  }
}
