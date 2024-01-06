import { Datagrid, DateField, EmailField, List, NumberField, TextField, EditButton } from 'react-admin';
import { DateInput, Edit, NumberInput, SimpleForm, TextInput } from 'react-admin';

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
            <EditButton />
        </Datagrid>
    </List>
);

export const ClienteEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="id" />
            <TextInput source="nome" />
            <TextInput source="tipo_de_conta" />
            <TextInput source="numero_fiscal" />
            <TextInput source="email" />
            <TextInput source="contacto" />
            <TextInput source="periodicidade_de_pagamento" />
            <DateInput source="data_ultimo_pagamento" />
            <NumberInput source="plano" />
        </SimpleForm>
    </Edit>
);