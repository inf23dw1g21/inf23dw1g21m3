import { Datagrid, List, NumberField, TextField, EditButton } from 'react-admin';
import { DateInput, Edit, NumberInput, SimpleForm, TextInput } from 'react-admin';

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
    <Edit>
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