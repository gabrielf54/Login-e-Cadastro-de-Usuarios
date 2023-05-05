import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from '../services/api-service.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  lista : any = [];
  limit = 10;
  start = 0;
  nome = '';
  usuario = '';
  senha = '';
  id = '';
  title = 'Inserir Usuário';
  textoBuscar = '';


  constructor(
    private provider : ApiServiceService,
    private router : Router
  ) { }

  ngOnInit() {
    this.lista = [];
    this.start = 0;
    this.carregar(this.textoBuscar);
  }



  carregar(texto : string) {
    this.lista = [];
    this.start = 0;
    return new Promise(resolve => {
      const dados = {
        requisicao : 'listar',
        limit : this.limit,
        start : this.start,
        textoBuscar : texto
      };
      this.provider.Api(dados, 'apiUsuarios.php').subscribe(data => {
        for(const dado of data['result']){
          this.lista.push(dado)
        }
        resolve(true);
      });
    });
  }

  cadastrar() {
    if(this.nome !== '' && this.usuario !== '' && this.senha !== ""){
    return new Promise(resolve => {
      const dados = {
        requisicao: 'add',
        nome: this.nome,
        usuario: this.usuario,
        senha: this.senha
      };
      this.provider.Api(dados, 'apiUsuarios.php').subscribe(data => {
        if(data['success']){
          alert('Usuário salvo com sucesso!');
          this.router.navigate(["/usuarios"])
        }
        else {
          alert('Erro ao salvar');
        }
      });
    });
  } else {
    alert('Preencha todos os campos!')
  }
  }

  dadosEditar(nome : string, usuario : string, senha : string, id : string) {
    this.title = "Editar Usuário";
    this.nome = nome;
    this.usuario = usuario;
    this.senha = senha;
    this.id = id;
  }

  editar() {
    if(this.nome !== '' && this.usuario !== '' && this.senha !== ''){
    return new Promise(resolve => {
      const dados = {
        requisicao: 'editar',
        nome: this.nome,
        usuario: this.usuario,
        senha: this.senha,
        id: this.id
      };
      this.provider.Api(dados, 'apiUsuarios.php').subscribe(data => {
        if(data['success']){
          alert('Usuário salvo com sucesso!');
          this.router.navigate(["/usuarios"])
        }
        else {
          alert('Erro ao salvar');
        }
      });
    });
  }
  else {
    alert('Preencha todos os campos');
  }
  }

  excluir(idu : string) {
    return new Promise(resolve => {
      const dados = {
        requisicao : 'excluir',
        id : idu
      };
      this.provider.Api(dados, 'apiUsuarios.php').subscribe(data => {
        if(data['success']){
          this.router.navigate(["/usuarios"]);
        } else {
          alert("Erro ao excluir");
        }
      });
    });
  }





}
