
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
          <Modal.Body>
          1. Introducción

Risky Heights Casino ofrece un servicio de juegos de apuestas en línea a través de su sitio web y aplicación móvil, donde los usuarios pueden participar en actividades de apuestas. Todas las transacciones financieras se gestionan a través de la plataforma de Mercado Pago.

2. Elegibilidad

Para ser elegible para utilizar los servicios de Risky Heights Casino, los usuarios deben tener la edad legal requerida en su país de residencia para participar en actividades de apuestas en línea.
Los usuarios son responsables de cumplir con las leyes y regulaciones locales relacionadas con el juego en línea.
3. Registro de Cuenta

Los usuarios deben proporcionar información precisa y veraz al crear una cuenta en Risky Heights Casino.
Es responsabilidad del usuario mantener la confidencialidad de sus credenciales de inicio de sesión.
Las cuentas son de uso personal y no transferibles.
4. Juego Responsable

Risky Heights Casino promueve un ambiente de juego responsable y ofrece herramientas como límites de depósito, autoexclusión y acceso a recursos para la prevención del juego compulsivo.
Nos reservamos el derecho de suspender o cerrar cuentas en caso de detectar un comportamiento problemático o compulsivo.
5. Depósitos y Retiros a través de Mercado Pago

Todas las transacciones financieras, incluyendo depósitos y retiros, se realizan a través de Mercado Pago y están sujetas a los términos y condiciones de dicha plataforma.
Los usuarios deben estar al tanto de las comisiones, límites y cualquier otra regulación aplicable de Mercado Pago para las transacciones.
6. Juegos y Apuestas

Risky Heights Casino ofrece una variedad de juegos de apuestas. Las reglas de cada juego están claramente establecidas en la plataforma.
Se aplican límites y reglas específicas para cada juego, y los usuarios deben respetarlas.
7. Bonos y Promociones

Las ofertas promocionales en Risky Heights Casino están sujetas a términos y requisitos específicos de apuesta.
La empresa se reserva el derecho de modificar o cancelar promociones en cualquier momento.
8. Responsabilidad y Exención de Responsabilidad

Risky Heights Casino no se hace responsable de pérdidas, daños o consecuencias derivadas del uso del servicio.
Se insta a los usuarios a familiarizarse con las leyes locales y asumir la responsabilidad de cumplir con las regulaciones aplicables.
9. Modificaciones y Actualizaciones

Estos términos y condiciones pueden actualizarse ocasionalmente. Se notificará a los usuarios sobre cambios significativos.
10. Jurisdicción y Resolución de Disputas

Cualquier disputa se regirá por las leyes del país en el que está registrada Risky Heights Casino. Se puede recurrir a la mediación o arbitraje para resolver conflictos.
11. Aceptación de Términos y Condiciones

El uso del servicio implica la aceptación de estos términos y condiciones.
          </Modal.Body>
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
                
                <button type="button" className="btn btn-link" onClick={handleShow}>
                  Terminos y condiciones
                </button>
              </FormGroup>
              
              <FormGroup className="mb-3" controlId="">
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

              </FormGroup>
              
            </Form>
            
            

        </div>
        </div>
        

      
   
  
  );
}

export default SignUp;