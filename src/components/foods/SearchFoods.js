import { DebounceInput } from "react-debounce-input"
import styled from "styled-components"

export default function SearchFoods() {
    return (
        <Container>
            <h1>Acompanha sua Alimentação</h1>
            <SearchContainer>
                <h2>Busque por um alimento</h2>
                <DebounceInput 
                />
                <FoodBox />
                <FoodBox />
            
            </SearchContainer>
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
`

const SearchContainer = styled.div`
    background-color: #8ad3e2;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 20px;
    box-sizing: border-box;
    padding-bottom: 20px;

    input {
        width: 400px;
        height: 30px;
        font-size: 20px;
        margin-bottom: 15px;
    }

    h2 {
        font-size: 25px;
        font-weight: bold;
        margin-bottom: 10px;
    }
`

const FoodBox = styled.div`
    background-color: red;
    width: 100%;
    height: 50px;
    margin-bottom: 5px;
`