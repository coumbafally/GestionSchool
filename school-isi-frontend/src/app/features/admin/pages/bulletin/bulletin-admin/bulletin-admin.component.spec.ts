import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulletinAdminComponent } from './bulletin-admin.component';

describe('BulletinAdminComponent', () => {
  let component: BulletinAdminComponent;
  let fixture: ComponentFixture<BulletinAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BulletinAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BulletinAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
