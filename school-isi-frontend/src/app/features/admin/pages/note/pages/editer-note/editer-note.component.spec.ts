import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditerNoteComponent } from './editer-note.component';

describe('EditerNoteComponent', () => {
  let component: EditerNoteComponent;
  let fixture: ComponentFixture<EditerNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditerNoteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditerNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
