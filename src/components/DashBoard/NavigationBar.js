import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function NavigationBar() {
    const navigate = useNavigate();
    
    return (
        <NavigationBarBox>
            <h1 onClick={() => navigate("/home")}>Home</h1>
            <h1>Exercícios Aeróbicos</h1>
            <h1>Alimentação</h1>
            <h1 onClick={() => navigate("/home/workout")}>Musculação</h1>
        </NavigationBarBox>
    )
}


const NavigationBarBox = styled.div`
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-around;
    font-family: 'Inter', sans-serif;
    align-items: center;
    border-bottom: solid 1px #dfcd81;
    margin-bottom: 20px;
    
    h1 {
        font-size: 15px;
        color: #dfcd81;
        cursor: pointer;
    }
`