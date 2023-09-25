import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link} from "react-router-dom";
import "./styles/styless.css";

function InterfazLogin({ email, password, onEmailChange, onPasswordChange, onSubmit }) {
  return (
    <div className= 'login-background d-flex justify-content-center align-items-center 100-w vh-100 '>
      <div className='login-box p-5 rounded bg-white'>
      
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={onEmailChange}
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
              value={password}
              onChange={onPasswordChange}
            />
          </Form.Group>

          <div className='mb-2'>
            <input type="checkbox" className='custom-control custom-checkbox' id="check"/>
              <label htmlFor="check" className='custom-input-label ms-2'>
                Remember me
              </label>
          </div>

          <Button variant="primary" type="submit">
            Submit
          </Button>
          <Link to="/signup">
            <button type="button" class="btn btn-link">Sign Up</button>
          </Link>
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
