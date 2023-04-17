import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {CommentInterface} from "../../../../types/comment.interface";
import {BackendErrorsInterface} from "../../../../types/backendErrors.interface";
import {select, Store} from "@ngrx/store";
import {
  backendErrorsSelector,
  commentsSelector,
  isLoadingSelector,
  isSubmittingSelector,
  totalCommentsCountSelector
} from "../../store/selectors";
import {getCommentsAction} from "../../store/actions/getComments.action";
import {CommentRequestInterface} from "../../../../types/commentRequest.interface";
import {FormValueInterface} from "../../../comment-form/types/formValue.interface";
import {addCommentAction} from "../../store/actions/addComment.action";
import {CurrentUserInterface} from "../../../../types/currentUser.interface";
import {currentUserSelector} from "../../../../../auth/store/selectors";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: [
    './comments.component.scss',
  ]
})
export class CommentsComponent implements OnInit {
  @Input() slug!: string

  public comments$!: Observable<CommentInterface[] | null>
  public isLoading$!: Observable<boolean>
  public errors$!: Observable<BackendErrorsInterface | null>
  public isSubmitting$!: Observable<boolean>
  public currentUser$!: Observable<CurrentUserInterface | null>
  public totalCommentsCount$!: Observable<number>

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.initializeValues()
    this.fetchComments()
  }

  initializeValues(): void {
    this.comments$ = this.store.pipe(select(commentsSelector))
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.errors$ = this.store.pipe(select(backendErrorsSelector))
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
    this.currentUser$ = this.store.pipe(select(currentUserSelector))
    this.totalCommentsCount$ = this.store.pipe(select(totalCommentsCountSelector))
  }

  fetchComments(): void {
    this.store.dispatch(getCommentsAction({ slug: this.slug }))
  }

  addComment(formValue: FormValueInterface) {
    const request: CommentRequestInterface = {
      text: formValue.text,
      slug: this.slug
    }

    this.store.dispatch(addCommentAction({ request }))
  }
}
