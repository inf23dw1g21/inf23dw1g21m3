import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { useGetList } from "react-admin";
import ReactApexChart from "react-apexcharts";
import MonthlyRevenue from "./components/card/MonthlyRevenue";
import MetodoDePagamento from "./components/card/MetodoDePagamento";
import { Link } from "react-router-dom";
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
  const [clientesComPagamentoAnual, setClientesComPagamentoAnual] = useState(0);
  const [clientesComPagamentoMensal, setClientesComPagamentoMensal] =
    useState(0);
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
        const clienteData = clientes.find(
          (c) => c.id === parseInt(clienteId, 10)
        );

        return {
          clienteNome: clienteData ? clienteData.nome : "Cliente Desconhecido",
          clienteEmail: clienteData
            ? clienteData.email
            : "email_desconhecido@example.com",
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
      if (!clientesLoading && !clientesError && clientes) {
        const clientesAnual = clientes.filter(
          (cliente) => cliente.periodicidade_de_pagamento === "Anual"
        );
        const clientesMensal = clientes.filter(
          (cliente) => cliente.periodicidade_de_pagamento === "Mensal"
        );

        setClientesComPagamentoAnual(
          Math.round((clientesAnual.length / clientes.length) * 100)
        );
        setClientesComPagamentoMensal(
          Math.round((clientesMensal.length / clientes.length) * 100)
        );
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
  const verticalBarChartOptions = {
    chart: {
      id: "vertical-bar",
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    dataLabels: {
      enabled: true,
    },
    xaxis: {
      categories: ["Anual", "Mensal"],
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return value.toFixed(0) + "%"; // Formatar para exibir percentagem sem casas decimais
        },
      },
    },
  };

  const verticalBarChartSeries = [
    {
      name: "Percentagem de Clientes",
      data: [clientesComPagamentoAnual, clientesComPagamentoMensal],
    },
  ];

  const codigosTLDDistintos = Array.from(
    new Set(dominiosList.map((d) => d.codigo_TLD))
  );

  // Conta a quantidade de domínios para cada código TLD
  const contagemCodigosTLD = codigosTLDDistintos.map((codigoTLD) => ({
    codigoTLD,
    quantidade: dominiosList.filter((d) => d.codigo_TLD === codigoTLD).length,
  }));

  // Calcula a percentagem de cada código TLD em relação ao total de domínios
  const percentagensCodigosTLD = contagemCodigosTLD.map((item) => ({
    codigoTLD: item.codigoTLD,
    percentagem: Math.round((item.quantidade / dominiosList.length) * 100),
  }));

  // Configuração do novo pie chart para os códigos TLD
  const pieChartCodigosTLDOptions = {
    chart: {
      id: "pie-chart-codigos-tld",
      type: "pie",
    },
    labels: percentagensCodigosTLD.map(
      (item) => `${item.codigoTLD} (${item.percentagem.toFixed(0)}%)`
    ),
    colors: ["#FF5733", "#4CAF50", "#2196F3", "#FFC107", "#9C27B0"], // Adapte as cores conforme necessário
  };

  const pieChartCodigosTLDData = [
    dominiosList.filter((dominio) => dominio.codigo_TLD === ".net").length,
    dominiosList.filter((dominio) => dominio.codigo_TLD === ".io").length,
    dominiosList.filter((dominio) => dominio.codigo_TLD === ".pt").length,
    dominiosList.filter((dominio) => dominio.codigo_TLD === ".com").length,
    dominiosList.filter((dominio) => dominio.codigo_TLD === ".org").length,
  ];
  // ... (restante do código)

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <Card className="monthly-revenue-card">
          <CardContent>
            <Typography variant="h6">
              <MonthlyRevenue
                value={
                  <Link to="http://localhost:3006/pagamentos?displayedFilters=%7B%7D&filter=%7B%22ano%22%3A%2210%22%7D&order=DESC&page=1&perPage=10&sort=timestamp">
                    {"Rendimento 2024: " +
                      totalPagamentosAno2024.toFixed(2) +
                      "€"}
                  </Link>
                }
              />
            </Typography>
          </CardContent>
        </Card>
        <Card className="monthly-revenue-card">
          <CardContent>
            <Typography variant="body1">
              <MetodoDePagamento
                value={ <Link to="http://localhost:3006/pagamentos?displayedFilters=%7B%7D&filter=%7B%22ano%22%3A%2210%22%7D&order=DESC&page=1&perPage=10&sort=valor">
                  {metodoPagamentoMaisUsado
                    ? `O método de Pagamento mais usado é o  ${metodoPagamentoMaisUsado}`
                    : "Carregando..."}
                </Link>
                }
              />
            </Typography>
          </CardContent>
        </Card>
        <Card className="pie-chart-card">
          <CardHeader title="Percentagem de Domínios por Código TLD" />
          <CardContent>
            <ReactApexChart
              options={pieChartCodigosTLDOptions}
              series={pieChartCodigosTLDData}
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
        <Card className="top-clients-card">
          <CardHeader title="Percentagem de Clientes por Periodicidade de Pagamento" />
          <CardContent>
            <ReactApexChart
              options={verticalBarChartOptions}
              series={verticalBarChartSeries}
              type="bar"
              height={350}
            />
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
      </div>
    </div>
  );
};

export default Dashboard;
