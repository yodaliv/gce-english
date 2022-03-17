import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExamPlayPage } from './exam-play.page';

describe('ExamPlayPage', () => {
  let component: ExamPlayPage;
  let fixture: ComponentFixture<ExamPlayPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamPlayPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExamPlayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
