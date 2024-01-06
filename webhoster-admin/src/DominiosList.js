import { BooleanField, Datagrid, DateField, List, NumberField, TextField, EditButton } from 'react-admin';

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