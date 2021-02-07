import React, {useState, useEffect} from 'react';
import styled from '@emotion/styled';
import imagen from './cryptomonedas.png';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner';
import axios from 'axios';


const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;

  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #fff;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
  }
`;

function App() {

  const [moneda, setMoneda] = useState('');
  const [cryptomoneda, setCryptomoneda] = useState([]);
  const [resultado, setResultado] = useState({});
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    
    
    const cotizarCryptomoneda = async() => {
      
      // evitamos la ejecución la primera vez
      if(moneda === '') return;
      // consultar la api para obtener la cotización
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptomoneda}&tsyms=${moneda}`;
      
      // mostrar spinner
      setCargando(true);

      const resultado = await axios.get(url);
      
      
      setTimeout(() => {
        
       // mostrar spinner
        setCargando(false);

        // actualizar al state
        setResultado(resultado.data.DISPLAY[cryptomoneda][moneda] );

      }, 3000);
      
    } 
    cotizarCryptomoneda();

  }, [moneda, cryptomoneda])

  const componente = (cargando) ? <Spinner/> : <Cotizacion 
  resultado={resultado}
  />; 
  
  return (
    <Contenedor>
      <div>
        <Imagen
          src={imagen}
          alt="imagen cripto"
        />
      </div>
      <div>
        <Heading>Cotiza Cryptomonedas al Instante</Heading>

        <Formulario
          setMoneda={setMoneda}
          setCryptomoneda={setCryptomoneda}
        />
        {componente}
      </div>
    </Contenedor>
  );
}

export default App;
