import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Pagamento, PagamentoRelations} from '../models';

export class PagamentoRepository extends DefaultCrudRepository<
  Pagamento,
  typeof Pagamento.prototype.id,
  PagamentoRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Pagamento, dataSource);
  }
}
