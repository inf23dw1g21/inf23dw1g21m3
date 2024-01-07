import {
    List, Datagrid, TextField, DateField,
    EditButton, Edit, SimpleForm, TextInput,
     ReferenceInput, SelectInput, ReferenceField,EmailField, useRecordContext, Filter, useNotify,
    useRedirect,
    Create,
    SaveButton,
    Toolbar
}from "react-admin";

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
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="nome" />
            <TextField source="tipo_de_conta" />
            <TextField source="numero_fiscal" />
            <EmailField source="email" />
            <TextField source="contacto" />
            <TextField source="periodicidade_de_pagamento" />
            <DateField source="data_ultimo_pagamento" />
            <ReferenceField source="plano" reference="planos">
                <TextField source="tipo_de_plano" />
            </ReferenceField>
            <EditButton />
        </Datagrid>
    </List>
);

export const ClienteEdit = (props) => (
    <Edit title={<PostTitle />} {...props}>
        <SimpleForm>
            <TextInput disabled label="Id" source="id" />
            <TextInput source="nome" />
            <TextInput source="tipo_de_conta" />
            <TextInput source="numero_fiscal" />
            <TextInput source="email" />
            <TextInput source="contacto" />
            <TextInput source="periodicidade_de_pagamento" />
            <TextInput source="data_ultimo_pagamento" defaultValue={"2018-03-20T09:12:28Z"} />
            <ReferenceInput source="plano" reference="planos">
                <SelectInput optionText="tipo_de_plano" optionValue="id"/>
            </ReferenceInput>
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

export const ClienteCreate = (props) => (

    <Create  {...props}>
        <SimpleForm toolbar={<PostCreateToolbar />}>
            <TextInput source="nome" />
            <TextInput source="tipo_de_conta" />
            <TextInput source="numero_fiscal" />
            <TextInput source="email" />
            <TextInput source="contacto" />
            <TextInput source="periodicidade_de_pagamento" />
            <TextInput source="data_ultimo_pagamento" defaultValue={"2018-03-20T09:12:28Z"} />
            <ReferenceInput source="plano" reference="planos">
                    <SelectInput/>
            </ReferenceInput>
        </SimpleForm>
    </Create>
);