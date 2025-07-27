import { Component, OnInit } from '@angular/core';
import { TuteurService } from '../../../../services/tuteur.service';
import { Tuteur } from '../../../../../../core/models/tuteur.model';

@Component({
  selector: 'app-liste-tuteur',
  standalone: false,
  templateUrl: './liste-tuteur.component.html',
  styleUrl: './liste-tuteur.component.css'
})

export class ListeTuteurComponent implements OnInit {
  tuteurs: Tuteur[] = [];

  constructor(private tuteurService: TuteurService) {}

  ngOnInit(): void {
    this.tuteurService.getAllTuteur().subscribe(data => {
      this.tuteurs = data;
    });
  }

  deleteTuteur(id: number) {
    if (confirm('Supprimer ce tuteur ?')) {
      this.tuteurService.deleteTuteur(id).subscribe(() => {
        this.tuteurs = this.tuteurs.filter(t => t.id !== id);
      });
    }
  }
}
