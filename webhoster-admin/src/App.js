import { Admin, Resource} from "react-admin";
import lb4Provider from "react-admin-lb4";
import { ClienteCreate, ClienteEdit, ClienteList } from "./ClienteList";
import { PagamentoCreate, PagamentoEdit, PagamentoList } from "./PagamentoList";
import { PlanoEdit, PlanoList, PlanoCreate } from "./PlanoList";
import { DominioCreate, DominioEdit, DominioList } from "./DominiosList";
import AttributionIcon from '@mui/icons-material/Attribution';
import CloudCircleIcon from '@mui/icons-material/CloudCircle';
import EuroIcon from '@mui/icons-material/Euro';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import Dashboard from "./dashboard/Dashboard";

const App = () => (
 <Admin dashboard={Dashboard} dataProvider={lb4Provider("http://localhost:3000")} >
 <Resource name="clientes" list={ClienteList} edit={ClienteEdit} create={ClienteCreate} icon={AttributionIcon}/>
 <Resource name="dominios" list={DominioList} edit={DominioEdit} create={DominioCreate} icon={CloudCircleIcon} />
 <Resource name="pagamentos" list={PagamentoList} edit={PagamentoEdit} create={PagamentoCreate} icon={EuroIcon}/>
 <Resource name="planos" list={PlanoList} edit={PlanoEdit} create={PlanoCreate} icon={ImportContactsIcon}/>
 </Admin>
);
export default App;
