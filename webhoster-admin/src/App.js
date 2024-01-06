import { Admin, Resource, ListGuesser, EditGuesser } from "react-admin";
import lb4Provider from "react-admin-lb4";
import { ClienteEdit, ClienteList } from "./ClienteList";
import { PagamentoEdit, PagamentoList } from "./PagamentoList";
import { PlanoEdit, PlanoList } from "./PlanoList";
import { DominioEdit, DominioList } from "./DominiosList";
const dataProvider = lb4Provider("http://localhost:3000");
const App = () => (
 <Admin dataProvider={dataProvider}>
 <Resource name="clientes" list={ClienteList} edit={ClienteEdit}/>
 <Resource name="pagamentos" list={PagamentoList} edit={PagamentoEdit}/>
 <Resource name="planos" list={PlanoList} edit={PlanoEdit}/>
 <Resource name="dominios" list={DominioList} edit={DominioEdit}/>
 </Admin>
);
export default App;
