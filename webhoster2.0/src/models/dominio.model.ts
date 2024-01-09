import {Entity, model, property} from '@loopback/repository';


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
  @property({
    type: 'number',
  })
  clienteId?: number;
 

  constructor(data?: Partial<Dominio>) {
    super(data);
  }
}

export interface DominioRelations {
  // describe navigational properties here
}

export type DominioWithRelations = Dominio & DominioRelations;
