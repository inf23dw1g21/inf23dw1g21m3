import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Cliente,
  Plano,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClientePlanoController {
  constructor(
    @repository(ClienteRepository)
    public clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/plano', {
    responses: {
      '200': {
        description: 'Plano belonging to Cliente',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Plano),
          },
        },
      },
    },
  })
  async getPlano(
    @param.path.number('id') id: typeof Cliente.prototype.id,
  ): Promise<Plano> {
    return this.clienteRepository.plano(id);
  }
}
