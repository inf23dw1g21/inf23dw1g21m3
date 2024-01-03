import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {WebhosterDataSource} from '../datasources';
import {Cliente, Plano, PlanoRelations} from '../models';
import { ClienteRepository } from './cliente.repository';

export class PlanoRepository extends DefaultCrudRepository<
  Plano,
  typeof Plano.prototype.id,
  PlanoRelations
> {
  public readonly clientesPlano: HasManyRepositoryFactory<
    Cliente,
    typeof Plano.prototype.id
    >;
  constructor(
    @inject('datasources.webhoster') dataSource: WebhosterDataSource,
    @repository.getter('ClienteRepository')
    clienteRepositoryGetter: Getter<ClienteRepository>,
  ) {
    super(Plano, dataSource);
    this.clientesPlano = this.createHasManyRepositoryFactoryFor(
      'clientesPlano',
      clienteRepositoryGetter,
    );
  }
}
