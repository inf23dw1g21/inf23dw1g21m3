import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Cliente} from './cliente.model';

@model()
export class Pagamento extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
    required: true,
  })
  timestamp: string;

  @property({
    type: 'number',
    required: true,
  })
  valor: number;

  @property({
    type: 'string',
    required: true,
  })
  metodo_de_pagamento: string;

  @property({
    type: 'string',
    required: true,
  })
  numero_de_transacao: string;

  @belongsTo(() => Cliente, {name: 'pagamentos'})
  cliente: number;

  constructor(data?: Partial<Pagamento>) {
    super(data);
  }
}

export interface PagamentoRelations {
  // describe navigational properties here
}

export type PagamentoWithRelations = Pagamento & PagamentoRelations;
