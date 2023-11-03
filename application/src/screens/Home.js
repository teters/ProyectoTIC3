import React, { useEffect, useState } from 'react';
import styles from "./Home.module.css";
import { Link } from 'react-scroll';
import { FaArrowAltCircleUp } from "react-icons/fa";
import { FaArrowAltCircleDown } from "react-icons/fa";


let nombreNuevo = localStorage.getItem("nombreUs");
let saldo =  localStorage.getItem("saldoUs");
let email =  localStorage.getItem("emailUs");

var totalCycles = 50; // Número deseado de ciclos
var currentCycle = 50;
let multiplier;
let money = saldo; 
let idPartida = '';
let outMultiplier = 0.0;
let aApostar = 0;
let apostado = 0; 
let saldoTemp = 0;

function Home()  {
  

  const [time, setTime] = useState(-100);
  const [buttonText, setButtonText] = useState("Apostar"); // Inicialmente, el botón muestra "Bet"
  // esto  no va const [multiplier, setMultiplier] = useState(1.0);
  const [puedeApostar, setPuedeApostar] = useState(true);
  const [puedeRetirar, setPuedeRetirar] = useState(false);
  const [money2, setMoney2] = useState(0)
  const [multiplicadoresViejos, setMultplicadores] = useState(0);
  var multi = [];
  
  const funcionBuscar = async() => {
    const responseBuscarMultiplicadores =  await fetch("/inicio/multiplicadores", {
      method: "GET",
    });
    setMultplicadores(await responseBuscarMultiplicadores.json());
    //console.log("el multiplaer es", multiplicadoresViejos);
    //multi = responseBuscarMultiplicadores.json();
  }
  
  
  useEffect (() => {  
    const emailHistorial = email;
    //console.log("el eamil es", emailHistorial);
    // para acceder a los multipcladroes viejos ahy qeu poner multiplicadores[0]  
    const interval = setInterval(async () => {
    
      
    if(multiplicadoresViejos == null || time == -90){
      await funcionBuscar();
        //console.log(multiplicadoresViejos);
      }
      console.log("el multiplaier es", multiplicadoresViejos);
      //console.log(multiplicadoresViejos[0]);
      //console.log("el valor 1", await multiplicadoresViejos[0]);
      // Para que traer los multpilcadores hayq eu ahcerlo como arriba @FElipe

      // Voy a buscar el historial

      const responseHistorial = await fetch(`/inicio/historial?email=${emailHistorial}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });
  
    const datosHistorial = await responseHistorial.json();
    console.log("lod datos del hist", datosHistorial); // Aca esta la infromación que necesitas pandita querido 

      setTime(prevTime => prevTime + 1);

      
      //money = saldoTemp;
      if (time === -90) { 
        console.log("entro al -90");
        const responseArranca = await fetch("/inicio/arranca", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });
        //console.log("Slaio del post");
        let requestArranque = await responseArranca.json(); // capaz hay que definir en otro lado la REqest Arranque
        //console.log(requestArranque);
        multiplier = requestArranque.multiplier;
        // console.log("el saldo actual es", requestArranque.saldoActual);
        setMoney2(requestArranque.saldoActual);
        localStorage.setItem("saldoUs", requestArranque.saldoActual);
        money = saldo;
        // console.log("el multiplier es", multiplier);
        idPartida = requestArranque.id;
        
      }
      

      if (time === 1 && currentCycle === totalCycles){
          if (!puedeApostar){
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
      if (time >= 100){
        window.location.reload();
      }
      return require("../assets/gameOver.png");
    }
  };

  const handleButtonClick = async () => {
    if (puedeApostar && buttonText === "Apostar" && aApostar > 0) {
      apostado = aApostar;
      setButtonText("Retirar");
      setPuedeApostar(false);
      // Realiza acciones relacionadas con "Bet" aquí
      if(time === 3){
        // cambiar dinero pero restandole lo que perdio

      }
    } else if (puedeRetirar && buttonText === "Retirar" ) {
      // Realiza acciones relacionadas con "Stop" aquí
      outMultiplier = multiplier;
      
      // Cambia el texto del botón de vuelta a "Bet" cuando sea apropiado
      setButtonText("Retirado en " +  outMultiplier);

      let saldoNuevo = outMultiplier * apostado;
      let ganancia = saldoNuevo - apostado;
      // ojo que no es el money es lo que apsoto, donde esta eso?
      const response = await fetch("/inicio/saldo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, ganancia }),
      });
      const datos = await response.json();
      
      saldoTemp = datos.saldoNuevo;
      //console.log("el saldo nuevo",datos.saldoNuevo);
      //setMoney2(saldoTemp); 
      console.log("el saldo temp es",saldoTemp);
      localStorage.setItem("saldoUs", datos.saldoNuevo);
      
      console.log("el nuevo saldo es:", saldo);

      //money = saldo;// tengoq ue ver como actualizo los datos
    }
    const dineroRetirado = apostado * outMultiplier;
    console.log(idPartida);
    const responseJugada = await fetch("/inicio/jugada", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, idPartida, apostado, outMultiplier, dineroRetirado }),
    });
    const datosJugada = await responseJugada.json();
    /*const primeraFilaJugda = datosJugada[0];
    constfechaJugadaPrimeraF = primeraFilaJugda.fecha;*/
    
    
    
    money = saldo;

    // aca despues que jugo se deberia hacer un post a la Usuarios_jugada
  };  
  


  // hay que ver que pasa si pierde, como me doy cuenta.


  return (
    
    <div name="Home" className={styles.home}> 
      
      <p> Hola {nombreNuevo} , tienes ${money} disponibles </p>
      <p>
        No lo dejes <b>estrellarse</b>! {time}
      </p>
      <p>
        Multiplicador : X {multiplier}
      </p>
        <img className={styles.pruebaImage} src={getImageSource()} alt={`Image ${time}`} />
        <div className={styles.margins}>
          <table class = "table table-dark table-bordered">
            <thead>
              <th> Últimos multiplicadores: </th>
              <th>| {multiplicadoresViejos[0]} | </th>
              <th>{multiplicadoresViejos[1]} | </th>
              <th>{multiplicadoresViejos[2]} | </th>
              <th>{multiplicadoresViejos[3]} | </th>
              <th>{multiplicadoresViejos[4]} | </th>
              <th>{multiplicadoresViejos[5]} | </th>
              <th>{multiplicadoresViejos[6]} | </th>
              <th>{multiplicadoresViejos[7]} | </th>
              <th>{multiplicadoresViejos[8]} | </th>
              <th>{multiplicadoresViejos[9]} |</th>
            </thead>
          </table>
        </div>

        <p>
        Dinero : {aApostar} &nbsp; &nbsp; 
        {(puedeApostar && aApostar<money) ? (<FaArrowAltCircleUp color='#f1f1f1' size={25} onClick= {() => aApostar = aApostar + 1.0} />) : (<FaArrowAltCircleUp color='#f1f1f1' size={25} className={styles.buttonDisabled} onClick= {() => aApostar = aApostar + 1.0} />) }
        {(puedeApostar && aApostar > 0) ? (<FaArrowAltCircleDown color='#f1f1f1' size={25} onClick= {() => aApostar = aApostar - 1.0} />) : (<FaArrowAltCircleDown color='#f1f1f1' size={25} className={styles.buttonDisabled}  onClick= {() => aApostar = aApostar - 1.0} />)  }
        &nbsp; &nbsp; &nbsp; 
        {(puedeApostar && aApostar>money && aApostar > 0) ? <button className={styles.callToAction} onClick={handleButtonClick}>{buttonText}</button> : <button className={styles.callToAction} onClick={handleButtonClick}>{buttonText}</button>}
        </p>

        <div>
    <p className='h6'><u>Historial de apuestas</u></p>
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Fecha</th>
            <th scope="col">Hora</th>
            <th scope="col">Dinero apostado</th>
            <th scope="col">Multiplicador de retiro</th>
            <th scope="col">Dinero retirado</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>fecha1</th>
            <td>hora1</td>
            <td>din1</td>
            <td>mult1</td>
            <td>dinret1</td>
          </tr>
          <tr>
            <th>fecha1</th>
            <td>hora1</td>
            <td>din1</td>
            <td>mult1</td>
            <td>dinret1</td>
          </tr>
          <tr>
            <th>fecha1</th>
            <td>hora1</td>
            <td>din1</td>
            <td>mult1</td>
            <td>dinret1</td>
          </tr>
        </tbody>
  </table>
    </div>

        

    </div>
    
  )
}

export default Home;