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
import {Dominio} from '../models';
import {DominioRepository} from '../repositories';

export class DominioController {
  constructor(
    @repository(DominioRepository)
    public dominioRepository : DominioRepository,
  ) {}

  @post('/dominio')
  @response(200, {
    description: 'Dominio model instance',
    content: {'application/json': {schema: getModelSchemaRef(Dominio)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Dominio, {
            title: 'NewDominio',
            exclude: ['id'],
          }),
        },
      },
    })
    dominio: Omit<Dominio, 'id'>,
  ): Promise<Dominio> {
    return this.dominioRepository.create(dominio);
  }

  @get('/dominio/count')
  @response(200, {
    description: 'Dominio model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Dominio) where?: Where<Dominio>,
  ): Promise<Count> {
    return this.dominioRepository.count(where);
  }

  @get('/dominio')
  @response(200, {
    description: 'Array of Dominio model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Dominio, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Dominio) filter?: Filter<Dominio>,
  ): Promise<Dominio[]> {
    return this.dominioRepository.find(filter);
  }

  @patch('/dominio')
  @response(200, {
    description: 'Dominio PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Dominio, {partial: true}),
        },
      },
    })
    dominio: Dominio,
    @param.where(Dominio) where?: Where<Dominio>,
  ): Promise<Count> {
    return this.dominioRepository.updateAll(dominio, where);
  }

  @get('/dominio/{id}')
  @response(200, {
    description: 'Dominio model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Dominio, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Dominio, {exclude: 'where'}) filter?: FilterExcludingWhere<Dominio>
  ): Promise<Dominio> {
    return this.dominioRepository.findById(id, filter);
  }

  @patch('/dominio/{id}')
  @response(204, {
    description: 'Dominio PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Dominio, {partial: true}),
        },
      },
    })
    dominio: Dominio,
  ): Promise<void> {
    await this.dominioRepository.updateById(id, dominio);
  }

  @put('/dominio/{id}')
  @response(204, {
    description: 'Dominio PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() dominio: Dominio,
  ): Promise<void> {
    await this.dominioRepository.replaceById(id, dominio);
  }

  @del('/dominio/{id}')
  @response(204, {
    description: 'Dominio DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.dominioRepository.deleteById(id);
  }
}
