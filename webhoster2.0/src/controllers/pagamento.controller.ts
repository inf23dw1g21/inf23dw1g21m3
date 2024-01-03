import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Pagamento} from '../models';
import {PagamentoRepository} from '../repositories';

export class PagamentoController {
  constructor(
    @repository(PagamentoRepository)
    public pagamentoRepository : PagamentoRepository,
  ) {}

  @post('/pagamento')
  @response(200, {
    description: 'Pagamento model instance',
    content: {'application/json': {schema: getModelSchemaRef(Pagamento)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pagamento, {
            title: 'NewPagamento',
            exclude: ['id'],
          }),
        },
      },
    })
    pagamento: Omit<Pagamento, 'id'>,
  ): Promise<Pagamento> {
    return this.pagamentoRepository.create(pagamento);
  }

  @get('/pagamento/count')
  @response(200, {
    description: 'Pagamento model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Pagamento) where?: Where<Pagamento>,
  ): Promise<Count> {
    return this.pagamentoRepository.count(where);
  }

  @get('/pagamento')
  @response(200, {
    description: 'Array of Pagamento model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Pagamento, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Pagamento) filter?: Filter<Pagamento>,
  ): Promise<Pagamento[]> {
    return this.pagamentoRepository.find(filter);
  }

  @patch('/pagamento')
  @response(200, {
    description: 'Pagamento PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pagamento, {partial: true}),
        },
      },
    })
    pagamento: Pagamento,
    @param.where(Pagamento) where?: Where<Pagamento>,
  ): Promise<Count> {
    return this.pagamentoRepository.updateAll(pagamento, where);
  }

  @get('/pagamento/{id}')
  @response(200, {
    description: 'Pagamento model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Pagamento, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Pagamento, {exclude: 'where'}) filter?: FilterExcludingWhere<Pagamento>
  ): Promise<Pagamento> {
    return this.pagamentoRepository.findById(id, filter);
  }

  @patch('/pagamento/{id}')
  @response(204, {
    description: 'Pagamento PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pagamento, {partial: true}),
        },
      },
    })
    pagamento: Pagamento,
  ): Promise<void> {
    await this.pagamentoRepository.updateById(id, pagamento);
  }

  @put('/pagamento/{id}')
  @response(204, {
    description: 'Pagamento PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() pagamento: Pagamento,
  ): Promise<void> {
    await this.pagamentoRepository.replaceById(id, pagamento);
  }

  @del('/pagamento/{id}')
  @response(204, {
    description: 'Pagamento DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.pagamentoRepository.deleteById(id);
  }
}
