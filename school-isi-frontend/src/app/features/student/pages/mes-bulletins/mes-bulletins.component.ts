import { Component, OnInit } from '@angular/core';
import { BulletinService } from '../../../../features/admin/services/bulletin.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-mes-bulletins',
  imports: [CommonModule],
  templateUrl: './mes-bulletins.component.html',
  styleUrls: ['./mes-bulletins.component.css']
})
export class MesBulletinsComponent implements OnInit {
  bulletins: any[] = [];
  eleveId!: number;

  constructor(
    private bulletinService: BulletinService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUser(); 
    this.eleveId = user?.eleve?.id ?? user?.id;

    this.bulletinService.getMesBulletins().subscribe({
      next: (data) => {
        console.log('Données reçues :', data);
        this.bulletins = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des bulletins', err);
      }
    });
  }

  telechargerBulletinPdf(periode: string): void {
    this.bulletinService.downloadBulletinPdf(this.eleveId, periode).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `bulletin_${this.eleveId}_${periode}.pdf`;
      a.click();
    });
  }
}

