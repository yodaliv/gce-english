import { Router, NavigationEnd } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { InviteModalComponent } from 'src/app/students/invite-modal/invite-modal.component';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { StudentService } from 'src/app/core/services/student.service';

@Component({
  selector: 'app-teacher-tabs',
  templateUrl: './teacher-tabs.component.html',
  styleUrls: ['./teacher-tabs.component.scss'],
})
export class TeacherTabsComponent implements OnInit, OnDestroy {

  @Input() showTabs = true;

  isExamScreen = false;

  private unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private modalController: ModalController,
    private router: Router,
    private studentService: StudentService
  ) { }

  ngOnInit() {
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      takeUntil(this.unsubscribeAll)
    ).subscribe((event: NavigationEnd) => {
      const path = event.url.split('/')[1];
      this.isExamScreen = path === 'exams';
    });
  }

  async openInviteModal() {
    const modal = await this.modalController.create({
      component: InviteModalComponent,
      cssClass: 'modal-bottom-option',
      swipeToClose: true,
    });
    const dismiss = modal.onWillDismiss();
    dismiss.then((result: any) => {
      this.studentService.invited();
    });
    await modal.present();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
