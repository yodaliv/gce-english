import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExamStudentStatsPage } from './exam-student-stats.page';

describe('ExamStudentStatsPage', () => {
  let component: ExamStudentStatsPage;
  let fixture: ComponentFixture<ExamStudentStatsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamStudentStatsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExamStudentStatsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
