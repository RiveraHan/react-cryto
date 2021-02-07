import React from 'react';
import styled from '@emotion/styled';
import ProPTypes from 'prop-types';

const MensajeError = styled.p`
    background-color: #b7322c;
    padding: 1rem;
    color: #fff;
    font-size: 30px;
    text-transform: uppercase;
    font-weight: bold;
    text-align: center;
    font-family: 'Bebas Neue', cursive;
`;

const Error = ({mensaje}) => {
    return ( 
        <MensajeError>{mensaje}</MensajeError>
     );
}

Error.propTypes = {
    mensaje: ProPTypes.string.isRequired
}
 
export default Error;