import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../../services/teacher.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-teacher-classes',
  standalone: true,
  templateUrl: './teacher-classes.component.html',
  styleUrls: ['./teacher-classes.component.css'],
  imports: [CommonModule, RouterModule]
})
export class TeacherClassesComponent implements OnInit {
  affectations: any[] = [];
  elevesParClasse: { [key: number]: any[] } = {};
  loading = false;

  constructor(private teacherService: TeacherService) {}

  ngOnInit(): void {
    this.loadAffectations();
  }

  loadAffectations(): void {
    this.teacherService.getMesClasses().subscribe(data => {
      this.affectations = data;
    });
  }

  afficherEleves(classeId: number): void {
    if (!this.elevesParClasse[classeId]) {
      this.loading = true;
      this.teacherService.getElevesParClasse(classeId).subscribe(data => {
        this.elevesParClasse[classeId] = data;
        this.loading = false;
      });
    }
  }
}
