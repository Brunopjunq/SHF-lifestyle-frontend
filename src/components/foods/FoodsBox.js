import styled from "styled-components";
import Trash from "../../assets/images/redTrash.png";
import { GiMeal } from "react-icons/gi";
import { BiEdit } from "react-icons/bi";

export default function FoodsBox() {
    return (
        <Container>
        <MealIcon>
            <GiMeal />
        </MealIcon>
        <ExerciseText>
            <NameText>Arroz Integral</NameText>
            <InfoText>
                <a>Quantidade: 100 g</a>
                <a>Calorias: 320 kcal</a>
            </InfoText>
            <NutriText>
                <a>Prot: 22g</a>
                <a>Carb: 20g</a>
                <a>Gord: 20g</a>
            </NutriText>
        </ExerciseText>
        <EditIcon>
            <BiEdit />
            <img src={Trash} />
        </EditIcon>
    </Container>
    )
}

const Container = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    border-bottom: solid 1px black;
    margin-bottom: 5px;
`

const MealIcon = styled.div`
    width: 5%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const ExerciseText = styled.div`
    width: 90%;
    height: 50px;
    display: flex;
    align-items: center;
`

const NameText = styled.div`
    height: 50px;
    width: 60%;
    display: flex;
    align-items: center;
    padding-left: 10px;
    border-right: solid 1px black;
    border-left: solid 1px black;
`

const InfoText = styled.div`
    height: 50px;
    width:25%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding-left: 10px;
    border-right: solid 1px black;
`

const NutriText = styled.div`
    height: 50px;
    width:12%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding-left: 10px;
    border-right: solid 1px black;
    font-size: 15px;
`

const EditIcon = styled.div`
    width: 10%;
    height: 50px;
    display: flex;
    justify-content: space-around;
    align-items: center;

    img {
        height: 30px;
        cursor: pointer;
    }
`