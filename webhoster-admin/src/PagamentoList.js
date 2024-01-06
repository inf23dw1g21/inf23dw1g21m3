import { Datagrid, DateField, List, NumberField, TextField, EditButton } from 'react-admin';
import { DateInput, Edit, NumberInput, SimpleForm, TextInput } from 'react-admin';

export const PagamentoList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <DateField source="timestamp" />
            <NumberField source="valor" />
            <TextField source="metodo_de_pagamento" />
            <TextField source="numero_de_transacao" />
            <NumberField source="cliente" />
            <EditButton/>
        </Datagrid>
    </List>
);
export const PagamentoEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="id" />
            <DateInput source="timestamp" />
            <NumberInput source="valor" />
            <TextInput source="metodo_de_pagamento" />
            <TextInput source="numero_de_transacao" />
            <NumberInput source="cliente" />
        </SimpleForm>
    </Edit>
);