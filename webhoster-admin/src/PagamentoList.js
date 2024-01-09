import {
  List,
  Datagrid,
  TextField,
  NumberField,
  DateField,
  EditButton,
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  useRecordContext,
  Filter,
  ReferenceInput,
  SelectInput,
  SaveButton,
  Toolbar,
  Create,
  useNotify,
  useRedirect,
  ReferenceField
} from "react-admin";

const PostTitle = () => {
  const record = useRecordContext();
  return record ? <span>Pagamento {`"${record.subject}"`}</span> : null;
};

const PostFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Procurar" source="cliente" alwaysOn />
    <ReferenceInput
      label="Pagamento"
      source="cliente"
      reference="pagamentos"
      allowEmpty
    >
      <SelectInput optionText="cliente" />
    </ReferenceInput>
  </Filter>
);
export const PagamentoList = (props) => (
  <List filters={<PostFilter />} {...props}>
    <Datagrid rowClick={(id, basePath, record)=>{
      return `/pagamentos?displayedFilters=%7B%7D&filter=%7B"cliente"%3A"${record.id}"%7D&order=ASC&page=1&perPage=10&sort=id`
    }}>
      <NumberField source="id" />
      <DateField source="timestamp" />
      <NumberField source="valor" />
      <TextField source="metodo_de_pagamento" />
      <TextField source="numero_de_transacao" />
      <ReferenceField source="clienteId" reference="clientes">
        <TextField source="email" />
      </ReferenceField>
      <EditButton />
    </Datagrid>
  </List>
);
export const PagamentoEdit = (props) => (
  <Edit title={<PostTitle />} {...props}>
    <SimpleForm>
      <NumberInput disabled label="Id" source="id" />
      <TextInput source="timestamp" defaultValue={"2018-03-20T09:12:28Z"} />
      <NumberInput source="valor" />
      <TextInput source="metodo_de_pagamento" />
      <TextInput source="numero_de_transacao" />
      <ReferenceInput source="clienteId" reference="clientes">
        <SelectInput />
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
      <SaveButton
        label="Guardar"
        mutationOptions={{
          onSuccess: (data) => {
            notify("ra.notification.created", {
              type: "info",
              messageArgs: { smart_count: 1 },
            });
            redirect(false);
          },
        }}
        type="button"
        variant="text"
      />
    </Toolbar>
  );
};

export const PagamentoCreate = (props) => (
  <Create title={<PostTitle />} {...props}>
    <SimpleForm toolbar={<PostCreateToolbar />}>
      <TextInput source="timestamp" defaultValue={"2018-03-20T09:12:28Z"} />
      <NumberInput source="valor" />
      <TextInput source="metodo_de_pagamento" />
      <TextInput source="numero_de_transacao" />
      <ReferenceInput source="clienteId" reference="clientes">
        <SelectInput />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);
