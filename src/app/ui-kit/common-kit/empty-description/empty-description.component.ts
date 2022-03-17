import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-empty-description',
  templateUrl: './empty-description.component.html',
  styleUrls: ['./empty-description.component.scss'],
})
export class EmptyDescriptionComponent implements OnInit {

  @Input() text: string;

  constructor() { }

  ngOnInit() {}

}
