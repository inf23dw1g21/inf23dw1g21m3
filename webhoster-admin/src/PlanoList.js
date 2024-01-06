import {List, Datagrid, TextField, NumberField, EditButton, Edit, SimpleForm, TextInput,
    NumberInput, useRecordContext, Filter, ReferenceInput, SelectInput }
    from "react-admin";

const PostTitle = () => {
    const record = useRecordContext();
    return record ? (<span>Plano {`"${record.subject}"`}</span>):null;
    }

    const PostFilter = (props) => <Filter {...props}>
<TextInput label="Procurar" source="subject" alwaysOn />
<ReferenceInput label="Plano" source="id"
reference="planos" allowEmpty>
<SelectInput optionText="description" />
</ReferenceInput>
</Filter>

export const PlanoList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="tipo_de_plano" />
            <TextField source="periodicidade" />
            <NumberField source="preco" />
            <TextField source="armazenamento" />
            <NumberField source="numero_de_contas_email" />
            <NumberField source="numero_de_dominios" />
            <TextField source="largura_de_banda" />
            <TextField source="fidelizacao" />
            <EditButton/>
        </Datagrid>
    </List>
);
export const PlanoEdit = () => (
    <Edit title={<PostTitle />}>
        <SimpleForm>
            <TextInput source="id" />
            <TextInput source="tipo_de_plano" />
            <TextInput source="periodicidade" />
            <NumberInput source="preco" />
            <TextInput source="armazenamento" />
            <NumberInput source="numero_de_contas_email" />
            <NumberInput source="numero_de_dominios" />
            <TextInput source="largura_de_banda" />
            <TextInput source="fidelizacao" />
        </SimpleForm>
    </Edit>
);