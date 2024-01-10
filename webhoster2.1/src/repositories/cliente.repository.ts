import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Cliente, ClienteRelations, Plano, Dominio, Pagamento} from '../models';
import {PlanoRepository} from './plano.repository';
import {DominioRepository} from './dominio.repository';
import {PagamentoRepository} from './pagamento.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.id,
  ClienteRelations
> {

  public readonly plano: BelongsToAccessor<Plano, typeof Cliente.prototype.id>;

  public readonly dominios: HasManyRepositoryFactory<Dominio, typeof Cliente.prototype.id>;

  public readonly pagamentos: HasManyRepositoryFactory<Pagamento, typeof Cliente.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('PlanoRepository') protected planoRepositoryGetter: Getter<PlanoRepository>, @repository.getter('DominioRepository') protected dominioRepositoryGetter: Getter<DominioRepository>, @repository.getter('PagamentoRepository') protected pagamentoRepositoryGetter: Getter<PagamentoRepository>,
  ) {
    super(Cliente, dataSource);
    this.pagamentos = this.createHasManyRepositoryFactoryFor('pagamentos', pagamentoRepositoryGetter,);
    this.registerInclusionResolver('pagamentos', this.pagamentos.inclusionResolver);
    this.dominios = this.createHasManyRepositoryFactoryFor('dominios', dominioRepositoryGetter,);
    this.registerInclusionResolver('dominios', this.dominios.inclusionResolver);
    this.plano = this.createBelongsToAccessorFor('plano', planoRepositoryGetter,);
    this.registerInclusionResolver('plano', this.plano.inclusionResolver);
  }
}
