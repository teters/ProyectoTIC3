import React, { useState } from "react";
import InterfazLogin from "./interfaces/InterfazLogin";
import Inicio from "./Init";
import { BrowserRouter as Router, Route,Routes, BrowserRouter} from "react-router-dom";
import SignUp from "./interfaces/SignUp";
import Alert from "react-bootstrap/Alert";
import { Redirect } from "react-router-dom";
import Home from './screens/Home';
import MiPerfil from './screens/MiPerfil';
import SobreNosotros from './screens/SobreNosotros';
import Contacto from './screens/Contacto';
import Navbar from './Components/Navbar';
import * as ReactRouterDom from 'react-router-dom';


function App() {
  // Define estados locales para el correo electrónico y la contraseña
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inicio,setInicio]=useState(true);
  const [nombre,setNombre] = useState("");
  const [saldo, setSaldo] = useState("");

  // Manejar cambios en el campo de correo electrónico
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Manejar cambios en el campo de contraseña
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evitar el comportamiento predeterminado del formulario
    // Aquí puedes hacer lo que necesites con los valores de email y password, como enviarlos a un servidor o realizar validaciones.
    
    //window.location.href = "/inicio";
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await response.json();
    
    
    
    if (response.status === 200) {
      console.log("entor al response.status");
      const datosResponse = await fetch(`/login/datos?email=${email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const datos = await datosResponse.json();
      
      localStorage.setItem("nombreUs", datos.nombre);
      localStorage.setItem("saldoUs", datos.saldo);
      localStorage.setItem("emailUs", email);
      localStorage.setItem("fechaNac", datos.fecha_nac);
      
      //const datos = await datosResponse.json();
      //console.log(datos);
      console.log(datosResponse.body);
     // setNombre(datos.nombre);
    //  setSaldo(datos.saldo);
      window.location.href = "/inicio";
      // En data esta el mensaje
      // Procesa la respuesta del servidor si es exitosa
    } else {
      setInicio(false);
      // En data esta el error
      // Maneja errores si la respuesta no es exitosa

    }
  };
  
  


  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<InterfazLogin
                      email={email}
                      password={password}
                      onEmailChange={handleEmailChange}
                      onPasswordChange={handlePasswordChange}
                      onSubmit={handleSubmit}
                      inicio={inicio}
              />}/>
        <Route exact path="/signup" element={<SignUp
                      

              />}/>
        <Route exact path="/inicio" element={<Inicio
           
              />}/>

      </Routes>
    </BrowserRouter>
        
  );
  /*const [backendData, setbackEndData] = useState([{}])
    useEffect(()=>{
        fetch("/api").then(
            response => response.json()
        ).then(
            data =>{
                setbackEndData(data)
            }
        )
    },[])

    return(
        <div>
            {(typeof backendData.users === 'undefined') ?
                (<p> Loading...</p>):
                (backendData.users.map((user,i) => <p key = {i}>{user}</p>))}
        </div>
    )*/
}

export default App;

