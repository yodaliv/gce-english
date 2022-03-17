import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

import { slideUpAnimation } from '../../../core/utils/animation.util';

@Component({
  selector: 'app-manage-question-modal',
  templateUrl: './manage-question-modal.component.html',
  styleUrls: ['./manage-question-modal.component.scss'],
  animations: [slideUpAnimation()]
})
export class ManageQuestionModalComponent implements OnInit {

  @Input() examId: string;

  menus = [
    {icon: 'people-outline', label: 'Select Student', path: 'students'},
    {icon: 'help-circle-outline', label: 'Edit quiz info & questions', path: 'questions'},
    {icon: 'print-outline', label: 'Print quiz in PDF format', path: 'questions'},
    {icon: 'alarm-outline', label: 'Schedule a quiz', path: 'questions'},
  ];

  constructor(
    private router: Router,
    private modalController: ModalController
  ) { }

  ngOnInit() {}

  navigateToPage(path: string) {
    this.router.navigate([`/exam-form/${this.examId}/${path}`]);
    this.modalController.dismiss(null);
  }

}
