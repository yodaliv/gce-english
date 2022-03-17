import { Component, OnInit } from '@angular/core';

import { AuthService } from '../core/services/auth.service';
import { StudentService } from '../core/services/student.service';
import { CommonService } from '../core/services/common.service';
import { StudentLevels, StudentStats } from '../core/models/student';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user$ = this.authService.userChanged$;
  stats: StudentStats;
  levels = StudentLevels;

  constructor(
    private studentService: StudentService,
    private authService: AuthService,
    private commonService: CommonService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getState();
  }

  private async getState() {
    try {
      this.stats = await this.studentService.getStudentStats().toPromise();
      this.levels = this.levels.map(level => {
        const found = this.stats.details.find(x => Number(x.level) === level.level);
        return found ? {...level, ...found, level: Number(found.level)} : level;
      });
    } catch (e) {
      await this.commonService.showToast('Sorry, Failed to load profile stats. Please try again.');
    }
  }

  logout() {
    this.authService.logout();
  }

}
