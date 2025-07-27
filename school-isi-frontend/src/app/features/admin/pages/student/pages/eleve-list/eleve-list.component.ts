import { Component, OnInit } from '@angular/core';
import { EleveService} from '../../../../services/eleve.service';
import { Eleve } from '../../../../../../core/models/eleve.model';


@Component({
  selector: 'app-eleve-list',
  standalone: false,
  templateUrl: './eleve-list.component.html',
  styleUrl: './eleve-list.component.css'
})

export class EleveListComponent implements OnInit {
  eleves: Eleve[] = [];
  niveau = '';
  classeId?: number;

  constructor(private eleveService: EleveService) {}

  ngOnInit(): void {
    this.getAllEleves();
  }

  getAllEleves(): void {
    this.eleveService.getAll().subscribe(data => {
      this.eleves = data;
    });
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
}
