import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommentInterface} from "../../../../types/comment.interface";
import {CommentRequestInterface} from "../../../../types/commentRequest.interface";
import {FormValueInterface} from "../../../comment-form/types/formValue.interface";
import {select, Store} from "@ngrx/store";
import {replyCommentAction} from "../../store/actions/replyComment.action";
import {updateCommentAction} from "../../../comments/store/actions/updateComment.action";
import {deleteCommentAction} from "../../../comments/store/actions/deleteComment.action";
import {ConfirmationService} from "primeng/api";
import {getCommentRepliesAction} from "../../store/actions/getCommentReplies.action";
import {Observable} from "rxjs";
import {isLoadingSelector, repliesSelector} from "../../store/selectors";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() comment!: CommentInterface
  @Input() currentUsername!: string
  @Input() parentCommentId!: string

  @Output() deleteReplyEvent = new EventEmitter<void>()
  @Output() addReplyEvent = new EventEmitter<void>()

  public isCommentAuthor!: boolean
  public visible!: boolean
  public position!: string
  public repliesVisible: boolean = false

  public isLoading$!: Observable<boolean>
  public replies$!: Observable<CommentInterface[] | null>

  public isRepliesReceived: boolean = false

  constructor(private store: Store,
              private confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {
    this.initializeValues()
  }

  initializeValues(): void {
    this.isCommentAuthor = this.comment.author.username === this.currentUsername
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.replies$ = this.store.pipe(select(repliesSelector))
  }

  deleteComment(slug: string): void {
    this.confirmationService.confirm({
      message: 'Do you want to delete your comment?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.store.dispatch(deleteCommentAction({ slug }))
        this.deleteReplyEvent.emit()
      }
    });
  }

  updateComment(formValue: FormValueInterface): void {
    const request: CommentRequestInterface = {
      text: formValue.text,
      slug: this.comment._id
    }

    this.store.dispatch(updateCommentAction({ request }))
  }

  replyComment(formValue: FormValueInterface): void {
    const request: CommentRequestInterface = {
      text: formValue.text,
      slug: this.parentCommentId || this.comment._id
    }
    this.visible = false
    this.store.dispatch(replyCommentAction({ request }))

    if(this.parentCommentId) {
      this.addReplyEvent.emit()
    } else {
      this.comment = {
        ...this.comment,
        repliesCount: this.comment.repliesCount + 1
      }
    }
  }

  showDialog(position: string): void {
    this.position = position
    this.visible = true
  }

  getCommentReplies(): void {
    this.repliesVisible = !this.repliesVisible

    if (this.repliesVisible && !this.isRepliesReceived) {
      this.isRepliesReceived = true
      this.store.dispatch(getCommentRepliesAction({ slug: this.comment._id }))
    }
  }

  deleteReply(): void {
    this.comment = {
      ...this.comment,
      repliesCount: this.comment.repliesCount - 1
    }
  }

  addReply(): void {
    this.comment = {
      ...this.comment,
      repliesCount: this.comment.repliesCount + 1
    }
  }
}
