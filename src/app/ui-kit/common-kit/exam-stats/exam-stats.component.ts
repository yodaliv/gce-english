import { Component, Input, OnInit } from '@angular/core';
import { StudentAssignmentStats } from './../../../core/models/student';

@Component({
  selector: 'app-exam-stats',
  templateUrl: './exam-stats.component.html',
  styleUrls: ['./exam-stats.component.scss'],
})
export class ExamStatsComponent implements OnInit {

  @Input() stats: StudentAssignmentStats;

  constructor() { }

  ngOnInit() {}

}
