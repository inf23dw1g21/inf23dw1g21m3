import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Cliente} from './cliente.model';

@model()
export class Dominio extends Entity {
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
  codigo_TLD: string;

  @property({
    type: 'boolean',
    required: true,
  })
  estado: boolean;

  @property({
    type: 'date',
    required: true,
  })
  data_de_inicio: string;

  @property({
    type: 'date',
    required: true,
  })
  data_de_fim: string;
 
  @belongsTo(() => Cliente, {name: 'cliente'})
    cliente: number;


  constructor(data?: Partial<Dominio>) {
    super(data);
  }
}

export interface DominioRelations {
  // describe navigational properties here
}

export type DominioWithRelations = Dominio & DominioRelations;
