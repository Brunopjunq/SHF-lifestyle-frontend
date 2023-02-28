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
import { useEffect, useState } from "react";
import { getWeights } from "../../service/api";

export default function WeightControl() {
    const [weights, setWeights] = useState("");
    let dates = [];
    let weightInfo = [];
    let weightGoal = [];
    const userData = JSON.parse(localStorage.getItem("shf_lifestyle"));
    const weight_goal = userData.weight_goal;

    useEffect(() => {
        getWeights()
        .then((res) => {
            setWeights(res.data)
        })
        .catch((error) => console.log(error))
    }, [])

    if(weights.length > 0) {
        weights.map(item => {
            let date = item.date.slice(0,10).split('-').reverse().join('/');
            dates.push(date);
            weightGoal.push(weight_goal);
        });
        weights.map(item => {
            let weight = item.weight;
            weightInfo.push(weight);
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
            text: 'Chart.js Line Chart',
          },
        },
      };

    const labels = dates.slice(0,15).reverse();
    
    const data = {
        labels,
        datasets: [
          {
            label: 'Pesos',
            data: weightInfo.slice(0,15).reverse(),
            borderColor: '#dfcd81',
            backgroundColor: '#dfcd81',
          },
          {
            label: 'Meta de Peso',
            data: weightGoal,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };

    
    return (
        <>
        <Container>
            <h1>Acompanhe seu Peso</h1>
            <LineBox>
                <Line options={options} data={data} />
            </LineBox>
        </Container>
        </>
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