import React, { useRef, useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const TransactionChart = ({ data }) => {
    const canvasRef = useRef(null);
    const [gradients, setGradients] = useState({
        gradientRevenue: '#F572A3',
        gradientExpenses: '#6EF9BF',
    });

    useEffect(() => {
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            if (ctx) {
                const gradientRevenue = ctx.createLinearGradient(0, 0, 0, 400);
                gradientRevenue.addColorStop(0, process.env.REACT_APP_GRADIENT_REVENUE_START || '#F572A3');
                gradientRevenue.addColorStop(1, process.env.REACT_APP_GRADIENT_REVENUE_END || '#D5A2E9');

                const gradientExpenses = ctx.createLinearGradient(0, 0, 0, 400);
                gradientExpenses.addColorStop(0, process.env.REACT_APP_GRADIENT_EXPENSES_START || '#6EF9BF');
                gradientExpenses.addColorStop(1, process.env.REACT_APP_GRADIENT_EXPENSES_END || '#62E4C3');

                setGradients({
                    gradientRevenue,
                    gradientExpenses,
                });
            }
        }
    }, [data]);

    if (!data) {
        return <p>Chargement du graphique...</p>;
    }

    const chartData = {
        labels: ['Revenus', 'Dépenses'],
        datasets: [
            {
                label: 'Transactions',
                data: [data.totalRevenue, data.totalExpenses],
                backgroundColor: [
                    gradients.gradientRevenue,
                    gradients.gradientExpenses,
                ],
                borderColor: [
                    process.env.REACT_APP_BORDER_COLOR_REVENUE || '#F572A3',
                    process.env.REACT_APP_BORDER_COLOR_EXPENSES || '#6EF9BF'
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `${tooltipItem.label}: ${tooltipItem.raw} €`;
                    },
                },
            },
        },
    };

    return (
        <div className="doughnut-chart-container" style={{ width: '400px', height: '400px' }}>
            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
            <Doughnut data={chartData} options={options} />
        </div>
    );
};

export default TransactionChart;






















