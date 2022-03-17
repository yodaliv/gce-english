import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { StudentService } from 'src/app/core/services/student.service';


@Component({
  selector: 'app-student-assigner',
  templateUrl: './student-assigner.component.html',
  styleUrls: ['./student-assigner.component.scss'],
})
export class StudentAssignerComponent implements OnInit {

  @Input() index: number;
  @Input() isChecked: boolean;
  @Input() readonly: boolean;
  @Input() email: string;
  @Input() allowDeassign = false;

  @Output() assignChanged: EventEmitter<boolean> = new EventEmitter<boolean>();


  constructor(
    public alertController: AlertController,
    public studentService: StudentService
  ) { }

  ngOnInit() {
  }

  toggleCheck() {
    if (this.readonly) {
      return;
    }
    this.isChecked = !this.isChecked;
    this.assignChanged.emit(this.isChecked);
  }

  async deassign() {
    const alert = await this.alertController.create({
      header: 'Deassign Student',
      message: 'Are you sure you want to deassign the student ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.alertController.dismiss();
          }
        }, {
          text: 'Confirm',
          handler: () => {
            this.studentService.deassignStudent(this.email).toPromise();
            this.alertController.dismiss();
          }
        }
      ]
    });
    await alert.present();
  }

}
