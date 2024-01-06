import {List, Datagrid, TextField, NumberField, DateField,
    EditButton, Edit, SimpleForm, TextInput,
    NumberInput, DateInput, ReferenceInput, SelectInput, EmailField, useRecordContext, Filter }
    from "react-admin";

const PostTitle = () => {
    const record = useRecordContext();
    return record ? (<span>Cliente {`"${record.subject}"`}</span>):null;
    }

const PostFilter = (props) => <Filter {...props}>
<TextInput label="Procura" source="subject" alwaysOn />
<ReferenceInput label="Cliente" source="id"
reference="clientes" allowEmpty>
<SelectInput optionText="description" />
</ReferenceInput>
</Filter>
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