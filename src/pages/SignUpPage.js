import styled from "styled-components";
import Logo from '../assets/images/Logo.png';
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import userContext from "../context/user-context"
import { postSignUp } from "../service/api";
import Swal from "sweetalert2";
import { ThreeDots } from "react-loader-spinner";

export default function SignUpPage() {
    const { setUserInfos } = useContext(userContext);

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [password2, setPassword2] = useState('');
    const [loading, setLoading] = useState(true);
    const [inputState, setInputState] = useState(false);
    
    const navigate = useNavigate();

    function handleForm(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }
    
    function signUpRequest(e) {
        e.preventDefault();
        setInputState(true);
        setLoading(false);
        
        if(form.password !== password2) {
            setForm({
                name: "",
                email: "",
                password: "",
            });
            setPassword2("");
            setInputState(false)
            setLoading(true)
            Swal.fire({
                icon: "error",
                title: "Ops...",
                text: "As senhas devem ser iguais!"
            });
            return;
        }

        postSignUp(form)
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
            navigate("/");
        })
        .catch((error) => {
            Swal.fire({
                icon: "error",
                title: "Ops...",
                text: `${error.response}`
            });
            setForm({
                name: "",
                email: "",
                password: "",
            });
            setPassword2("");
            setInputState(false);
            setLoading(true);
        });
    }

    return (
        <>
            <PageContainer>
                <ContentContainer>
                    <LogoBox>
                        <img src={Logo} alt="Logo" />
                    </LogoBox>
                    <InputBox onSubmit={signUpRequest}>
                        <input
                        required 
                        placeholder="nome"
                        name="name"
                        type="text"
                        disabled={inputState}
                        value={form.name}
                        onChange={handleForm}
                        ></input>
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
                        <input
                        required 
                        placeholder="repita a senha"
                        name="password2"
                        type="password"
                        disabled={inputState}
                        value={password2}
                        onChange={e => setPassword2(e.target.value)}
                        ></input>
                        {loading ? (
                            <button>Sign Up</button>
                        ) : (
                            <button disabled={inputState}>
                                <ThreeDots color="#FFFFFF" height={20} width={50} />
                            </button>
                        )}
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

