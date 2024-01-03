import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Cliente,
  Dominio,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteDominioController {
  constructor(
    @repository(ClienteRepository) protected clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/dominios', {
    responses: {
      '200': {
        description: 'Array of Cliente has many Dominio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Dominio)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Dominio>,
  ): Promise<Dominio[]> {
    return this.clienteRepository.ClienteDominios(id).find(filter);
  }

  @post('/clientes/{id}/dominios', {
    responses: {
      '200': {
        description: 'Cliente model instance',
        content: {'application/json': {schema: getModelSchemaRef(Dominio)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Cliente.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Dominio, {
            title: 'NewDominioInCliente',
            exclude: ['id'],
            optional: ['cliente']
          }),
        },
      },
    }) dominio: Omit<Dominio, 'id'>,
  ): Promise<Dominio> {
    return this.clienteRepository.ClienteDominios(id).create(dominio);
  }

  @patch('/clientes/{id}/dominios', {
    responses: {
      '200': {
        description: 'Cliente.Dominio PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Dominio, {partial: true}),
        },
      },
    })
    dominio: Partial<Dominio>,
    @param.query.object('where', getWhereSchemaFor(Dominio)) where?: Where<Dominio>,
  ): Promise<Count> {
    return this.clienteRepository.ClienteDominios(id).patch(dominio, where);
  }

  @del('/clientes/{id}/dominios', {
    responses: {
      '200': {
        description: 'Cliente.Dominio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Dominio)) where?: Where<Dominio>,
  ): Promise<Count> {
    return this.clienteRepository.ClienteDominios(id).delete(where);
  }
}
