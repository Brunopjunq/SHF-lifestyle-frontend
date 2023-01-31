import styled from "styled-components";
import Logo from '../assets/images/Logo.png';
import { Link } from "react-router-dom";

export default function SignUpPage() {
    return (
        <>
            <PageContainer>
                <ContentContainer>
                    <LogoBox>
                        <img src={Logo} alt="Logo" />
                    </LogoBox>
                    <InputBox>
                        <input 
                        placeholder="nome"
                        name="nome"
                        ></input>
                        <input 
                        placeholder="e-mail"
                        name="email"
                        ></input>
                        <input 
                        placeholder="senha"
                        name="senha"
                        ></input>
                        <input 
                        placeholder="repita a senha"
                        name="repita a senha"
                        ></input>
                        <button>Log In</button>
                        <LinkBox to="/">
                            Já está inscrito? Faça login
                        </LinkBox>
                    </InputBox>
                </ContentContainer>
            </PageContainer>
        </>
    )
}

const PageContainer = styled.div`
    background-image: linear-gradient(#00004d, #000080);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

const ContentContainer = styled.div`
    min-height: 80vh;
    min-width: 70vw;
    //background-color: #1a2858;
    background-color: transparent;
    border-radius: 20px;
    box-sizing: border-box;
    padding: 20px;
    display: flex;
`

const LogoBox = styled.div`
    height: 80vh;
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
        border-radius: 100%;
    }
`

const InputBox = styled.form`
    width: 40%;
    background-color: #1a2858;
    margin-left: 50px;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    input {
        width: 70%;
        height: 45px;
        background: #ffffff;
        border-radius: 6px;
        margin-bottom: 5px;
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 40px;
        color: #9f9f9f;
        border: none;
        padding-left: 10px;
    }

    button {
        width: 70%;
        height: 45px;
        background: #1877f2;
        border-radius: 6px;
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 40px;
        color: #ffffff;
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`

const LinkBox = styled(Link)`
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    text-decoration-line: underline;
    color: #ffffff;
    margin-top: 5px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

