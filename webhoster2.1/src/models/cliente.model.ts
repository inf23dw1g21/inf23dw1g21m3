import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Plano} from './plano.model';
import {Dominio} from './dominio.model';
import {Pagamento} from './pagamento.model';

@model()
export class Cliente extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nome: string;

  @property({
    type: 'string',
    required: true,
  })
  tipo_de_conta: string;

  @property({
    type: 'string',
    required: true,
  })
  numero_fiscal: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  contacto: string;

  @property({
    type: 'string',
    required: true,
  })
  periodicidade_de_pagamento: string;

  @property({
    type: 'date',
    required: true,
  })
  data_ultimo_pagamento: string;

  @belongsTo(() => Plano)
  planoId: number;

  @hasMany(() => Dominio)
  dominios: Dominio[];

  @hasMany(() => Pagamento)
  pagamentos: Pagamento[];

  constructor(data?: Partial<Cliente>) {
    super(data);
  }
}

export interface ClienteRelations {
  // describe navigational properties here
}

export type ClienteWithRelations = Cliente & ClienteRelations;
