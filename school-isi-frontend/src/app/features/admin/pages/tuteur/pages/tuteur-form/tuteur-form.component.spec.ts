import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TuteurFormComponent } from './tuteur-form.component';

describe('TuteurFormComponent', () => {
  let component: TuteurFormComponent;
  let fixture: ComponentFixture<TuteurFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TuteurFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TuteurFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
