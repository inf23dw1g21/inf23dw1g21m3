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
  Plano,
  Cliente,
} from '../models';
import {PlanoRepository} from '../repositories';

export class PlanoClienteController {
  constructor(
    @repository(PlanoRepository) protected planoRepository: PlanoRepository,
  ) { }

  @get('/planos/{id}/clientes', {
    responses: {
      '200': {
        description: 'Array of Plano has many Cliente',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cliente)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Cliente>,
  ): Promise<Cliente[]> {
    return this.planoRepository.clientes(id).find(filter);
  }

  @post('/planos/{id}/clientes', {
    responses: {
      '200': {
        description: 'Plano model instance',
        content: {'application/json': {schema: getModelSchemaRef(Cliente)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Plano.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {
            title: 'NewClienteInPlano',
            exclude: ['id'],
            optional: ['planoId']
          }),
        },
      },
    }) cliente: Omit<Cliente, 'id'>,
  ): Promise<Cliente> {
    return this.planoRepository.clientes(id).create(cliente);
  }

  @patch('/planos/{id}/clientes', {
    responses: {
      '200': {
        description: 'Plano.Cliente PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {partial: true}),
        },
      },
    })
    cliente: Partial<Cliente>,
    @param.query.object('where', getWhereSchemaFor(Cliente)) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.planoRepository.clientes(id).patch(cliente, where);
  }

  @del('/planos/{id}/clientes', {
    responses: {
      '200': {
        description: 'Plano.Cliente DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Cliente)) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.planoRepository.clientes(id).delete(where);
  }
}
