import { Injectable } from '@angular/core';
import { Notas } from './livros.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({ providedIn: 'root' })
export class LivrosService{
  private notas: Notas [] = [];
private listaNotasAtualizada = new Subject <Notas[]>();
constructor (private httpClient: HttpClient){
}

  getNotas(): void {
    this.httpClient.get<{mensagem: string, notas:Notas[]}>('http://localhost:3000/api/notas')
    .subscribe((dados) => {
    this.notas = dados.notas;
    this.listaNotasAtualizada.next([...this.notas]);
    }
    )
    }
  adicionarLivros(titulo: string, descricao: string, data: string) {
    const notas: Notas = {
    titulo: titulo,
    descricao: descricao,
    data: data,
    };
    this.httpClient.post<{mensagem: string}> ('http://localhost:3000/api/notas',notas)
    .subscribe((dados) => {
    console.log(dados.mensagem);
    this.notas.push(notas);
    this.listaNotasAtualizada.next([...this.notas]);
    }
    )
    }


    getListaDeNotasAtualizadaObservable(){
      return this.listaNotasAtualizada.asObservable();
    }
}

