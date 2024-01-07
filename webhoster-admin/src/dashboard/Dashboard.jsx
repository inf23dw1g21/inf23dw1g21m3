import { Card, CardHeader, CardContent, Grid } from '@mui/material';


// Importar as Listas (ClienteList, DominioList, PagamentoList, PlanoList) aqui

const Dashboard = () => {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Card>
                    <CardHeader title="Bem-vindo à administração do Webhoster" />
                    <CardContent>
                       Ta a funcionar
                    </CardContent>
                </Card>
            </Grid>
            {/* Adicione mais componentes conforme necessário */}
        </Grid>
    );
};
export default Dashboard;