import { Datagrid, DateField, List, NumberField, TextField } from 'react-admin';

export const PagamentoList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <DateField source="timestamp" />
            <NumberField source="valor" />
            <TextField source="metodo_de_pagamento" />
            <TextField source="numero_de_transacao" />
            <NumberField source="cliente" />
        </Datagrid>
    </List>
);