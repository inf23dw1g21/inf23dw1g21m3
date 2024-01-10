import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Pagamento, PagamentoRelations, Cliente} from '../models';
import {ClienteRepository} from './cliente.repository';

export class PagamentoRepository extends DefaultCrudRepository<
  Pagamento,
  typeof Pagamento.prototype.id,
  PagamentoRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof Pagamento.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>,
  ) {
    super(Pagamento, dataSource);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
