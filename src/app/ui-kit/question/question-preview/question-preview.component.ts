import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Question } from '../../../core/models/question';

@Component({
  selector: 'app-question-preview',
  templateUrl: './question-preview.component.html',
  styleUrls: ['./question-preview.component.scss'],
})
export class QuestionPreviewComponent implements OnInit {

  @Input() removable: boolean;
  @Input() examId: string;
  @Input() index: number; // for the background color
  @Input() question: Question;
  @Output() delete: EventEmitter<any> = new EventEmitter<any>();

  labels = ['a', 'b', 'c', 'd'];

  constructor() { }

  ngOnInit() {}

}
