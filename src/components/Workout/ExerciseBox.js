import styled from "styled-components";
import { CgGym } from "react-icons/cg";
import { BiEdit } from "react-icons/bi";

export default function ExerciseBox() {
    return (
        <Container>
            <GymIcon>
                <CgGym />
            </GymIcon>
            <ExerciseText>

            </ExerciseText>
            <EditIcon>
                <BiEdit />
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

const GymIcon = styled.div`
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
    justify-content: center;
    align-items: center;
`

const EditIcon = styled.div`
    width: 5%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
`