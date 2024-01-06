import { Datagrid, DateField, EmailField, List, NumberField, TextField } from 'react-admin';

export const ClienteList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="nome" />
            <TextField source="tipo_de_conta" />
            <TextField source="numero_fiscal" />
            <EmailField source="email" />
            <TextField source="contacto" />
            <TextField source="periodicidade_de_pagamento" />
            <DateField source="data_ultimo_pagamento" />
            <NumberField source="plano" />
        </Datagrid>
    </List>
);