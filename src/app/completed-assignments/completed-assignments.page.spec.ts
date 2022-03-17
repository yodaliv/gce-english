import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CompletedAssignmentsPage } from './completed-assignments.page';

describe('CompletedAssignmentsPage', () => {
  let component: CompletedAssignmentsPage;
  let fixture: ComponentFixture<CompletedAssignmentsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletedAssignmentsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CompletedAssignmentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
