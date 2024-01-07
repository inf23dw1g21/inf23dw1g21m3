import {
    List, Datagrid, TextField, NumberField, DateField, EditButton, Edit, SimpleForm, TextInput,
    NumberInput, DateInput, useRecordContext, BooleanField, BooleanInput, Filter, ReferenceInput, SelectInput, CreateButton, SaveButton,
    Toolbar, Create, useNotify, useRedirect
}
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
        <CreateButton />
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
    return record ? (<span>Dominio {`"${record.subject}"`}</span>) : null;
}
export const DominioEdit = (props) => (
    <Edit title={<PostTitle />} {...props}>
        <SimpleForm>
            <TextInput disabled label="Id" source="id" />
            <TextInput source="nome" />
            <TextInput source="codigo_TLD" />
            <BooleanInput source="estado" />
            <TextInput source="data_de_inicio" defaultValue={"2018-03-20T09:12:28Z"}/>
            <TextInput source="data_de_fim" defaultValue={"2018-03-20T09:12:28Z"} />
            <NumberInput source="cliente" />
        </SimpleForm>
    </Edit>
);

const PostCreateToolbar = () => {
    const redirect = useRedirect();
    const notify = useNotify();
    return (
        <Toolbar>
            <SaveButton label="Guardar e Mostrar" />
            <SaveButton label="Guardar"
                mutationOptions={{
                    onSuccess: data => {
                        notify('ra.notification.created', {
                            type: 'info',
                            messageArgs: { smart_count: 1 },
                        });
                        redirect(false);
                    }
                }
                }
                type="button"
                variant="text" />
        </Toolbar>
    );
};

export const DominioCreate = (props) => (
    <Create title={<PostTitle />} {...props}>
        <SimpleForm toolbar={<PostCreateToolbar />}>
            <TextInput source="nome" />
            <TextInput source="codigo_TLD" />
            <BooleanInput source="estado" />
            <TextInput source="data_de_inicio" defaultValue={"2023-03-20T09:12:28Z"} />
            <TextInput source="data_de_fim" defaultValue={"2024-03-20T09:12:28Z"}/>
        </SimpleForm>
    </Create>
);