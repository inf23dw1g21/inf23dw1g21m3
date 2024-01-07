import {
    List, Datagrid, TextField, NumberField, EditButton, Edit, SimpleForm, TextInput,
    NumberInput, useRecordContext, Filter, ReferenceInput, SelectInput, SaveButton,
    Toolbar, Create, useNotify, useRedirect
}
    from "react-admin";

const PostTitle = () => {
    const record = useRecordContext();
    return record ? (<span>Plano {`"${record.subject}"`}</span>) : null;
}

const PostFilter = (props) => <Filter {...props}>
    <TextInput label="Procurar" source="periodicidade" alwaysOn />
    <ReferenceInput label="Plano" source="periodicidade"
        reference="planos" allowEmpty>
        <SelectInput optionText="periodicidade" />
    </ReferenceInput>
</Filter>

export const PlanoList = (props) => (
    <List filters={<PostFilter />} {...props}>
        <Datagrid rowClick="edit">
            <NumberField source="id" />
            <TextField source="tipo_de_plano" />
            <TextField source="periodicidade" />
            <NumberField source="preco" />
            <TextField source="armazenamento" />
            <NumberField source="numero_de_contas_email" />
            <NumberField source="numero_de_dominios" />
            <TextField source="largura_de_banda" />
            <TextField source="fidelizacao" />
            <EditButton />
        </Datagrid>
    </List>
);
export const PlanoEdit = (props) => (
    <Edit title={<PostTitle />} {...props}>
        <SimpleForm>
            <NumberInput disabled label="Id" source="id" />
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

export const PlanoCreate = (props) => (
    <Create title={<PostTitle />} {...props}>
        <SimpleForm toolbar={<PostCreateToolbar />}>
            <TextInput source="tipo_de_plano" />
            <TextInput source="periodicidade" />
            <NumberInput source="preco" />
            <TextInput source="armazenamento" />
            <NumberInput source="numero_de_contas_email" />
            <NumberInput source="numero_de_dominios" />
            <TextInput source="largura_de_banda" />
            <TextInput source="fidelizacao" />
        </SimpleForm>
    </Create>
);