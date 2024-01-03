import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {Cliente, Pagamento, PagamentoRelations} from '../models';
import { ClienteRepository } from './cliente.repository';
import { DbDataSource } from '../datasources/db.datasource';

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
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('ClienteRepository')
    clienteRepositoryGetter: Getter<ClienteRepository>,
  ) {
    super(Pagamento, dataSource);
    this.pagamentos = this.createBelongsToAccessorFor(
      'cliente',
      clienteRepositoryGetter,
    );
  }
}
