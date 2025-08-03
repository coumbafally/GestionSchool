import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeTuteurComponent } from './liste-tuteur.component';

describe('ListeTuteurComponent', () => {
  let component: ListeTuteurComponent;
  let fixture: ComponentFixture<ListeTuteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeTuteurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeTuteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
