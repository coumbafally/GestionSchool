import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EleveService } from '../../../../services/eleve.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-eleve-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './eleve-details.component.html',
  styleUrls: ['./eleve-details.component.css']
})
export class EleveDetailsComponent implements OnInit {
  eleve: any;
  documents: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private eleveService: EleveService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.eleveService.getEleveWithDocuments(id).subscribe(data => {
      this.eleve = data;
      this.documents = data.documents;
    });
  }
}
