import { Link, useLocation } from "react-router-dom"
import styled from "styled-components"

export default function SuccessPage() {
    const location = useLocation();
    const name = location.state.name;
    const cpf = location.state.cpf;
    const title = location.state.title;
    const hour = location.state.hour;
    const date = location.state.date;
    const seats = location.state.seats;


    return (
        <PageContainer>
            <h1>Pedido feito <br /> com sucesso!</h1>

            <TextContainer data-test="movie-info">
                <strong><p>Filme e sessão</p></strong>
                <p>{title}</p>
                <p>{date} - {hour}</p>
            </TextContainer>

            <TextContainer data-test="seat-info">
                <strong><p>Ingressos</p></strong>
                {seats.map((seat) => <p>Assento {seat}</p>)}
            </TextContainer>

            <TextContainer data-test="client-info">
                <strong><p>Comprador</p></strong>
                <p>Nome: {name}</p>
                <p>CPF: {cpf}</p>
            </TextContainer>

            <Link to="/">
                <button data-test="go-home-btn">Voltar para Home</button>
            </Link>
        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    color: #293845;
    margin: 30px 20px;
    padding-bottom: 120px;
    padding-top: 70px;
    a {
        text-decoration: none;
    }
    button {
        margin-top: 50px;
    }
    h1 {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #247A6B;
    }
`
const TextContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 30px;
    strong {
        font-weight: bold;
        margin-bottom: 10px;
    }
`