import styled from "styled-components";
import Logo from '../assets/images/Logo.png';
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import userContext from "../context/user-context";
import { postLogin } from "../service/api";
import Swal from "sweetalert2";
import { ThreeDots } from "react-loader-spinner";

export default function SignInPage() {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const [inputState, setInputState] = useState(false);
    const [loading, setLoading] = useState(true);
    const { setUserInfos } = useContext(userContext);

    const navigate = useNavigate();

    function handleForm(e) {
        setForm({
          ...form,
          [e.target.name]: e.target.value,
        });
    }

    function signInRequest(e) {
        e.preventDefault();
        setInputState(true);
        setLoading(true);

        postLogin(form)
        .then((res) => {
            localStorage.setItem(
                "shf_lifestyle",
                JSON.stringify({
                    id: res.data.id,
                    name: res.data.name,
                    token: res.data.token,
                })
            );
            setUserInfos(res.data);
            navigate("/home");
        })
        .catch((error) => {
            if(error.response.status === 401) {
                Swal.fire({
                    icon: "error",
                    title: "Ops...",
                    text: "Suas credenciais estão incorretas!"
                });
                console.log(error.response.status);
                setInputState(false);
                setLoading(true);
                setForm({
                    email: "",
                    password: "",
                });
            }else{
                Swal.fire({
                    icon: "error",
                    title: "Ops...",
                    text: `${error.message}`
                });
                console.log(error.message);
                setInputState(false);
                setLoading(true);
                setForm({
                    email: "",
                    password: "",
                });
            }
        });
    }
    
    return (
        <>
            <PageContainer>
                <ContentContainer>
                    <LogoBox>
                        <img src={Logo} alt="Logo" />
                    </LogoBox>
                    <InputBox onSubmit={signInRequest}>
                        <input
                        required 
                        placeholder="e-mail"
                        name="email"
                        type="email"
                        disabled={inputState}
                        value={form.email}
                        onChange={handleForm}
                        ></input>
                        <input
                        required 
                        placeholder="senha"
                        name="password"
                        type="password"
                        disabled={inputState}
                        value={form.password}
                        onChange={handleForm}
                        ></input>
                        {loading ? (
                            <button type="submit">Log In</button>
                        ) : (
                            <button disabled={inputState}>
                                <ThreeDots color="#FFFFFF" height={20} width={50} />
                            </button>
                        )}
                        <LinkBox to="/signUp">
                            Não possui login? Inscreva-se
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

