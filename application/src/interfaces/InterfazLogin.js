import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import "./styles/styless.css";


function InterfazLogin({ email, password, onEmailChange, onPasswordChange, onSubmit,inicio }) {
  
  return (
    <div className= 'login-background d-flex justify-content-center align-items-center 100-w vh-100 '>
      <div className='login-box p-5 rounded bg-white'>
      <h1 className="text-left mb-4"> Ingresar </h1>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Correo electrónico</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingrese email"
              value={email}
              onChange={onEmailChange}
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
              value={password}
              onChange={onPasswordChange}
            />
          </Form.Group>

          <div className='mb-2'>
            <input type="checkbox" className='custom-control custom-checkbox' id="check"/>
              <label htmlFor="check" className='custom-input-label ms-2'>
                Recuerdame
              </label>
          </div>

          <Button variant="primary" className="btn btn-primary" type="submit">
            Entrar
            
          </Button>
          <Link to="/signup">
            <button type="button" className="btn btn-link" >Registrarse</button>
            
          </Link>
          <div>
          {!inicio && (
            <div className="alert alert-danger" role="alert">
            Datos invalidos!
            </div>
          )}
          </div>
        </Form>
        
        
      </div>
    </div>    
  );
}

/*return(
  <div className= 'login template d-flex justify-content-center align-items-center 100-w vh-100 bg-primary'>
    <div className='40-w p-5 rounded bg-white'>
      <form>
        <h3 className='text-center'>Login</h3>
        <div className='mb-2'>
          <label htmlFor="email">Email</label>
          <input type="email" placeholder="Enter Email" className='form-control'/>
        </div>
        <div className='mb-2'>
          <label htmlFor="password">Email</label>
          <input type="password" placeholder="Enter Password" className='form-control'/>
        </div>
        <div className='mb-2'>
          <input type="checkbox" className='custom-control custom-checkbox' id="check"/>
          <label htmlFor="check" className='custom-input-label ms-2'>
            Remember me
          </label>
        </div>
        <div className='d-grid'>
          <button type="button" class="btn btn-link">Login</button>
        </div>
        <div>
          <p className='text-right'>
            Forgot <a href="">Password?</a><Link to='signup' className='ms-2'>Sign up</Link>
          </p>
        </div>
      </form>
    </div>
  </div>

)*/
export default InterfazLogin;
