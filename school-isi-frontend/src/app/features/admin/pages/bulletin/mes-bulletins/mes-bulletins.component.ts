import { Component, OnInit } from '@angular/core';
import { BulletinService } from '../../../../../features/admin/services/bulletin.service';
import { Bulletin } from '../../../../../core/models/bulletin.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mes-bulletins',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mes-bulletins.component.html',
  styleUrls: ['./mes-bulletins.component.css']
})
export class MesBulletinsComponent implements OnInit {
  bulletins: Bulletin[] = [];

  constructor(private bulletinService: BulletinService) {}

  ngOnInit(): void {
    this.bulletinService.getMesBulletins().subscribe(data => this.bulletins = data);
  }
}
