import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import EuroIcon from '@mui/icons-material/Euro';
import { useGetList } from 'react-admin';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [page, setPage] = useState(1);

  // Obtém a lista de clientes
  const { data: clientes, isLoading: clientesLoading, error: clientesError } = useGetList('clientes', {
    pagination: { page: 1, perPage: 200 },
    sort: { field: 'nome', order: 'ASC' }, // Ajuste conforme necessário
  });

  // Obtém a lista de pagamentos
  const { data: pagamentosAno2024, isLoading: pagamentosLoading, error: pagamentosError } = useGetList('pagamentos', {
    pagination: { page, perPage: 200 },
    sort: { field: 'timestamp', order: 'DESC' },
  });

  const [totalPagamentosAno2024, setTotalPagamentosAno2024] = useState(0);
  const [clientesMaisPagantes, setClientesMaisPagantes] = useState([]);

  useEffect(() => {
    // Execute a lógica apenas se não houver erro e não estiver carregando
    if (!clientesLoading && !clientesError && !pagamentosLoading && !pagamentosError) {
      // Filtrar os pagamentos para o ano de 2024
      const pagamentosAno2024Filtrados = pagamentosAno2024.filter(
        pagamento => new Date(pagamento.timestamp).getFullYear() === 2024
      );

      // Calcular a soma dos valores dos pagamentos
      const total = pagamentosAno2024Filtrados.reduce((acc, pagamento) => acc + pagamento.valor, 0);
      setTotalPagamentosAno2024(total);

      // Agrupar pagamentos por cliente
      const pagamentosPorCliente = pagamentosAno2024Filtrados.reduce((acc, pagamento) => {
        acc[pagamento.cliente] = (acc[pagamento.cliente] || 0) + pagamento.valor;
        return acc;
      }, {});

      // Ordenar clientes por valor pago
      const clientesOrdenados = Object.keys(pagamentosPorCliente).sort((a, b) => pagamentosPorCliente[b] - pagamentosPorCliente[a]);

      // Selecionar os 10 primeiros clientes
      const top10Clientes = clientesOrdenados.slice(0, 10);

      // Mapear IDs dos clientes para nomes, emails e IDs
      const clientesMaisPagantesData = top10Clientes.map(clienteId => {
        const cliente = clientes.find(c => c.id === parseInt(clienteId, 10));
        return {
          clienteNome: cliente ? cliente.nome : 'Cliente Desconhecido',
          clienteEmail: cliente ? cliente.email : 'email_desconhecido@example.com',
          clienteId: cliente ? cliente.id : null,
          totalPago: pagamentosPorCliente[clienteId],
        };
      });

      setClientesMaisPagantes(clientesMaisPagantesData);
    }
  }, [clientes, clientesLoading, clientesError, pagamentosAno2024, pagamentosLoading, pagamentosError]);
 
  return (
    <div>
      <Card>
        <CardHeader title="Total de Rendimentos Ano 2024" />
        <CardContent>
          <Typography variant="h6">
            <EuroIcon /> {totalPagamentosAno2024.toFixed(2)}
          </Typography>
        </CardContent>
      </Card>

      <Card>
        <CardHeader title="Top 10 Clientes Mais Pagantes em 2024" />
        <CardContent>
          <ul>
            {clientesMaisPagantes.map(({ clienteNome, clienteEmail, totalPago, clienteId }, index) => (
              <li key={index}>
                <Link to={`/clientes/${clienteId}`}>{clienteNome} ({clienteEmail}): € {totalPago.toFixed(2)}</Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
