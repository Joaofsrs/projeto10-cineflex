import { useState, useEffect } from "react"
import styled from "styled-components"
import axios from "axios"
import { Link, useParams, useNavigate } from "react-router-dom"
import Seat from "./components/Seat"

export default function SeatsPage() {
    const { idSessao } = useParams();
    const [cadeirasSessao, setCadeiras] = useState([]);
    const [cadeiraSelecionada, setSelecionada] = useState([]);
    const [numeroCadeiraSelecionada, setNumero] = useState([]);
    const [name, setNome] = useState("");
    const [cpf, setCPF] = useState("");
    const [post, setPost] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const requisicao = axios.get(
            `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`
        );

        requisicao.then((resposta) => {
            setCadeiras(resposta.data);
        });
    }, []);

    function finalizarCompra(evento) {
        evento.preventDefault()
        if(cadeiraSelecionada.length > 0 && cpf !== "" && name !== ""){
            const ids = cadeiraSelecionada;
            const dados = {ids, name, cpf};
            const requisicao = axios.post('https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many', dados);
            requisicao.then((resposta) => {
                navigate("/sucesso", {state:{ 
                    hour: cadeirasSessao.name,
                    date: cadeirasSessao.day.date,
                    title: cadeirasSessao.movie.title,
                    seats: numeroCadeiraSelecionada,
                    name: name,
                    cpf: cpf
                }})
            });
            requisicao.catch((resposta) => {
                alert("erro no envio")
            });
        }else{
            alert("Falta algum dado");
        }
    }

    if (cadeirasSessao === [] || cadeirasSessao.day === undefined) {
        return (
            <PageContainer>
                Carregando...
            </PageContainer>
        );
    } else {
        return (
            <PageContainer>
                Selecione o(s) assento(s)

                <SeatsContainer>
                    {cadeirasSessao.seats.map((cadeira) =>
                        <Seat key={cadeira.id} setNumero={setNumero} numeroCadeiraSelecionada={numeroCadeiraSelecionada} setSelecionada={setSelecionada} cadeiraSelecionada={cadeiraSelecionada} id={cadeira.id} name={cadeira.name} isAvailable={cadeira.isAvailable} />
                    )}
                </SeatsContainer>

                <CaptionContainer>
                    <CaptionItem>
                        <CaptionCircle cor="#1AAE9E" corBorda="#0E7D71" />
                        Selecionado
                    </CaptionItem>
                    <CaptionItem>
                        <CaptionCircle cor="#C3CFD9" corBorda="#7B8B99" />
                        Disponível
                    </CaptionItem>
                    <CaptionItem>
                        <CaptionCircle cor="#FBE192" corBorda="#F7C52B" />
                        Indisponível
                    </CaptionItem>
                </CaptionContainer>

                <FormContainer>
                    <form onSubmit={finalizarCompra} >
                        Nome do Comprador:
                        <input type="text" data-test="client-name" onChange={e => setNome(e.target.value)} value={name} required placeholder="Digite seu nome..." />

                        CPF do Comprador:
                        <input type="number" data-test="client-cpf" onChange={e => setCPF(e.target.value)} value={cpf} required placeholder="Digite seu CPF..." />

                        <button type="submit" data-test="book-seat-btn" >Reservar Assento(s)</button>
                    </form>
                </FormContainer>

                <FooterContainer data-test="footer" >
                    <div>
                        <img src={cadeirasSessao.movie.posterURL} alt="poster" />
                    </div>
                    <div>
                        <p>{`${cadeirasSessao.movie.title}`}</p>
                        <p>{`${cadeirasSessao.day.weekday} - ${cadeirasSessao.name}`}</p>
                    </div>
                </FooterContainer>

            </PageContainer>
        )
    }
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.div`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircle = styled.div`
    border: 1px solid ${(props) => props.corBorda};
    background-color: ${(props) => props.cor};
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`