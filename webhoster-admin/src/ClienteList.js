import {
    List, Datagrid, TextField, NumberField, DateField,
    EditButton, Edit, SimpleForm, TextInput,
    NumberInput, DateInput, ReferenceInput, SelectInput, EmailField, useRecordContext, Filter, CreateButton, useNotify,
    useRefresh,
    useRedirect,
}
    from "react-admin";
import React, { useState, useEffect } from 'react';

const PostTitle = () => {
    const record = useRecordContext();
    return record ? (<span>Cliente {`"${record.subject}"`}</span>) : null;
}

const PostFilter = (props) => <Filter {...props}>
    <TextInput label="Procurar" source="email" alwaysOn />
    <ReferenceInput label="Cliente" source="email"
        reference="clientes" allowEmpty>
        <SelectInput optionText="email" />
    </ReferenceInput>
</Filter>
export const ClienteList = (props) => (
    <List filters={<PostFilter />} {...props}>
        <CreateButton />
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
    <Edit title={<PostTitle />}>
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
export const ClienteCreate = (props) => {
    const notify = useNotify();
    const refresh = useRefresh();
    const redirect = useRedirect();
    const onSuccess = ({ data }) => {
        notify(`Novo cliente criado `);
        redirect(`/clientes/${data.id}`);
        refresh();
    };
    const [clientes, setClientes] = useState([]);
    const { data: cliente } = useQuery({
        type: 'getList',
        resource: 'clientes',
        payload: {
            pagination: { page: 1, perPage: 600 },
            sort: { field: 'email', order: 'ASC' },
            filter: {},
        }
    });
useEffect(() => {

    if (cliente)
        setClientes(cliente.map((d) => ({ id: d.id, name: d.nome })));
},
    [cliente]);
return (
    <Create {...props} title='Create new Rental' onSuccess={onSuccess}>
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
    </Create>
)};