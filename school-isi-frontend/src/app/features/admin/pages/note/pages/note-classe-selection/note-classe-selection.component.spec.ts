import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteClasseSelectionComponent } from './note-classe-selection.component';

describe('NoteClasseSelectionComponent', () => {
  let component: NoteClasseSelectionComponent;
  let fixture: ComponentFixture<NoteClasseSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoteClasseSelectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoteClasseSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
