import {List, Datagrid, TextField, NumberField, DateField, EditButton, Edit, SimpleForm, TextInput,
    NumberInput, DateInput, useRecordContext, BooleanField, BooleanInput, Filter, ReferenceInput, SelectInput, CreateButton }
    from "react-admin";

const PostFilter = (props) => <Filter {...props}>
<TextInput label="Procurar" source="cliente" alwaysOn />
<ReferenceInput label="Dominio" source="cliente"
reference="dominios" allowEmpty>
<SelectInput optionText="cliente" />
</ReferenceInput>
</Filter>

export const DominioList = (props) => (
    <List filters={<PostFilter />} {...props}>
        <CreateButton/>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="nome" />
            <TextField source="codigo_TLD" />
            <BooleanField source="estado" />
            <DateField source="data_de_inicio" />
            <DateField source="data_de_fim" />
            <NumberField source="cliente" />
            <EditButton />
        </Datagrid>
    </List>
);
const PostTitle = () => {
    const record = useRecordContext();
    return record ? (<span>Dominio {`"${record.subject}"`}</span>):null;
    }
export const DominioEdit = () => (
    <Edit title={<PostTitle />}>
        <SimpleForm>
            <TextInput source="id" />
            <TextInput source="nome" />
            <TextInput source="codigo_TLD" />
            <BooleanInput source="estado" />
            <DateInput source="data_de_inicio" />
            <DateInput source="data_de_fim" />
            <NumberInput source="cliente" />
        </SimpleForm>
    </Edit>
);