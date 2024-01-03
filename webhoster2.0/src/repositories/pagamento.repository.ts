import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {WebhosterDataSource} from '../datasources';
import {Cliente, Pagamento, PagamentoRelations} from '../models';
import { ClienteRepository } from './cliente.repository';

export class PagamentoRepository extends DefaultCrudRepository<
  Pagamento,
  typeof Pagamento.prototype.id,
  PagamentoRelations
> {
  public readonly pagamentos: BelongsToAccessor<
    Cliente,
    typeof Pagamento.prototype.id
  >;
  constructor(
    @inject('datasources.webhoster') dataSource: WebhosterDataSource,
    @repository.getter('ClienteRepository')
    clienteRepositoryGetter: Getter<ClienteRepository>,
  ) {
    super(Pagamento, dataSource);
    this.pagamentos = this.createBelongsToAccessorFor(
      'pagamentos',
      clienteRepositoryGetter,
    );
  }
}
