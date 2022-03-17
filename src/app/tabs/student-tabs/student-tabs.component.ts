import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-tabs',
  templateUrl: './student-tabs.component.html',
  styleUrls: ['./student-tabs.component.scss'],
})
export class StudentTabsComponent implements OnInit {

  @Input() showTabs = true;

  constructor() { }

  ngOnInit() {}

}
