import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Cliente, ClienteRelations, Dominio, Pagamento} from '../models';
import { DominioRepository } from './dominio.repository';
import { PagamentoRepository } from './pagamento.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.id,
  ClienteRelations
> {
  public readonly ClienteDominios: HasManyRepositoryFactory<
    Dominio,
    typeof Cliente.prototype.id
  >;
  public readonly clientePagamentos: HasManyRepositoryFactory<
    Pagamento,
    typeof Cliente.prototype.id
  >;
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('DominioRepository')
    dominioRepositoryGetter: Getter<DominioRepository>,
    @repository.getter('PagamentoRepository')
    pagamentoRepositoryGetter: Getter<PagamentoRepository>,
  ) {
    super(Cliente, dataSource);
    this.ClienteDominios = this.createHasManyRepositoryFactoryFor(
      'dominios',
      dominioRepositoryGetter, );
    this.clientePagamentos = this.createHasManyRepositoryFactoryFor(
      'pagamentos',
      pagamentoRepositoryGetter, );
  }
}
