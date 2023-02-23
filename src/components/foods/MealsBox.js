import styled from "styled-components"
import FoodsBox from "./FoodsBox"

export default function MealsBox(name) {
    return (
        <>
            <Container>
                <TitleBox>
                    <h2>Café da Manha</h2>
                </TitleBox>
                <FoodsBox />
            </Container>
        </>
    )
}

const Container = styled.div`
    width: 95%;
    min-height: 100%;
    background-color: #e6e6e6;
    border-radius: 20px;
    margin-bottom: 30px;

    a {
        color: black;
    }
`

const TitleBox = styled.div`
    width:100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: solid 1px black;
    position: relative;
    
    h2 {
        color: black;
        font-size: 30px;
        font-weight: bold;
    }
`