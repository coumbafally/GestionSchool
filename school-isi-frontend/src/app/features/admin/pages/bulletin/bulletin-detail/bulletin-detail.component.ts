import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BulletinService } from './../../../services/bulletin.service';
import { CommonModule } from '@angular/common';
import { Bulletin } from '../../../../../core/models/bulletin.model';
import{Eleve } from '../../../../../core/models/eleve.model';
import { EleveService } from '../../../services/eleve.service';

@Component({
  selector: 'app-bulletin-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bulletin-detail.component.html',
  styleUrls: ['./bulletin-detail.component.css']
})
export class BulletinDetailComponent implements OnInit {
  eleve!: any;
  
  eleveId!: number;
  periode: string = 'semestre 1';
  bulletin: any[] = [];
  moyenneGenerale: number = 0;
  mention: string = '';

  constructor(
    private route: ActivatedRoute,
    private bulletinService: BulletinService,
    private eleveService: EleveService
  ) {}

  ngOnInit(): void {
    this.eleveId = +this.route.snapshot.params['eleveId'];
    this.periode = this.route.snapshot.queryParamMap.get('periode') || 'semestre 1';

    this.eleveService.getById(this.eleveId).subscribe(e => this.eleve = e);
    this.bulletinService.getBulletinParEleve(this.eleveId, this.periode).subscribe(response => {
      this.bulletin = response.bulletin;
      this.moyenneGenerale = response.moyenne_generale;
      this.mention = response.mention;
    });
  }

    telechargerBulletinPdf() {
    this.bulletinService.downloadBulletinPdf(this.eleveId, this.periode).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `bulletin-${this.eleveId}-${this.periode}.pdf`;
      a.click();
    });
  }
}
