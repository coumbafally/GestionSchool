import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTuteurComponent } from './home-tuteur.component';

describe('HomeTuteurComponent', () => {
  let component: HomeTuteurComponent;
  let fixture: ComponentFixture<HomeTuteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeTuteurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeTuteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
