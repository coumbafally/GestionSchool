import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesBulletinsComponent } from './mes-bulletins.component';

describe('MesBulletinsComponent', () => {
  let component: MesBulletinsComponent;
  let fixture: ComponentFixture<MesBulletinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MesBulletinsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesBulletinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
