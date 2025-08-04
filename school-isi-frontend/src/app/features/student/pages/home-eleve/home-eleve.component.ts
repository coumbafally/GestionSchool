import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-eleve',
  templateUrl: './home-eleve.component.html',
  styleUrls: ['./home-eleve.component.css']
})
export class HomeEleveComponent {
  constructor(private router: Router) {}

  allerAuxBulletins() {
    this.router.navigate(['/bulletins/eleve']);
  }
}
