import {
    List, Datagrid, TextField, NumberField, DateField,
    EditButton, Edit, SimpleForm, TextInput,
    NumberInput, ReferenceInput, SelectInput, EmailField, useRecordContext, Filter, CreateButton, useNotify,
    useRedirect,
    Create,
    DateTimeInput,
    SaveButton, 
    Toolbar
}
    from "react-admin";
import React, { useState, useEffect} from 'react';
 
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
            <TextInput disabled label="Id" source="id" />
            <TextInput source="nome" />
            <TextInput source="tipo_de_conta" />
            <TextInput source="numero_fiscal" />
            <TextInput source="email" />
            <TextInput source="contacto" />
            <TextInput source="periodicidade_de_pagamento" />
            <TextInput source="data_ultimo_pagamento" defaultValue={"2018-03-20T09:12:28Z"}/>
            <NumberInput source="plano" />
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

export const ClienteCreate = () => (
          
      <Create>
        <SimpleForm toolbar={<PostCreateToolbar />}>
          <TextInput source="nome" />
          <TextInput source="tipo_de_conta"/>
          <TextInput source="numero_fiscal" />
          <TextInput source="email" />
          <TextInput source="contacto" />
          <TextInput source="periodicidade_de_pagamento" />
          <TextInput source="data_ultimo_pagamento" defaultValue={"2018-03-20T09:12:28Z"}/>
        </SimpleForm>
      </Create>
);