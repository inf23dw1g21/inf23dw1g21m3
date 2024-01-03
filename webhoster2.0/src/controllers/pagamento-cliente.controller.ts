import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Pagamento,
  Cliente,
} from '../models';
import {PagamentoRepository} from '../repositories';

export class PagamentoClienteController {
  constructor(
    @repository(PagamentoRepository)
    public pagamentoRepository: PagamentoRepository,
  ) { }

  @get('/pagamentos/{id}/cliente', {
    responses: {
      '200': {
        description: 'Cliente belonging to Pagamento',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Cliente),
          },
        },
      },
    },
  })
  async getCliente(
    @param.path.number('id') id: typeof Pagamento.prototype.id,
  ): Promise<Cliente> {
    return this.pagamentoRepository.pagamentos(id);
  }
}
