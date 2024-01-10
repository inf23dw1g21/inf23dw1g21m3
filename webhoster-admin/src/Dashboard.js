import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { useGetList } from "react-admin";
import ReactApexChart from "react-apexcharts";
import MonthlyRevenue from "./components/card/MonthlyRevenue";
import MetodoDePagamento from "./components/card/MetodoDePagamento";
import "./App.css";
const Dashboard = () => {
  const [page] = useState(1);

  // Obtém a lista de clientes
  const {
    data: clientes,
    isLoading: clientesLoading,
    error: clientesError,
  } = useGetList("clientes", {
    pagination: { page: 1, perPage: 200 },
    sort: { field: "nome", order: "ASC" },
  });

  // Obtém a lista de dominios
  const {
    data: dominios,
    isLoading: dominiosLoading,
    error: dominiosError,
  } = useGetList("dominios", {
    pagination: { page: 1, perPage: 200 },
    sort: { field: "nome", order: "ASC" },
  });
  // Obtém a lista de pagamentos
  const {
    data: pagamentosAno2024,
    isLoading: pagamentosLoading,
    error: pagamentosError,
  } = useGetList("pagamentos", {
    pagination: { page, perPage: 200 },
    sort: { field: "timestamp", order: "DESC" },
  });

  const [totalPagamentosAno2024, setTotalPagamentosAno2024] = useState(0);
  const [clientesMaisPagantes, setClientesMaisPagantes] = useState([]);
  const [metodoPagamentoMaisUsado, setMetodoPagamentoMaisUsado] =
    useState(null);
  const [dominiosList, setDominiosList] = useState([]);
  useEffect(() => {
    if (
      !clientesLoading &&
      !clientesError &&
      !pagamentosLoading &&
      !pagamentosError
    ) {
      const pagamentosAno2024Filtrados = pagamentosAno2024.filter(
        (pagamento) => new Date(pagamento.timestamp).getFullYear() === 2024
      );

      const total = pagamentosAno2024Filtrados.reduce(
        (acc, pagamento) => acc + pagamento.valor,
        0
      );
      setTotalPagamentosAno2024(total);

      const pagamentosPorCliente = pagamentosAno2024Filtrados.reduce(
        (acc, pagamento) => {
          acc[pagamento.clienteId] =
            (acc[pagamento.clienteId] || 0) + pagamento.valor;
          return acc;
        },
        {}
      );

      const clientesOrdenados = Object.keys(pagamentosPorCliente).sort(
        (a, b) => pagamentosPorCliente[b] - pagamentosPorCliente[a]
      );

      const top10Clientes = clientesOrdenados.slice(0, 10);

      const clientesMaisPagantesData = top10Clientes.map((clienteId) => {
        const pagamentoTotal = pagamentosPorCliente[clienteId];
        const clienteData = clientes.find((c) => c.id === parseInt(clienteId, 10));
      
        return {
          clienteNome: clienteData ? clienteData.nome : "Cliente Desconhecido",
          clienteEmail: clienteData ? clienteData.email : "email_desconhecido@example.com",
          clienteId: clienteData ? clienteData.id : null,
          totalPago: pagamentoTotal,
        };
      });
      if (!pagamentosLoading && !pagamentosError && pagamentosAno2024) {
        // Contar a frequência de cada método de pagamento
        const metodosFrequencia = {};
        pagamentosAno2024.forEach((pagamento) => {
          const metodo = pagamento.metodo_de_pagamento;
          metodosFrequencia[metodo] = (metodosFrequencia[metodo] || 0) + 1;
        });

        // Encontrar o método mais usado
        const maisUsado = Object.keys(metodosFrequencia).reduce(
          (a, b) => (metodosFrequencia[a] > metodosFrequencia[b] ? a : b),
          null
        );

        setMetodoPagamentoMaisUsado(maisUsado);
        setDominiosList(dominios);
      }
      setClientesMaisPagantes(clientesMaisPagantesData);
    }
  }, [
    clientes,
    clientesLoading,
    clientesError,
    pagamentosAno2024,
    pagamentosLoading,
    pagamentosError,
    dominios,
    dominiosLoading,
    dominiosError,
  ]);

  // Configuração do gráfico de barras horizontais
  const chartOptions = {
    chart: {
      id: "horizontal-bar",
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: clientesMaisPagantes.map(
        (cliente) => `${cliente.clienteNome} (${cliente.clienteEmail})`
      ),
    },
  };
  const pieChartOptions = {
    chart: {
      id: "pie-chart",
      type: "pie",
    },
    labels: ["Ativos", "Inativos"],
    colors: ["#4CAF50", "#FF5733"], // Cor verde para ativos, cor laranja para inativos
  };
  const pieChartData = [
    dominiosList.filter((dominio) => dominio.estado).length,
    dominiosList.filter((dominio) => !dominio.estado).length,
  ];
  const chartSeries = [
    {
      name: "Total Pago",
      data: clientesMaisPagantes.map((cliente) => cliente.totalPago),
    },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <Card className="monthly-revenue-card">
          <CardContent>
            <Typography variant="h6">
              <MonthlyRevenue
                value={
                  "Rendimento 2024: " + totalPagamentosAno2024.toFixed(2) + "€"
                }
              />
            </Typography>
          </CardContent>
        </Card>
        <Card className="monthly-revenue-card">
          <CardContent>
            <Typography variant="body1">
              <MetodoDePagamento
                value={
                  metodoPagamentoMaisUsado
                    ? `O método de Pagamento mais usado é o  ${metodoPagamentoMaisUsado}`
                    : "Carregando..."
                }
              />
            </Typography>
          </CardContent>
        </Card>
        <Card className="pie-chart-card">
          <CardHeader title="Percentagem de Domínios Ativos e Inativos" />
          <CardContent>
            <ReactApexChart
              options={pieChartOptions}
              series={pieChartData}
              type="pie"
              height={350}
            />
          </CardContent>
        </Card>
        <Card className="top-clients-card">
          <CardHeader title=" Top 10 Clientes em 2024" />
          <CardContent>
            <ReactApexChart
              options={chartOptions}
              series={chartSeries}
              type="bar"
              height={350}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
