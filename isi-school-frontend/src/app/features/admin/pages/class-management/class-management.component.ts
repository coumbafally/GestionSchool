import { Component , OnInit} from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { ReactiveFormsModule,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClasseService } from '../../services/classe.service';

@Component({
  selector: 'app-class-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule ],
  templateUrl: './class-management.component.html',
  styleUrl: './class-management.component.css'
})
export class ClassManagementComponent implements OnInit {
  classes: any[] = [];
  classeForm: FormGroup;
  isEditing = false;
  currentClasseId: number | null = null;

  constructor(
    private classeService: ClasseService,
    private fb: FormBuilder
  ) {
    this.classeForm = this.fb.group({
      nom: ['', Validators.required],
      niveau: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadClasses();
  }

  loadClasses(): void {
    this.classeService.getClasses().subscribe(data => {
      this.classes = data;
    });
  }

  onSubmit(): void {
    console.log("1. onSubmit() appelé."); 

  if (this.classeForm.invalid) {
    console.error("2. Le formulaire est invalide. Arrêt."); 
    return;
  }

  console.log("3. Le formulaire est valide. Données envoyées :", this.classeForm.value);

    if (this.isEditing && this.currentClasseId) {
      // Mode mise à jour
      this.classeService.updateClasse(this.currentClasseId, this.classeForm.value).subscribe(() => {
        this.resetForm();
        this.loadClasses();
      });
    } else {
      console.log("4. Appel de createClasse() dans le service.");
      // Mode création
      this.classeService.createClasse(this.classeForm.value).subscribe(() => {
        this.resetForm();
        this.loadClasses();
      });
        
    }
  }

  editClasse(classe: any): void {
    this.isEditing = true;
    this.currentClasseId = classe.id;
    this.classeForm.patchValue({
      nom: classe.nom,
      niveau: classe.niveau
    });
  }

  deleteClasse(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette classe ?')) {
      this.classeService.deleteClasse(id).subscribe(() => {
        this.loadClasses();
      });
    }
  }

  resetForm(): void {
    this.isEditing = false;
    this.currentClasseId = null;
    this.classeForm.reset();
  }
}
