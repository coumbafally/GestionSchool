import { Component, OnInit } from '@angular/core';
import { ClasseService } from './../../../services/classe.service';
import { BulletinService } from './../../../services/bulletin.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-bulletin-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './bulletin-admin.component.html',
  styleUrls: ['./bulletin-admin.component.css']
})
export class BulletinAdminComponent implements OnInit {
  classes: any[] = [];
  selectedClasseId: number | null = null;
  periode: string = '';
  bulletins: any[] = [];

  constructor(
    private classeService: ClasseService,
    private bulletinService: BulletinService
  ) {}

  ngOnInit(): void {
    this.classeService.getAll().subscribe(data => {
      this.classes = data;
    });
  }

  chargerBulletins() {
    if (this.selectedClasseId && this.periode) {
      this.bulletinService.getBulletinClasse(this.selectedClasseId, this.periode)
        .subscribe(data => this.bulletins = data);
    }
  }

  telechargerBulletinPdf(eleveId: number) {
    this.bulletins.forEach(b => {
      this.bulletinService.downloadBulletinPdf(b.identifiant, this.periode).subscribe(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `bulletin-eleve-${b.identifiant}-${this.periode}.pdf`;
        a.click();
      });
    });
  }
}
