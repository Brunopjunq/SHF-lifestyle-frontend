import styled from "styled-components";
import {   Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend, } from "chart.js";
    import { Line } from "react-chartjs-2";

export default function WaterHistoric() {
    const waterData = JSON.parse(localStorage.getItem("WaterData"));
    let dates = [];
    let waterInfo = [];
    let waterGoal = [];

    if(waterData.length > 0) {
        waterData.map(item => {
            let date = item.date.slice(0,10).split('-').reverse().join('/');
            dates.push(date);
            waterGoal.push(10);
        });
        waterData.map(item => {
            let water = item.quantity;
            waterInfo.push(water);
        });
    }

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend 
    );

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Histórico de Consumo de água',
          },
        },
      };

    const labels = dates.slice(0,15).reverse();
    
    const data = {
        labels,
        datasets: [
          {
            label: 'Qtd de Copos',
            data: waterInfo.slice(0,15).reverse(),
            borderColor: '#dfcd81',
            backgroundColor: '#dfcd81',
          },
          {
            label: 'Meta de Consumo Diário',
            data: waterGoal,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };
    
    return (
        <Container>
            <h1>Acompanhe seu consumo de água</h1>
            <LineBox>
                <Line options={options} data={data} />
            </LineBox>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    min-height: 600px;
    padding-left: 30px;
    padding-right: 20px;

    h1 {
        color: #dfcd81;
    }

    a {
        color: white;
    }
`

const LineBox = styled.div`
    background-color: white;
    width:100%;
    height:100%;
`