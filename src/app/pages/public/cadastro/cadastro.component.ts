import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlunoService } from 'src/app/services/aluno.service'
import { ProfessorService } from 'src/app/services/professor.service';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})

export class CadastroComponent implements OnInit {

  checkRadio: boolean = true;
  placeholder: string = 'Digite o curso que leciona';
  user: Usuario = {};
  typeUser = '';
  textButton = 'Cadastrar'


  constructor(
      private router: Router,
      private professorService: ProfessorService,
      private alunoService: AlunoService
    ) { }

  ngOnInit(): void {
  }

  radioCheck(): void {
    if(this.checkRadio == false) {
      this.placeholder = 'Digite o curso que deseja ser matriculado';
      this.typeUser = 'Aluno';
    } else {
      this.placeholder = 'Digite o curso que leciona';
      this.typeUser = 'Professor';
    }
  }

  cadastrar(user) {
    if (user.tipo == 1) {
      if (this.textButton === 'Cadastrar') {
        this.professorService.incluir(user).subscribe(
          success => {
            console.log(`Professor ${user.nome} incluído com sucesso!`)
            this.navegar('');
          },
          error => {
            console.log(`Não foi possível incluir o professor ${user.nome}, erro ocorrido!`)
            this.navegar('');
          },
          () => console.log('Requisição completa!'));
      } else {
        /* this.editar(user); */
      }
    } else {
      if (this.textButton === 'Cadastrar') {
        this.alunoService.incluir(user).subscribe(
          success => {
            console.log(`Aluno ${user.nome} incluído com sucesso!`)
            this.navegar('');
          },
          error => {
            console.log(`Não foi possível incluir o aluno ${user.nome}, erro ocorrido!`)
            this.navegar('');
          },
          () => console.log('Requisição completa!'));
      } else {
        /* this.editar(user); */
      }
    }
  }

  cadastrarAluno() {  }

  cadastrarProfessor() {  }

  cadastrarCurso() {  }

  cadastrarAula() {  }

  limpar() {
    this.user = {};
  }

  cancelar(){
    this.limpar();
    this.navegar('');
  }

  navegar = (route: any) => {
    this.router.navigate([route]);
  }

}
