import { useNavigate } from "react-router-dom";
import styled from "styled-components"
import FoodsBox from "./FoodsBox"

export default function MealsBox({reload, setReload}) {
    const mealsData = JSON.parse(localStorage.getItem("mealsData"));
    const navigate = useNavigate();
    const sortMeals = mealsData.sort(compare);

    function compare( a, b ) {
        if ( a.id < b.id ){
          return -1;
        }
        if ( a.id > b.id ){
          return 1;
        }
        return 0;
      }

    function getTotalCalories(array) {
        let sum = 0;
        array.map((el) => {
            sum = sum + (el.foods.calories * (el.quantity/100))
        })
        return sum;
    }

    return (
        <>
            {sortMeals.map((el, index) => (
                <Container key={index}>
                    <TitleBox>
                        <h2>{el.name}</h2>
                        <a>{getTotalCalories(el.foods_meals)} kcal</a>
                    </TitleBox>
                    {el.foods_meals.map((el,index) => (
                        <FoodsBox
                        reload={reload}
                        setReload={setReload} 
                        key={index}
                        id={el.id} 
                        name={el.foods.name} 
                        quantity={el.quantity}
                        calories={el.foods.calories * (el.quantity/100)}
                        protein={el.foods.protein * (el.quantity/100)}
                        carbohydrate={el.foods.carbohydrate * (el.quantity/100)}
                        lipid={el.foods.lipid * (el.quantity/100)}
                        />
                    
                    ))}
                    <AddBox onClick={() => navigate(`/home/foods/${el.id}/add`)}>
                        <h2>Adicione um novo alimento</h2>
                    </AddBox>
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

    a {
        position: absolute;
        top: 18px;
        right: 20px;
        font-weight: bold;
        color: green;
    }
`

const AddBox = styled.div`
    width:100%;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    cursor: pointer;
    
    h2 {
        color: black;
        font-size: 20px;
        font-weight: bold;
    }

    :hover {

        h2 {
            color: green;
        }
    }
`