import {List, Datagrid, TextField, NumberField, DateField,
    EditButton, Edit, SimpleForm, TextInput,
    NumberInput, DateInput, useRecordContext, Filter, ReferenceInput, SelectInput }
    from "react-admin";

const PostTitle = () => {
    const record = useRecordContext();
    return record ? (<span>Pagamento {`"${record.subject}"`}</span>):null;
    }

const PostFilter = (props) => <Filter {...props}>
<TextInput label="Procurar" source="subject" alwaysOn />
<ReferenceInput label="Pagamento" source="id"
reference="pagamentos" allowEmpty>
<SelectInput optionText="description" />
</ReferenceInput>
</Filter>
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