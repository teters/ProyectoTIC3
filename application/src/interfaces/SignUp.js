
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "./styles/styless.css";
import Modal from 'react-bootstrap/Modal';
import FormGroup from "react-bootstrap/esm/FormGroup";


function SignUp() {
  //const [nombre, setNombre] = useState("");
  const [usuario, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [cedula, setCedula] = useState("");
  const [fotoCedula, setFoto] = useState(null);
  const [mensajeRegistro, setMensajeRegistro] = useState(null); // Estado para el mensaje de registro

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [estado,setEstado] = useState(true);

  
 
  const cambiarEsatdo = () => {
    setEstado(false);
    setShow(false);
    
  }

  
  
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
    
    const formData = new FormData();
    formData.append("email", email);
    formData.append("usuario", usuario);
    formData.append("cedula", cedula);
    formData.append("fechaNacimiento", fechaNacimiento);
    formData.append("password", password);
    //formData.append("file", fotoCedula);
    formData.append("fotoCedula", fotoCedula);
    const response = await fetch("/signup", {
      method: "POST",
      body: formData
    });

  
    
    
    //console.log("Se imprime bien");
    //console.log("Registro correto", data.message);
    const data = await response.json(); 
    console.log(data.message);
    
    if(response.status === 200){
      setMensajeRegistro({ type: "success", message: data.message });
    } else {
      setMensajeRegistro({ type: "error", message: data.message });
    }

  };
 
  
  return (

      
    <div className='login-background d-flex justify-content-center align-items-center 50-w vh-100'>
    <div className='registrarse p-3 rounded bg-white'>
      

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Terminos y condiciones</Modal.Title>
          </Modal.Header>
          <Modal.Body>terminos</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={cambiarEsatdo}>
              Aceptar
            </Button>
          </Modal.Footer>
        </Modal>

      
      
        
    
      <Form onSubmit={registrarse} enctype="multipart/form-data">
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
                    name="fotoCedula"
                    onChange={handleFotoChange}
              />
             
              </Form.Group>
              
              <FormGroup className="mb-3" controlId="boton">
                
                <Button className="btn btn-link" onClick={handleShow}>
                  Terminos y condiciones
                </Button>
              </FormGroup>
              
              <Button variant="primary" type="submit" disabled={estado}>
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