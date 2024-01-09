import {
  List,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  Edit,
  SimpleForm,
  TextInput,
  ReferenceInput,
  SelectInput,
  ReferenceField,
  EmailField,
  useRecordContext,
  Filter,
  useNotify,
  useRedirect,
  Create,
  SaveButton,
  Toolbar,
  NumberField,
  NumberInput,
  DateTimeInput,
} from "react-admin";

const PostTitle = () => {
  const record = useRecordContext();
  return record ? <span>Cliente {`"${record.subject}"`}</span> : null;
};

const PostFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Procurar" source="email" alwaysOn />
    <ReferenceInput
      label="Cliente"
      source="email"
      reference="clientes"
      allowEmpty
    >
      <SelectInput optionText="email" />
    </ReferenceInput>
  </Filter>
);
export const ClienteList = (props) => (
  <List filters={<PostFilter />} {...props}>
    <Datagrid
      rowClick={(id, basePath, record) => {
        return `/dominios?displayedFilters=%7B%7D&filter=%7B%221%22%3A%221%22%2C%22cliente%22%3A%22${record.id}%22%7D&order=ASC&page=1&perPage=10&sort=id`;
      }}
    >
      <NumberField source="id" />
      <TextField source="nome" />
      <TextField source="tipo_de_conta" />
      <TextField source="numero_fiscal" />
      <EmailField source="email" />
      <TextField source="contacto" />
      <TextField source="periodicidade_de_pagamento" />
      <DateField source="data_ultimo_pagamento" />
      <ReferenceField source="planoId" reference="planos">
        <TextField source="tipo_de_plano" />
      </ReferenceField>
      <EditButton />
    </Datagrid>
  </List>
);


  const PostCreateToolbar = (props) => {
    const redirect = useRedirect();
    const notify = useNotify();
    return (
      <Toolbar {...props}>
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
  export const ClienteCreate = (props) => (
    <Create {...props}>
      <SimpleForm>
        <TextInput source="nome" defaultValue={"João Mono"} />
        <TextInput source="tipo_de_conta" defaultValue={"Pessoal"} />
        <TextInput source="numero_fiscal" defaultValue={"PT005020505"} />
        <TextInput source="email" defaultValue={"a05405@umaia.pt"} />
        <TextInput source="contacto" defaultValue={"54604606046"} />
        <TextInput source="periodicidade_de_pagamento" defaultValue={"Mensal"} />
        <DateTimeInput source="data_ultimo_pagamento" defaultValue={new Date()} />
        <ReferenceInput source="planoId" reference="planos">
          <SelectInput optionText="tipo_de_plano" />
        </ReferenceInput>
      </SimpleForm>
    </Create>
  );
  
  export const ClienteEdit = (props) => (
    <Edit title={<PostTitle />} {...props}>
      <SimpleForm>
        <NumberInput disabled label="Id" source="id" />
        <TextInput source="nome" />
        <TextInput source="tipo_de_conta" />
        <TextInput source="numero_fiscal" />
        <TextInput source="email" />
        <TextInput source="contacto" />
        <TextInput source="periodicidade_de_pagamento" />
        <DateTimeInput source="data_ultimo_pagamento" />
        <ReferenceInput source="planoId" reference="planos">
          <SelectInput optionText="tipo_de_plano" />
        </ReferenceInput>
        <NumberInput source="planoId" />
      </SimpleForm>
    </Edit>
  );