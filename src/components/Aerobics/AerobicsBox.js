import styled from "styled-components";
import AerobicsCard from "./AerobicsCard";

export default function AerobicsBox() {

    
    return (
        <Container>
            <AerobicsCard name="Bruninho" />
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    min-height: 50px;
    display: flex;
    flex-wrap: wrap;
`