import React, { useEffect, useState } from 'react';
import styles from "./Home.module.css";
import { Link } from 'react-scroll';

var totalCycles = 50; // Número deseado de ciclos
let multiplier = 1.0;
let money = 500; 
let outMultiplier = 0.0;

const Home = () => {
  const [time, setTime] = useState(-70);
  const [buttonText, setButtonText] = useState("Apostar"); // Inicialmente, el botón muestra "Bet"
  // esto  no va const [multiplier, setMultiplier] = useState(1.0);
  

  useEffect(() => {
    const interval = setInterval(() => {
      
      setTime(prevTime => prevTime + 1);

      // Cuando 'time' llega a 3, inicia un nuevo ciclo
      if (time === 3 && totalCycles > 0) {
        totalCycles -= 1 ;
        setTime(1); // Reiniciar 'time' para el nuevo ciclo
        //multiplier = multiplier + 0.1
        multiplier += 0.1;
        multiplier = parseFloat(multiplier.toFixed(1));
        // Aumenta el multiplier en incrementos de 0.1
        //setMultiplier(prevMultiplier => (prevMultiplier + 0.1).toFixed(1));
      
      }

      // Cuando se alcanza el número total de ciclos, muestra "gameOver.png"
      if ( totalCycles === 0) {
        clearInterval(interval); // Detener el intervalo
      }

    }, 100); // 1000 milisegundos = 1 segundo

    // Limpia el intervalo cuando el componente se desmonta
    return () => clearInterval(interval);
  }, [time, totalCycles]);

  const getImageSource = () => {
    if (totalCycles > 0){
      if (time <= 0) return require("../assets/gameStart.png");
      if (time === 1) return require("../assets/game1.png");
      if (time === 2) return require("../assets/game2.png");
      if (time === 3) return require("../assets/game3.png");
    } else {
      if (time === 100){
        window.location.reload();
      }
      return require("../assets/gameOver.png");
    }
  };

  const handleButtonClick = () => {
    if (buttonText === "Apostar") {
      setButtonText("Retirar");
      // Realiza acciones relacionadas con "Bet" aquí
    } else if (buttonText === "Retirar") {
      // Realiza acciones relacionadas con "Stop" aquí
      outMultiplier = multiplier;
      // Cambia el texto del botón de vuelta a "Bet" cuando sea apropiado
      setButtonText("Apostar");
    }
  };
  

  return (
    <div className={styles.home}> 
      <p>
        No lo dejes <b>estrellarse</b>! {time}
      </p>
      <p> Dinero disponible : $ {money}</p>
      <p>
        Multiplier : X {multiplier}
      </p>
        <img className={styles.pruebaImage} src={getImageSource()} alt={`Image ${time}`} />

        <button className={styles.callToAction} onClick={handleButtonClick}>
        {buttonText}
        </button>

    </div>
  )
}

export default Home