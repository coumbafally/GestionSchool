import { Component, OnInit } from '@angular/core';
import { EleveService } from '../../../../services/eleve.service';
import { Eleve } from '../../../../../../core/models/eleve.model';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminModule } from "../../../../admin.module";
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-eleve-list',
  standalone: true,
  templateUrl: './eleve-list.component.html',
  styleUrls: ['./eleve-list.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule 
  ]
})

export class EleveListComponent implements OnInit {
  eleves: Eleve[] = [];
  niveau = '';
  classeId?: number;
  documents: any[] = [];


  constructor(private eleveService: EleveService) {}

 ngOnInit(): void {
    this.getAllEleves();
  } 

  getAllEleves(): void {
    this.eleveService.getAll().subscribe(data => {
      this.eleves = data;
    });
  }

 deleteEleve(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer cet élève ?')) {
      this.eleveService.delete(id).subscribe(() => {
        this.getAllEleves();
      });
    }
  }
  getByNiveau(): void {
    if (this.niveau) {
      this.eleveService.getByNiveau(this.niveau).subscribe(data => {
        this.eleves = data;
      });
    }
  }

  getByClasse(): void {
    if (this.classeId) {
      this.eleveService.getByClasse(this.classeId).subscribe(data => {
        this.eleves = data;
      });
    }
  }

    ngAfterViewInit(): void {
  const toggleBtn = document.getElementById('sidebarToggle');
  const sidebar = document.getElementById('sidebar');

  toggleBtn?.addEventListener('click', () => {
    sidebar?.classList.toggle('show');
  });

  document.addEventListener('click', function (event) {
    if (window.innerWidth < 992 && sidebar && toggleBtn &&
        !sidebar.contains(event.target as Node) &&
        !toggleBtn.contains(event.target as Node)) {
      sidebar.classList.remove('show');
    }
  });
}

}
