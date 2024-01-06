import { BooleanField, Datagrid, DateField, List, NumberField, TextField, EditButton } from 'react-admin';
import { DateInput, Edit, NumberInput, SimpleForm, TextInput, BooleanInput } from 'react-admin';

export const DominioList = () => (
    <List>
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
export const DominioEdit = () => (
    <Edit>
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