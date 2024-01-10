import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Dominio,
  Cliente,
} from '../models';
import {DominioRepository} from '../repositories';

export class DominioClienteController {
  constructor(
    @repository(DominioRepository)
    public dominioRepository: DominioRepository,
  ) { }

  @get('/dominios/{id}/cliente', {
    responses: {
      '200': {
        description: 'Cliente belonging to Dominio',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Cliente),
          },
        },
      },
    },
  })
  async getCliente(
    @param.path.number('id') id: typeof Dominio.prototype.id,
  ): Promise<Cliente> {
    return this.dominioRepository.cliente(id);
  }
}
