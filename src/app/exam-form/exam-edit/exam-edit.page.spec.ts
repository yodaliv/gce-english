import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExamEditPage } from './exam-edit.page';

describe('ExamEditPage', () => {
  let component: ExamEditPage;
  let fixture: ComponentFixture<ExamEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExamEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
