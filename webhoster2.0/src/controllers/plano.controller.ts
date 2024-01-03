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
import {Plano} from '../models';
import {PlanoRepository} from '../repositories';

export class PlanoController {
  constructor(
    @repository(PlanoRepository)
    public planoRepository : PlanoRepository,
  ) {}

  @post('/plano')
  @response(200, {
    description: 'Plano model instance',
    content: {'application/json': {schema: getModelSchemaRef(Plano)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Plano, {
            title: 'NewPlano',
            exclude: ['id'],
          }),
        },
      },
    })
    plano: Omit<Plano, 'id'>,
  ): Promise<Plano> {
    return this.planoRepository.create(plano);
  }

  @get('/plano/count')
  @response(200, {
    description: 'Plano model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Plano) where?: Where<Plano>,
  ): Promise<Count> {
    return this.planoRepository.count(where);
  }

  @get('/plano')
  @response(200, {
    description: 'Array of Plano model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Plano, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Plano) filter?: Filter<Plano>,
  ): Promise<Plano[]> {
    return this.planoRepository.find(filter);
  }

  @patch('/plano')
  @response(200, {
    description: 'Plano PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Plano, {partial: true}),
        },
      },
    })
    plano: Plano,
    @param.where(Plano) where?: Where<Plano>,
  ): Promise<Count> {
    return this.planoRepository.updateAll(plano, where);
  }

  @get('/plano/{id}')
  @response(200, {
    description: 'Plano model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Plano, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Plano, {exclude: 'where'}) filter?: FilterExcludingWhere<Plano>
  ): Promise<Plano> {
    return this.planoRepository.findById(id, filter);
  }

  @patch('/plano/{id}')
  @response(204, {
    description: 'Plano PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Plano, {partial: true}),
        },
      },
    })
    plano: Plano,
  ): Promise<void> {
    await this.planoRepository.updateById(id, plano);
  }

  @put('/plano/{id}')
  @response(204, {
    description: 'Plano PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() plano: Plano,
  ): Promise<void> {
    await this.planoRepository.replaceById(id, plano);
  }

  @del('/plano/{id}')
  @response(204, {
    description: 'Plano DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.planoRepository.deleteById(id);
  }
}
