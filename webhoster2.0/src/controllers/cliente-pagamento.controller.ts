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
  Pagamento,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClientePagamentoController {
  constructor(
    @repository(ClienteRepository) protected clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/pagamentos', {
    responses: {
      '200': {
        description: 'Array of Cliente has many Pagamento',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Pagamento)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Pagamento>,
  ): Promise<Pagamento[]> {
    return this.clienteRepository.clientePagamentos(id).find(filter);
  }

  @post('/clientes/{id}/pagamentos', {
    responses: {
      '200': {
        description: 'Cliente model instance',
        content: {'application/json': {schema: getModelSchemaRef(Pagamento)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Cliente.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pagamento, {
            title: 'NewPagamentoInCliente',
            exclude: ['id'],
            optional: ['cliente']
          }),
        },
      },
    }) pagamento: Omit<Pagamento, 'id'>,
  ): Promise<Pagamento> {
    return this.clienteRepository.clientePagamentos(id).create(pagamento);
  }

  @patch('/clientes/{id}/pagamentos', {
    responses: {
      '200': {
        description: 'Cliente.Pagamento PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pagamento, {partial: true}),
        },
      },
    })
    pagamento: Partial<Pagamento>,
    @param.query.object('where', getWhereSchemaFor(Pagamento)) where?: Where<Pagamento>,
  ): Promise<Count> {
    return this.clienteRepository.clientePagamentos(id).patch(pagamento, where);
  }

  @del('/clientes/{id}/pagamentos', {
    responses: {
      '200': {
        description: 'Cliente.Pagamento DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Pagamento)) where?: Where<Pagamento>,
  ): Promise<Count> {
    return this.clienteRepository.clientePagamentos(id).delete(where);
  }
}
