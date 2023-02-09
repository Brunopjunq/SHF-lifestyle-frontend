import styled from "styled-components";
import Logo from "../assets/images/MiniLogo.png";
import { BsPersonFill } from "react-icons/bs";
import { ImExit } from "react-icons/im";
import { useNavigate } from "react-router-dom";


export default function Header() {
    const navigate = useNavigate();

    return (
            <HeaderContainer>
                <BsPersonFill onClick={() => navigate("/")} />
                <img src={Logo} alt="Logo" onClick={() => navigate("/home/summary")}/>
                <ImExit onClick={() => {
                    navigate("/");
                    localStorage.clear();
                }} />
            </HeaderContainer>
    )
}

const HeaderContainer = styled.header`
    background: linear-gradient(to left,#33406a,#303d68);
    height: 75px;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;

    img {
        height: 75px;
        cursor: pointer;
    }
`