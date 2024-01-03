import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {WebhosterDataSource} from '../datasources';
import {Cliente, ClienteRelations, Dominio, Pagamento, Plano} from '../models';
import { DominioRepository } from './dominio.repository';
import { PagamentoRepository } from './pagamento.repository';
import { PlanoRepository } from './plano.repository';

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
  public readonly planos: BelongsToAccessor<
    Plano,
    typeof Cliente.prototype.id
  >;
  constructor(
    @inject('datasources.webhoster') dataSource: WebhosterDataSource,
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
        this.planos = this.createBelongsToAccessorFor(
          'planos',
          planoRepositoryGetter,
        );
  }
}
