
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "./styles/styless.css";


function SignUp() {
  //const [nombre, setNombre] = useState("");
  const [usuario, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [cedula, setCedula] = useState("");
  const [foto, setFoto] = useState(null);
  const [mensajeRegistro, setMensajeRegistro] = useState(null); // Estado para el mensaje de registro
  
  // Manejar cambios en el campo de correo electrónico
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    setFoto(file);
  };
  
  
  // Manejar cambios en el campo de contraseña
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleNameChange = (e) => {
    setNombre(e.target.value);
  };
  const handleDoBChange = (e) => {
    setFechaNacimiento(e.target.value);
  };
  const handleCedulaChange = (e) => {
    setCedula(e.target.value);
  };
  
  const registrarse = async (e) => {
    e.preventDefault();
    

    const response = await fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email, usuario, cedula, fechaNacimiento, password}),
    });
    
   
    //console.log("Se imprime bien");
    //console.log("Registro correto", data.message);
    const data = await response.json(); 
    
    if(response.status === 200){
      setMensajeRegistro({ type: "success", message: data.message });
    } else {
      setMensajeRegistro({ type: "error", message: data.message });
    }

  };
 
  
  return (

      
    <div className='login-background d-flex justify-content-center align-items-center 50-w vh-100'>
    <div className='registrarse p-5 rounded bg-white'>
      
      
      
        
    
      <Form onSubmit={registrarse}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
              type="name"
              placeholder="Enter name and surname"
              value={usuario}
              onChange={handleNameChange}
            />
            
          </Form.Group>
        <Form.Group className="mb-3" controlId="formCedula">
        <Form.Label>ID</Form.Label>
        <Form.Control
            type="cedula"
            placeholder="Enter ID"
            value={cedula}
            onChange={handleCedulaChange}
            />
          </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={handleEmailChange}
                  value={email}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={handlePasswordChange}
                  value={password}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formDob">
                <Form.Label>Date of birth</Form.Label>
                <Form.Control
                  type="date"
                  value={fechaNacimiento}
                  onChange={handleDoBChange}
                />
              </Form.Group>
            
              <Button variant="primary" type="submit">
                Submit
              </Button>
              <Link to="/">
                <button type="button" class="btn btn-link" >Volver</button>
                
              </Link>
              {mensajeRegistro && (
                <div class="alert alert-warning" role="alert">
                {mensajeRegistro.message}
                </div>
              )}
            </Form>
        </div>
        </div>
        

      
   
  
  );
}

export default SignUp;