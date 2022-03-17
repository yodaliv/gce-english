import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchDatabasePage } from './search-database.page';

describe('SearchDatabasePage', () => {
  let component: SearchDatabasePage;
  let fixture: ComponentFixture<SearchDatabasePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchDatabasePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchDatabasePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
