import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Dominio, DominioRelations, Cliente} from '../models';
import {ClienteRepository} from './cliente.repository';

export class DominioRepository extends DefaultCrudRepository<
  Dominio,
  typeof Dominio.prototype.id,
  DominioRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof Dominio.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>,
  ) {
    super(Dominio, dataSource);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
