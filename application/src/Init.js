import React from "react";
import Home from './screens/Home';
import MiPerfil from './screens/MiPerfil';
import SobreNosotros from './screens/SobreNosotros';
import Contacto from './screens/Contacto';
import Navbar from './Components/Navbar';

function Inicio() {
  
    return(
      <div className="App">
      <Navbar />
      <Home />
      <MiPerfil />
      <SobreNosotros />
      <Contacto />
      
    </div>
    );
}
export default Inicio;