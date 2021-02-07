import React from 'react';
import styled from '@emotion/styled';
import ProPTypes from 'prop-types';

const ResultadoDiv = styled.div`
    color: #fff;
    font-family: Arial, Helvetica, sans-serif;
    position: relative
`;

const Info = styled.p`
    font-size: 18px;

    span {
        font-weight: bold;
    }
`;

const Precio = styled.p`
    font-size: 30px;

    span {
        font-weight: bold;
    }
`;

const Cotizacion = ({resultado}) => {

    if(Object.keys(resultado).length === 0) return null;

    return ( 
        <ResultadoDiv>
            <Precio>El precio es: <span>{resultado.PRICE}</span></Precio>
            <Info>Precio más alto del día: <span>{resultado.HIGHDAY}</span></Info>
            <Info>Precio más bajo es: <span>{resultado.LOWDAY}</span></Info>
            <Info>Variación últimas 25 horas: <span>{resultado.CHANGE24HOUR}</span></Info>
            <Info>Ultima Actualización: <span>{resultado.LASTUPDATE}</span></Info>
        </ResultadoDiv>
     );
}

Cotizacion.propTypes = {
    resultado: ProPTypes.object.isRequired
}
 
export default Cotizacion;