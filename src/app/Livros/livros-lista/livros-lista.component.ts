import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import {Notas} from '../livros.model';
import {LivrosService} from '../livros.service';
import {Subscription, Observable} from 'rxjs';


@Component({
  selector: 'app-livros-lista',
  templateUrl: './livros-lista.component.html',
  styleUrls: ['./livros-lista.component.css']
})

export class LivrosListaComponent implements OnInit,OnDestroy {
  Notas: Notas[] = [];
private livrosSubscription: Subscription;l

  constructor(public  livroService: LivrosService) { }
  ngOnInit(): void {
    this.livroService.getNotas();
    this.livrosSubscription = this.livroService
    .getListaDeNotasAtualizadaObservable()
    .subscribe((notas: Notas[]) => {
    this.Notas = notas;
    });
    }
  ngOnDestroy(): void{
    this.livrosSubscription.unsubscribe();
  }

}
