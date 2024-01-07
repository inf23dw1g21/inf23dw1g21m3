import {List, Datagrid, TextField, NumberField, DateField,
    EditButton, Edit, SimpleForm, TextInput,
    NumberInput, DateInput, useRecordContext, Filter, ReferenceInput, SelectInput, CreateButton, SaveButton, 
    Toolbar, Create, useNotify, useRedirect }
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
            <TextInput disabled label="Id" source="id"  />
            <TextInput source="timestamp" defaultValue={"2018-03-20T09:12:28Z"}/>
            <NumberInput source="valor" />
            <TextInput source="metodo_de_pagamento" />
            <TextInput source="numero_de_transacao" />
            <NumberInput source="cliente" />
        </SimpleForm>
    </Edit>
);

const PostCreateToolbar = () => {    
    const redirect = useRedirect();    
    const notify = useNotify();
    return (
        <Toolbar>
        <SaveButton label="Guardar e Mostrar"/>
        <SaveButton label="Guardar" 
        mutationOptions={{                    
            onSuccess: data => {                        
                notify('ra.notification.created', {                            
                    type: 'info',                            
                    messageArgs: { smart_count: 1 },                        
                });                        
                redirect(false);                    
            }}                
        }                
        type="button"
                variant="text"/>
        </Toolbar>
        );
    };

    export const PagamentoCreate = () => (
        <Create title={<PostTitle />}>
            <SimpleForm toolbar={<PostCreateToolbar />}>
                <TextInput source="timestamp" defaultValue={"2018-03-20T09:12:28Z"}/>
                <NumberInput source="valor" />
                <TextInput source="metodo_de_pagamento" />
                <TextInput source="numero_de_transacao" />
            </SimpleForm>
        </Create>
    );