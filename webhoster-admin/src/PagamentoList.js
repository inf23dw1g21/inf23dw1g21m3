import {List, Datagrid, TextField, NumberField, DateField,
    EditButton, Edit, SimpleForm, TextInput,
    NumberInput, DateInput, useRecordContext, Filter, ReferenceInput, SelectInput, CreateButton }
    from "react-admin";

const PostTitle = () => {
    const record = useRecordContext();
    return record ? (<span>Pagamento {`"${record.subject}"`}</span>):null;
    }

const PostFilter = (props) => <Filter {...props}>
<TextInput label="Procurar" source="numero_de_transacao" alwaysOn />
<ReferenceInput label="Pagamento" source="numero_de_transacao"
reference="pagamentos" allowEmpty>
<SelectInput optionText="numero_de_transacao" />
</ReferenceInput>
</Filter>
export const PagamentoList = (props) => (
    <List filters={<PostFilter />} {...props} >
        <CreateButton/> 
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
    <Edit title={<PostTitle />}>
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