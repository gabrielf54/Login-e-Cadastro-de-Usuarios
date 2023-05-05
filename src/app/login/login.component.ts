import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario = "";
  senha = "";

  constructor(private provider : ApiServiceService, private router : Router) { }

  ngOnInit() {
  }

  login(user : string, pass : string) {
    return new Promise(resolve => {
      const dados = {
        requisicao: 'login',
        usuario: user,
        senha: pass
      };
      this.provider.Api(dados, 'apiUsuarios.php').subscribe(data => {
        if(data['success']){
          this.router.navigate(["/usuarios"]);
        } else {
          alert('Dados incorretos');
        }
      });
    })
  }

}
