import React, { useState } from "react";
import InterfazLogin from "./InterfazLogin";

function App() {
  // Define estados locales para el correo electrónico y la contraseña
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      // Procesa la respuesta del servidor si es exitosa
    } else {
      // Maneja errores si la respuesta no es exitosa
    }
  };

  return (
    <div className="App">
      <h1>Aplicación de Inicio de Sesión</h1>
      <InterfazLogin
        email={email}
        password={password}
        onEmailChange={handleEmailChange}
        onPasswordChange={handlePasswordChange}
        onSubmit={handleSubmit}
      />
    </div>
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

