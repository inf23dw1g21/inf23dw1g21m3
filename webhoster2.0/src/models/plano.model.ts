import {Entity, model, property, hasMany} from '@loopback/repository';
import {Cliente} from './cliente.model';

@model()
export class Plano extends Entity {
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
  tipo_de_plano: string;

  @property({
    type: 'string',
    required: true,
  })
  periodicidade: string;

  @property({
    type: 'number',
    required: true,
  })
  preco: number;

  @property({
    type: 'string',
    required: true,
  })
  armazenamento: string;

  @property({
    type: 'number',
    required: true,
  })
  numero_de_contas_email: number;

  @property({
    type: 'number',
    required: true,
  })
  numero_de_dominios: number;

  @property({
    type: 'string',
    required: true,
  })
  largura_de_banda: string;

  @property({
    type: 'string',
    required: true,
  })
  fidelizacao: string;

  @hasMany(() => Cliente, {keyTo: 'plano'})
  clientes: Cliente[];

  constructor(data?: Partial<Plano>) {
    super(data);
  }
}

export interface PlanoRelations {
  // describe navigational properties here
}

export type PlanoWithRelations = Plano & PlanoRelations;
