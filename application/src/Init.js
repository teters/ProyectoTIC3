import React from "react";
import Home from './screens/Home';
import MiPerfil from './screens/MiPerfil';
import SobreNosotros from './screens/SobreNosotros';
import Contacto from './screens/Contacto';
import Navbar from './Components/Navbar';

function Inicio({email, nombre, saldo}) {

    return(
      <div className="App">
      <Navbar />
      <Home email={email} nombre={nombre} saldo={saldo}/>
      <MiPerfil />
      <SobreNosotros />
      <Contacto />
      
    </div>
    );
}
export default Inicio;