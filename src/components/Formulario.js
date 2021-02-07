import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled';
import Error from './Error';
import useMoneda from '../components/hooks/useMoneda';
import useCryptomoneda from '../components/hooks/useCrytomoneda';
import axios from 'axios';
import ProPTypes from 'prop-types';

const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #fff;
    transition: background-color .3s ease;

    &:hover {
        background-color: #326ac0;
        cursor: pointer;
    }
`;

const Formulario = ({setMoneda, setCryptomoneda}) => {

    const MONEDAS = [
        {codigo: 'USD', nombre: 'Dolar de Estados Unidos'},
        {codigo: 'MXN', nombre: 'Peso Mexicano'},
        {codigo: 'EUR', nombre: 'Euro'},
    ]
    
    const [listaCryptomoneda, setListaCryptomoneda] = useState([]);
    const [error, setError] = useState(false);

    // hook de moneda
    const [moneda, SelectMoneda, setModena] = useMoneda('Elige tu moneda', '', MONEDAS);

    // hook de cryptomoneda
    const[cryptomoneda, SelectCrypto, setCrypto] = useCryptomoneda('Elige tu cryptomoneda', '', listaCryptomoneda);


    // Api consulta
    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

            const resultado = await axios.get(url);
            setListaCryptomoneda(resultado.data.Data);
            
        }
        consultarAPI();

    }, []);
    
    // Enviar datos del formulario
    const cotizarMoneda = e => {
        e.preventDefault();
        
        // validar campos
        if(moneda === '' || cryptomoneda === '') {
            setError(true);
            return;
        }
        
        // pasar datos componente principal

        
        
        setError(false);
        setCryptomoneda(cryptomoneda);
        setMoneda(moneda);
    }
    
   /*  console.log('desde formulario', moneda);
    console.log(cryptomoneda); */
    return ( 
        <form
            onSubmit={cotizarMoneda}
        >
            {error ? <Error mensaje='Debe seleccionar los campos'/> : null}
            <SelectMoneda />
            <SelectCrypto />
            <Boton
                type="submit"
                value="Calcular"
            />
        </form>
     );
}

Formulario.propTypes = {
    setMoneda: ProPTypes.func.isRequired,
    setCryptomoneda: ProPTypes.func.isRequired
}
 
export default Formulario;