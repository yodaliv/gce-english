import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { Role } from '../core/models/auth';


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit, OnDestroy {

  showTabs = true;
  Role = Role;

  private unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      takeUntil(this.unsubscribeAll)
    ).subscribe((event: NavigationEnd) => {
      // TODO : We need more robust solution for tabs at route level instead of this conditional logic to show tabs.
      const path = event.url.split('/')[1];
      const tabPaths = ['exams', 'students', 'profile', 'assignments', 'completed'];
      this.showTabs = tabPaths.indexOf(path) > -1;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}
