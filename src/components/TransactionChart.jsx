import React, { useRef, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const TransactionChart = ({ data }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
       
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            if (ctx) {
                const gradientRevenue = ctx.createLinearGradient(0, 0, 0, 400);
                gradientRevenue.addColorStop(0, '#F572A3');
                gradientRevenue.addColorStop(1, '#D5A2E9');

                const gradientExpenses = ctx.createLinearGradient(0, 0, 0, 400);
                gradientExpenses.addColorStop(0, '#6EF9BF');
                gradientExpenses.addColorStop(1, '#62E4C3');

                setGradient({
                    gradientRevenue,
                    gradientExpenses,
                });
            }
        }
    }, [data]);

    const [gradients, setGradient] = React.useState({
        gradientRevenue: '#F572A3',
        gradientExpenses: '#6EF9BF',
    });

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
                    '#F572A3', 
                    '#6EF9BF'
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





















