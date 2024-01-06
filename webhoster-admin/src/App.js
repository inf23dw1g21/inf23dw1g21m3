import { Admin, Resource, ListGuesser } from "react-admin";
import lb4Provider from "react-admin-lb4";
import { ClienteList } from "./ClienteList";
import { PagamentoList } from "./PagamentoList";
import { PlanoList } from "./PlanoList";
import { DominioList } from "./DominiosList";
const dataProvider = lb4Provider("http://localhost:3000");
const App = () => (
 <Admin dataProvider={dataProvider}>
 <Resource name="clientes" list={ClienteList} />
 <Resource name="pagamentos" list={PagamentoList} />
 <Resource name="planos" list={PlanoList} />
 <Resource name="dominios" list={DominioList} />
 </Admin>
);
export default App;
