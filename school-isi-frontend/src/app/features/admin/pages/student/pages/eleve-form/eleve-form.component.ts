import { Component, OnInit } from '@angular/core';
import { EleveService} from '../../../../services/eleve.service';
import { Eleve } from '../../../../../../core/models/eleve.model';
import { ActivatedRoute} from '@angular/router';
import { ClasseService } from '../../../../services/classe.service';
import { UserService } from '../../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-eleve-form',
  standalone: false,
  templateUrl: './eleve-form.component.html',
  styleUrl: './eleve-form.component.css'
})

export class EleveFormComponent implements OnInit {

  eleve: Eleve = {
    user_id: 0,
    classe_id: 0,
    date_naissance: '',
    lieu_naissance: '',
    adresse: '',
    identifiant_eleve: ''
  };
  isEditMode = false;
  id!: number;

  users: any[] = [];
  classes: any[] = [];

  constructor(
    private eleveService: EleveService,
    private userService: UserService,
    private classeService: ClasseService,
    private route: ActivatedRoute,
    public router: Router 
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadClasses();

    this.id = this.route.snapshot.params['id'];
    this.isEditMode = !!this.id;

    if (this.isEditMode) {
      this.eleveService.getById(this.id).subscribe(data => {
        this.eleve = data;
      });
    }
  }

  loadUsers(): void {
    this.userService.getAll().subscribe(data => {
      this.users = data;
    });
  }

  loadClasses(): void {
    this.classeService.getAll().subscribe(data => {
      this.classes = data;
    });
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.eleveService.update(this.id, this.eleve).subscribe(() => {
        this.router.navigate(['/eleves']);
      });
    } else {
      this.eleveService.create(this.eleve).subscribe(() => {
        this.router.navigate(['/eleves']);
      });
    }
  }
}
