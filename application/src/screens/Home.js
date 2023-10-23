import React, { useEffect, useState } from 'react';
import styles from "./Home.module.css";
import { Link } from 'react-scroll';
import { FaArrowAltCircleUp } from "react-icons/fa";
import { FaArrowAltCircleDown } from "react-icons/fa";

var totalCycles = 50; // Número deseado de ciclos
var currentCycle = 50;
let multiplier = 1.0;
let money = 10; 
let outMultiplier = 0.0;
let aApostar = 0;
let apostado = 0; 

const Home = () => {
  const [time, setTime] = useState(-70);
  const [buttonText, setButtonText] = useState("Apostar"); // Inicialmente, el botón muestra "Bet"
  // esto  no va const [multiplier, setMultiplier] = useState(1.0);
  const [puedeApostar, setPuedeApostar] = useState(true);
  const [puedeRetirar, setPuedeRetirar] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      
      setTime(prevTime => prevTime + 1);
      
      if (time === 1 && currentCycle === totalCycles){
          if (! puedeApostar){
            setPuedeRetirar(true);
          } else {
            setPuedeApostar(false);
          }
          
          
        }

      // Cuando 'time' llega a 3, inicia un nuevo ciclo
      if (time === 3 && currentCycle > 0) {
        currentCycle -= 1 ;
        setTime(1); // Reiniciar 'time' para el nuevo ciclo
        //multiplier = multiplier + 0.1
        multiplier += 0.1;
        multiplier = parseFloat(multiplier.toFixed(1));
        // Aumenta el multiplier en incrementos de 0.1
        //setMultiplier(prevMultiplier => (prevMultiplier + 0.1).toFixed(1));
      
      }
      
      // Cuando se alcanza el número total de ciclos, muestra "gameOver.png"
      if ( currentCycle === 0) {
        clearInterval(interval); // Detener el intervalo
      }
      

    }, 100); // 1000 milisegundos = 1 segundo

    // Limpia el intervalo cuando el componente se desmonta
    return () => clearInterval(interval);
  }, [time, currentCycle]);

  const getImageSource = () => {
    if (currentCycle > 0){
      if (time <= 0) return require("../assets/gameStart.png");
      if (time === 1) return require("../assets/game1.png");
      if (time === 2) return require("../assets/game2.png");
      if (time === 3) return require("../assets/game3.png");
    } else {
      if (time === 200){
        window.location.reload();
      }
      return require("../assets/gameOver.png");
    }
  };

  const handleButtonClick = () => {
    if (puedeApostar && buttonText === "Apostar" && aApostar > 0) {
      apostado = aApostar;
      setButtonText("Retirar");
      setPuedeApostar(false);
      // Realiza acciones relacionadas con "Bet" aquí
    } else if (puedeRetirar && buttonText === "Retirar" ) {
      // Realiza acciones relacionadas con "Stop" aquí
      outMultiplier = multiplier;
      // Cambia el texto del botón de vuelta a "Bet" cuando sea apropiado
      setButtonText("Retirado en " +  {outMultiplier});
    }
  };
  

  return (
    <div className={styles.home}> 
      <p>
        No lo dejes <b>estrellarse</b>! {time}
      </p>
      <p> Dinero disponible : $ {money}</p>
      <p>
        Multiplicador : X {multiplier}
      </p>
        <img className={styles.pruebaImage} src={getImageSource()} alt={`Image ${time}`} />

        <p>
        Dinero : {aApostar} &nbsp; &nbsp; 
        {(puedeApostar && aApostar<money) ? (<FaArrowAltCircleUp color='#f1f1f1' size={25} onClick= {() => aApostar = aApostar + 1.0} />) : (<FaArrowAltCircleUp color='#f1f1f1' size={25} className={styles.buttonDisabled} onClick= {() => aApostar = aApostar + 1.0} />) }
        {(puedeApostar && aApostar > 0) ? (<FaArrowAltCircleDown color='#f1f1f1' size={25} onClick= {() => aApostar = aApostar - 1.0} />) : (<FaArrowAltCircleDown color='#f1f1f1' size={25} className={styles.buttonDisabled}  onClick= {() => aApostar = aApostar - 1.0} />)  }
        &nbsp; &nbsp; &nbsp; 
        {(puedeApostar && aApostar>money && aApostar > 0) ? <button className={styles.callToAction} onClick={handleButtonClick}>{buttonText}</button> : <button className={styles.callToAction} onClick={handleButtonClick}>{buttonText}</button>}
        </p>  
        
        
        

    </div>
  )
}

export default Home