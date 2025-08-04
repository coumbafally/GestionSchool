import { Component, OnInit } from '@angular/core';
import { BulletinService } from '../../../../features/admin/services/bulletin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mes-bulletins',
  imports: [CommonModule],
  templateUrl: './mes-bulletins.component.html',
  styleUrls: ['./mes-bulletins.component.css']
})
export class MesBulletinsComponent implements OnInit {
  bulletins: any[] = [];

  constructor(private bulletinService: BulletinService) {}

  ngOnInit(): void {
    this.bulletinService.getMesBulletins().subscribe(data => {
      this.bulletins = data;
    });
  }

  telechargerBulletinPdf(eleveId: number, periode: string): void {
    this.bulletinService.downloadBulletinPdf(eleveId, periode).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `bulletin_${eleveId}_${periode}.pdf`;
      a.click();

    });
    this.bulletinService.getMesBulletins().subscribe({
  next: (data) => {
    console.log(' Données reçues :', data);
    this.bulletins = data;
  },
  error: (err) => {
    console.error('Erreur lors du chargement des bulletins', err);
  }
});

  }
}
