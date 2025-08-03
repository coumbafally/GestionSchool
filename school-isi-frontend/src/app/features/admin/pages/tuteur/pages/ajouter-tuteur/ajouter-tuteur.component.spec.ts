import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterTuteurComponent } from './ajouter-tuteur.component';

describe('AjouterTuteurComponent', () => {
  let component: AjouterTuteurComponent;
  let fixture: ComponentFixture<AjouterTuteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AjouterTuteurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterTuteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
