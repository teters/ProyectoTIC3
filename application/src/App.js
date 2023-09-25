import React, { useState } from "react";
import InterfazLogin from "./interfaces/InterfazLogin";
import { BrowserRouter as Router, Route,Routes, BrowserRouter} from "react-router-dom";
import SignUp from "./interfaces/SignUp";

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
  const handleSubmit = (e) => {
    e.preventDefault(); // Evitar el comportamiento predeterminado del formulario
    // Aquí puedes hacer lo que necesites con los valores de email y password, como enviarlos a un servidor o realizar validaciones.
  };
  


  return (
    //<BrowserRouter>
      <Router>
        <div className="App">
          <InterfazLogin
            email={email}
            password={password}
            onEmailChange={handleEmailChange}
            onPasswordChange={handlePasswordChange}
            onSubmit={handleSubmit}
          />
          <Routes>
            <Route path="/" exact component={InterfazLogin} />
            <Route path="/signup" component={SignUp} />
          </Routes>
        </div>
      </Router>
    //</BrowserRouter>
        
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

