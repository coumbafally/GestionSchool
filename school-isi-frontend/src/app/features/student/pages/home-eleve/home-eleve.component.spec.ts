import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEleveComponent } from './home-eleve.component';

describe('HomeEleveComponent', () => {
  let component: HomeEleveComponent;
  let fixture: ComponentFixture<HomeEleveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEleveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEleveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
