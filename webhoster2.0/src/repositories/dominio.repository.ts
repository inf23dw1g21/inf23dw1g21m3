import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {Cliente, Dominio, DominioRelations} from '../models';
import { ClienteRepository } from './cliente.repository';
import { DbDataSource } from '../datasources/db.datasource';

export class DominioRepository extends DefaultCrudRepository<
  Dominio,
  typeof Dominio.prototype.id,
  DominioRelations
> {
  public readonly cliente: BelongsToAccessor<
    Cliente,
    typeof Dominio.prototype.id
  >;
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('ClienteRepository')
    clienteRepositoryGetter: Getter<ClienteRepository>,
  ) {
    super(Dominio, dataSource);
    this.cliente = this.createBelongsToAccessorFor(
      'cliente',
      clienteRepositoryGetter,
    );
  }
}
