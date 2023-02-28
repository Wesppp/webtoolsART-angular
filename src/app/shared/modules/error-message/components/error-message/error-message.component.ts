import {Component, Input, OnInit} from '@angular/core';
import {Message} from "primeng/api";
import {BackendErrorsInterface} from "../../../../types/backendErrors.interface";

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent implements OnInit {
  @Input() error!: BackendErrorsInterface | null

  public message: Message[] = [];

  ngOnInit(): void {
    this.message = [
      {severity:'error', summary:'Error', detail: this.error?.message || 'Something went wrong!'}
    ]
  }
}
