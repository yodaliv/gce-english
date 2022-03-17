import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExamInfiniquizPage } from './exam-infiniquiz.page';

describe('ExamInfiniquizPage', () => {
  let component: ExamInfiniquizPage;
  let fixture: ComponentFixture<ExamInfiniquizPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamInfiniquizPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExamInfiniquizPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
