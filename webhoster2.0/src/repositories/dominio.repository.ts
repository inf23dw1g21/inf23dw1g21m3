import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Dominio, DominioRelations} from '../models';

export class DominioRepository extends DefaultCrudRepository<
  Dominio,
  typeof Dominio.prototype.id,
  DominioRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Dominio, dataSource);
  }
}
