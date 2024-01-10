import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Plano, PlanoRelations, Cliente} from '../models';
import {ClienteRepository} from './cliente.repository';

export class PlanoRepository extends DefaultCrudRepository<
  Plano,
  typeof Plano.prototype.id,
  PlanoRelations
> {

  public readonly clientes: HasManyRepositoryFactory<Cliente, typeof Plano.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>,
  ) {
    super(Plano, dataSource);
    this.clientes = this.createHasManyRepositoryFactoryFor('clientes', clienteRepositoryGetter,);
    this.registerInclusionResolver('clientes', this.clientes.inclusionResolver);
  }
}
