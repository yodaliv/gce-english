import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-success-modal',
  templateUrl: './success-modal.component.html',
  styleUrls: ['./success-modal.component.scss'],
})
export class SuccessModalComponent implements OnInit {

  @Input() title: string;
  @Input() description: string;
  @Input() backUrl: string;
  @Input() btnTitle = 'Home';
  @Input() replaceUrl = false;

  constructor(
    private modalController: ModalController,
    private router: Router
  ) { }

  ngOnInit() {
  }

  close() {
    if (this.backUrl) {
      this.router.navigate([this.backUrl], {replaceUrl: this.replaceUrl});
    }
    this.modalController.dismiss(null);
  }

}
