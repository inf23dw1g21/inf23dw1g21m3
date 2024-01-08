import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {Cliente, ClienteRelations, Dominio, Pagamento, Plano} from '../models';
import { DominioRepository } from './dominio.repository';
import { PagamentoRepository } from './pagamento.repository';
import { PlanoRepository } from './plano.repository';
import { DbDataSource } from '../datasources/db.datasource';

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
  public readonly plano: BelongsToAccessor<
    Plano,
    typeof Cliente.prototype.id
  >;
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('DominioRepository')
    dominioRepositoryGetter: Getter<DominioRepository>,
    @repository.getter('PagamentoRepository')
    pagamentoRepositoryGetter: Getter<PagamentoRepository>,
    @repository.getter('PlanoRepository')
    planoRepositoryGetter: Getter<PlanoRepository>,
  ) {
    super(Cliente, dataSource);
    this.ClienteDominios = this.createHasManyRepositoryFactoryFor(
      'dominios',
      dominioRepositoryGetter, );
    this.clientePagamentos = this.createHasManyRepositoryFactoryFor(
      'pagamentos',
      pagamentoRepositoryGetter, );
      this.plano = this.createBelongsToAccessorFor(
        'plano', 
        planoRepositoryGetter, 
      );
  }
}
