import React, { useEffect, useState } from 'react';
import styles from "./Home.module.css";
import { Link } from 'react-scroll';
import { FaArrowAltCircleUp } from "react-icons/fa";
import { FaArrowAltCircleDown } from "react-icons/fa";


let nombreNuevo = localStorage.getItem("nombreUs");
let saldo =  localStorage.getItem("saldoUs");
let email =  localStorage.getItem("emailUs");

let finalMultiplier;
let multiplier = 1.0;
let idPartida = '';
let outMultiplier;
let aApostar = 0;
let apostado = 0; 
var historialMatrix = [];


function Home()  {
  

  const [time, setTime] = useState(-200);
  const [buttonText, setButtonText] = useState("Apostar"); // Inicialmente, el botón muestra "Bet"
  // esto  no va const [multiplier, setMultiplier] = useState(1.0);
  const [puedeApostar, setPuedeApostar] = useState(true);
  const [puedeRetirar, setPuedeRetirar] = useState(false);
  const [saldoDisponible, setSaldoDisponible] = useState(0)
  const [multiplicadoresViejos, setMultplicadoresViejos] = useState(0);
  const [datosHistorial, setDatosHistorial] = useState([]);
  const historialArray = null;
  let requestArranque;


  const funcionBuscarMultiplicadores = async() => {
    const responseBuscarMultiplicadores =  await fetch("/inicio/multiplicadores", {
      method: "GET",
    });
    setMultplicadoresViejos(await responseBuscarMultiplicadores.json());
    //console.log("el multiplaer es", multiplicadoresViejos);
    //multi = responseBuscarMultiplicadores.json();
  }


  const funcionBuscarHitorial = async() => {
    const responseHistorial = await fetch(`/inicio/historial?email=${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    
    });
    setDatosHistorial(await responseHistorial.json());
    //const datosHistorial = await responseHistorial.json();
    console.log("lod datos del hist", datosHistorial);

    /*
    historialArray = Object.values(datosHistorial);

    for (let i = 0; i < 10; i++){
      historialMatrix[i][0] = datosHistorial[i].fecha;
      historialMatrix[i][1] = datosHistorial[i].hora;
      historialMatrix[i][2] = datosHistorial[i].dinero_apostado;
      historialMatrix[i][3] = datosHistorial[i].multiplicador_retiro;
      historialMatrix[i][0] = datosHistorial[i].dinero_retirado;
    }
    */
    
  }


  const funcionArranca = async() => {
    const responseArranca = await fetch("/inicio/arranca", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    //console.log("Slaio del post");
    requestArranque = await responseArranca.json(); // capaz hay que definir en otro lado la REqest Arranque
    //console.log(requestArranque);
    finalMultiplier = requestArranque.multiplier;
    // console.log("el saldo actual es", requestArranque.saldoActual);
    setSaldoDisponible(requestArranque.saldoActual);
    localStorage.setItem("saldoUs", requestArranque.saldoActual);
    // console.log("el multiplier es", multiplier);
    idPartida = requestArranque.id;
  }
  

  const funcionTermina = async() => {

    if (apostado != 0){

      //ACTUALIZO EL SALDO
      let ganancia = parseInt(apostado*outMultiplier - apostado); 
      let saldoDisponibleNuevo = saldoDisponible + ganancia; 

      const response = await fetch("/inicio/saldo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, ganancia }),
      });
      const datos = await response.json();
      
      if (datos.saldoNuevo != saldoDisponibleNuevo){
        console.log("algo salió mal");
      }
      console.log("el nuevo saldo es", datos.saldoNuevo);

      //localStorage.setItem("saldoUs", saldoDisponibleNuevo);

      //setSaldoDisponible(saldoDisponibleNuevo);

      //AHORA GUARDO LA INFO DE LA PARTIDA

      const dineroRetirado = apostado * outMultiplier;
      //console.log(idPartida);
      const responseJugada = fetch("/inicio/jugada", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, idPartida, apostado, outMultiplier, dineroRetirado }),
      });
      //const datosJugada = responseJugada.json();
      /*const primeraFilaJugda = datosJugada[0];
      constfechaJugadaPrimeraF = primeraFilaJugda.fecha;*/

    }
      
      
  }

 
  

  
  useEffect (() => {  

    const interval = setInterval(async () => {
      setTime(prevTime => prevTime + 1);

      if (time === -198) { 
        console.log("entro al -199");
        await funcionBuscarMultiplicadores();
        ///console.log(multiplicadoresViejos);
        await funcionBuscarHitorial();
        console.log(datosHistorial)
        await funcionArranca();
        /*
        const responseArranca = await fetch("/inicio/arranca", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });
        //console.log("Slaio del post");
        requestArranque = await responseArranca.json(); // capaz hay que definir en otro lado la REqest Arranque
        //console.log(requestArranque);
        finalMultiplier = requestArranque.multiplier;
        // console.log("el saldo actual es", requestArranque.saldoActual);
        setMoney2(requestArranque.saldoActual);
        localStorage.setItem("saldoUs", requestArranque.saldoActual);
        money = saldo;
        // console.log("el multiplier es", multiplier);
        idPartida = requestArranque.id;
        */
       /*
      const responseHistorial = await fetch(`/inicio/historial?email=${emailHistorial}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });
  
    const datosHistorial = await responseHistorial.json();
    console.log("lod datos del hist", datosHistorial); // Aca esta la infromación que necesitas pandita querido 
    */
        
      }
      

      if (time === 1 && multiplier === 1){
          if (!puedeApostar){
            setPuedeRetirar(true);
          } else {
            setPuedeApostar(false);
          }          
        }

      // Cuando 'time' llega a 3, inicia un nuevo ciclo, al menos que ya se haya llegado al finalMultiplier
      if (time === 3 && finalMultiplier > multiplier) {

        // Aumenta el multiplier en incrementos de 0.1
        multiplier += 0.1;
        multiplier = parseFloat(multiplier.toFixed(1));

        setTime(1); // Reiniciar 'time' para el nuevo ciclo
      
      }

      if (time === 4 && puedeRetirar ){
        outMultiplier = 0; // significa que perdió
        setPuedeRetirar(false);
        await funcionTermina();
      }

      if (time > 70){
        window.location.reload();
      }

      /*
      // Cuando se alcanza el número total de ciclos, muestra "gameOver.png"
      if ( currentCycle === 0) {
        clearInterval(interval); // Detener el intervalo
      }
      */
      

    }, 100); // 1000 milisegundos = 1 segundo

    
    // Limpia el intervalo cuando el componente se desmonta
    return () => clearInterval(interval);
     }, [time]);

  const getImageSource = () => {
    if (time <= 0) return require("../assets/gameStart.png");
    if (time === 1) return require("../assets/game1.png");
    if (time === 2) return require("../assets/game2.png");
    if (time === 3) return require("../assets/game3.png");
    if (3 < time) return require("../assets/gameOver.png");
    /*
    if (time >= 100){
        window.location.reload();
      }
      */
  };

  const handleButtonClick = async () => {

    if (puedeApostar && buttonText === "Apostar" && aApostar > 0 && aApostar <= saldoDisponible) {

      apostado = aApostar;

      setPuedeApostar(false);
      setPuedeRetirar(true);

      setButtonText("Retirar");

    } else if (puedeRetirar && buttonText === "Retirar" ) {
      
      outMultiplier = multiplier;
      setButtonText("Retirado en " +  outMultiplier);

      setPuedeRetirar(false);

      await funcionTermina();
    }

  };  

  
  
  const formatDateTime = (dateTimeString) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric'};
    return new Date(dateTimeString).toLocaleString(undefined, options);
  };


  // hay que ver que pasa si pierde, como me doy cuenta.


  return (
    
    <div name="Home" className={styles.home}> 
      
      <p> Hola {nombreNuevo} , tienes ${saldoDisponible} disponibles &nbsp; &nbsp; &nbsp; &nbsp;  ¡No lo dejes <b>estrellarse</b>!</p>
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
        {(puedeApostar && aApostar<saldoDisponible) ? (<FaArrowAltCircleUp color='#f1f1f1' size={25} onClick= {() => aApostar = aApostar + 1.0} />) : (<FaArrowAltCircleUp color='#f1f1f1' size={25} className={styles.buttonDisabled}/>) }
        {(puedeApostar && aApostar > 0) ? (<FaArrowAltCircleDown color='#f1f1f1' size={25} onClick= {() => aApostar = aApostar - 1.0} />) : (<FaArrowAltCircleDown color='#f1f1f1' size={25} className={styles.buttonDisabled} />)  }
        &nbsp; &nbsp; &nbsp; 
        <button className={styles.callToAction} onClick={handleButtonClick}>{buttonText}</button>
        </p>

        <div>
    <p className='h6'><u> Mi historial de apuestas</u></p>
    {(time > -190 && datosHistorial.length > 9) && (
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
            <th>{formatDateTime(datosHistorial[0].fecha)}</th>
            <td>{datosHistorial[0].hora}</td>
            <td>{datosHistorial[0].dinero_apostado}</td>
            <td>{datosHistorial[0].multiplicador_retiro}</td>
            <td>{datosHistorial[0].dinero_retirado}</td>
          </tr>
          <tr>
            <th>{formatDateTime(datosHistorial[1].fecha)}</th>
            <td>{datosHistorial[1].hora}</td>
            <td>{datosHistorial[1].dinero_apostado}</td>
            <td>{datosHistorial[1].multiplicador_retiro}</td>
            <td>{datosHistorial[1].dinero_retirado}</td>
          </tr>
          <tr>
            <th>{formatDateTime(datosHistorial[2].fecha)}</th>
            <td>{datosHistorial[2].hora}</td>
            <td>{datosHistorial[2].dinero_apostado}</td>
            <td>{datosHistorial[2].multiplicador_retiro}</td>
            <td>{datosHistorial[2].dinero_retirado}</td>
          </tr>
          <tr>
            <th>{formatDateTime(datosHistorial[3].fecha)}</th>
            <td>{datosHistorial[3].hora}</td>
            <td>{datosHistorial[3].dinero_apostado}</td>
            <td>{datosHistorial[3].multiplicador_retiro}</td>
            <td>{datosHistorial[3].dinero_retirado}</td>
          </tr>
          <tr>
            <th>{formatDateTime(datosHistorial[4].fecha)}</th>
            <td>{datosHistorial[4].hora}</td>
            <td>{datosHistorial[4].dinero_apostado}</td>
            <td>{datosHistorial[4].multiplicador_retiro}</td>
            <td>{datosHistorial[4].dinero_retirado}</td>
          </tr>
          <tr>
            <th>{formatDateTime(datosHistorial[5].fecha)}</th>
            <td>{datosHistorial[5].hora}</td>
            <td>{datosHistorial[5].dinero_apostado}</td>
            <td>{datosHistorial[5].multiplicador_retiro}</td>
            <td>{datosHistorial[5].dinero_retirado}</td>
          </tr>
          <tr>
            <th>{formatDateTime(datosHistorial[6].fecha)}</th>
            <td>{datosHistorial[6].hora}</td>
            <td>{datosHistorial[6].dinero_apostado}</td>
            <td>{datosHistorial[6].multiplicador_retiro}</td>
            <td>{datosHistorial[6].dinero_retirado}</td>
          </tr>
          <tr>
            <th>{formatDateTime(datosHistorial[7].fecha)}</th>
            <td>{datosHistorial[7].hora}</td>
            <td>{datosHistorial[7].dinero_apostado}</td>
            <td>{datosHistorial[7].multiplicador_retiro}</td>
            <td>{datosHistorial[7].dinero_retirado}</td>
          </tr>
          <tr>
            <th>{formatDateTime(datosHistorial[8].fecha)}</th>
            <td>{datosHistorial[8].hora}</td>
            <td>{datosHistorial[8].dinero_apostado}</td>
            <td>{datosHistorial[8].multiplicador_retiro}</td>
            <td>{datosHistorial[8].dinero_retirado}</td>
          </tr>
          <tr>
            <th>{formatDateTime(datosHistorial[9].fecha)}</th>
            <td>{datosHistorial[9].hora}</td>
            <td>{datosHistorial[9].dinero_apostado}</td>
            <td>{datosHistorial[9].multiplicador_retiro}</td>
            <td>{datosHistorial[9].dinero_retirado}</td>
          </tr>
        </tbody>
  </table>
    ) }
    </div>

        

    </div>
    
  )
}

export default Home;