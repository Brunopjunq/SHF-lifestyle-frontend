import styled from "styled-components"
import FoodsBox from "./FoodsBox"

export default function MealsBox() {
    const mealsData = JSON.parse(localStorage.getItem("mealsData"));
    return (
        <>
            {mealsData.map((el, index) => (
                <Container key={index}>
                    <TitleBox>
                        <h2>{el.name}</h2>
                    </TitleBox>
                    {el.foods_meals.map((el,index) => (
                        <FoodsBox 
                        key={index} 
                        name={el.foods.name} 
                        quantity={el.quantity}
                        calories={el.foods.calories * (el.quantity/100)}
                        protein={el.foods.protein * (el.quantity/100)}
                        carbohydrate={el.foods.carbohydrate * (el.quantity/100)}
                        lipid={el.foods.lipid * (el.quantity/100)}
                        />
                    ))}
                </Container>
            ))}
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