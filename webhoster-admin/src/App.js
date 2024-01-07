import { Admin, Resource, EditGuesser} from "react-admin";
import lb4Provider from "react-admin-lb4";
import { ClienteCreate, ClienteEdit, ClienteList } from "./ClienteList";
import { PagamentoCreate, PagamentoEdit, PagamentoList } from "./PagamentoList";
import { PlanoEdit, PlanoList, PlanoCreate } from "./PlanoList";
import { DominioCreate, DominioEdit, DominioList } from "./DominiosList";
import AttributionIcon from '@mui/icons-material/Attribution';
import CloudCircleIcon from '@mui/icons-material/CloudCircle';
import EuroIcon from '@mui/icons-material/Euro';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import { Dashboard } from "./Dashboard";
const dataProvider = lb4Provider("http://localhost:3000");
const App = () => (
 <Admin dataProvider={dataProvider} dashboard={Dashboard}>
 <Resource name="clientes" list={ClienteList} edit={ClienteEdit} create={ClienteCreate} icon={AttributionIcon}/>
 <Resource name="pagamentos" list={PagamentoList} edit={PagamentoEdit} create={PagamentoCreate} icon={EuroIcon}/>
 <Resource name="planos" list={PlanoList} edit={PlanoEdit} create={PlanoCreate} icon={ImportContactsIcon}/>
 <Resource name="dominios" list={DominioList} edit={DominioEdit} create={DominioCreate} icon={CloudCircleIcon} />
 </Admin>
);
export default App;
