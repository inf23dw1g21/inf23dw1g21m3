import { Admin, Resource, EditGuesser} from "react-admin";
import lb4Provider from "react-admin-lb4";
import { ClienteCreate, ClienteEdit, ClienteList } from "./ClienteList";
import { PagamentoEdit, PagamentoList } from "./PagamentoList";
import { PlanoEdit, PlanoList } from "./PlanoList";
import { DominioEdit, DominioList } from "./DominiosList";
import AttributionIcon from '@mui/icons-material/Attribution';
import CloudCircleIcon from '@mui/icons-material/CloudCircle';
import EuroIcon from '@mui/icons-material/Euro';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import { Dashboard } from "./Dashboard";
const dataProvider = lb4Provider("http://localhost:3000");
const App = () => (
 <Admin dataProvider={dataProvider} dashboard={Dashboard}>
 <Resource name="clientes" list={ClienteList} edit={ClienteEdit} create={ClienteCreate} icon={AttributionIcon}/>
 <Resource name="pagamentos" list={PagamentoList} edit={PagamentoEdit} icon={EuroIcon}/>
 <Resource name="planos" list={PlanoList} edit={PlanoEdit} create={EditGuesser} icon={ImportContactsIcon}/>
 <Resource name="dominios" list={DominioList} edit={DominioEdit} icon={CloudCircleIcon} />
 </Admin>
);
export default App;
