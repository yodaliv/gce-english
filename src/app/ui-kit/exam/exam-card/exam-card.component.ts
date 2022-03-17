import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Exam } from '../../../core/models/exam';
import { getCoverImage } from '../../../core/utils/common.util';

@Component({
  selector: 'app-exam-card',
  templateUrl: './exam-card.component.html',
  styleUrls: ['./exam-card.component.scss'],
})
export class ExamCardComponent implements OnInit {

  @Input() exam: Exam;
  @Input() questionCount = 0;
  @Input() index: number;
  @Output() edit: EventEmitter<string> = new EventEmitter<string>();

  backgroundImage: string;

  constructor() { }

  ngOnInit() {
    if (this.exam.cover_image) {
      this.backgroundImage = this.exam.cover_image;
    } else {
      this.backgroundImage = getCoverImage(this.index);
    }
  }

}
