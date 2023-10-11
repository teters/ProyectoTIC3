
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
          <Form.Label>Nombre</Form.Label>
          <Form.Control
              type="name"
              placeholder="Ingrese nombre y apellido"
              value={usuario}
              onChange={handleNameChange}
            />
            
          </Form.Group>
        <Form.Group className="mb-3" controlId="formCedula">
        <Form.Label>ID</Form.Label>
        <Form.Control
            type="cedula"
            placeholder="Ingrese cedula"
            value={cedula}
            onChange={handleCedulaChange}
            />
          </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Correo electronico</Form.Label>
              <Form.Control
                  type="email"
                  placeholder="Ingrese correo electronico"
                  onChange={handleEmailChange}
                  value={email}
                />
                <Form.Text className="text-muted">
                  Nunca compartiremos su correo electrónico con nadie más.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Ingrese contraseña"
                  onChange={handlePasswordChange}
                  value={password}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formDob">
                <Form.Label>Fecha de nacimiento</Form.Label>
                <Form.Control
                  type="date"
                  value={fechaNacimiento}
                  onChange={handleDoBChange}
                />
              </Form.Group>
              <Form.Group controlId="formFile">
                <Form.Label>Ingrese foto de cedula</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*" // Solo permite archivos de imagen
                    
              />
              </Form.Group>
            
              <Button variant="primary" type="submit">
                Enviar
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