import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function WorkoutBox(id) {
    const listateste = [
        {id: 1, name: 'Teste1'},
        {id: 2, name: 'Teste2'},
        {id: 3, name: 'Teste3'},
        {id: 4, name: 'Teste4'},
    ];
    
    return (
        // <Container onClick={navigate(`/home/workout/${id}`)}>
            // <h2>Treino de Perna</h2>
            // <a>Número de Exercícios: 8</a>
            // <a>Carga de Treino: 24 series/240reps</a>
        // </Container>

        <>
            {listateste.map((work) => (
                <Link to={`/home/workout/${work.id}`} style={linkStyle}>
                <Container>
                    <h2>Treino de {work.name}</h2>
                    <a>Número de Exercícios: {work.id}</a>
                    <a>Carga de Treino: 24 series/240reps</a>
                </Container>
                </Link>
            ))}
        </>
        
    )
}

const linkStyle = {
    margin: "1rem",
    textDecoration: "none",
    color: 'black'
  };

const Container = styled.div`
    width: 85%;
    height: 60px;
    background-color: white;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 10px;
    padding-right: 10px;
    margin-bottom: 15px;
    text-decoration: none;
    cursor: pointer;

    :hover {
        background-color: #bfbfbf
    }
`