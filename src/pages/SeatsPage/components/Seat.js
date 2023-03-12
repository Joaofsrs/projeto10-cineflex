import styled from "styled-components"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react";

export default function Seat(props) {
    const [cor, setCor] = useState("#C3CFD9");
    const [corBorda, setBorda] = useState("#7B8B99");

    useEffect(() => {
        if (props.isAvailable === false) {
            setCor("#FBE192");
            setBorda("#F7C52B");
        }
    }, []);

    function selecionaCadeira() {
        if (props.isAvailable) {
            setCor("#1AAE9E");
            setBorda("#0E7D71");
            const novaCadeira = [...props.cadeiraSelecionada, props.id];
            props.setSelecionada(novaCadeira);
            const novoNumero = [...props.numeroCadeiraSelecionada, props.name];
            props.setNumero(novoNumero);
        }
    }

    return (
        <>
            <SeatItem cor={cor} corBorda={corBorda} onClick={selecionaCadeira}>{props.name}</SeatItem>
        </>
    );
}

const SeatItem = styled.div`
    border: 1px solid ${(props) => props.corBorda};
    background-color: ${(props) => props.cor};
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`