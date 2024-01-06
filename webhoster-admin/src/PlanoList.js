import { Datagrid, List, NumberField, TextField, EditButton } from 'react-admin';

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