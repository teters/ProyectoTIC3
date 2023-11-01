import React from 'react';
import styles from "./SobreNosotros.module.css";

const SobreNosotros = () => {
  return (
    <div name="SobreNosotros" className= {styles.home}> 
      <p className='h2'><u>Sobre Nosotros</u></p>
      <p>Somos una empresa dedicada al apasionante mundo de los juegos de apuestas en línea. 
        Nuestra misión es proporcionar a organizaciones de toda Latinoamérica una plataforma de juego segura, regulada y divertida 
        . Creemos firmemente en la emoción 
        y el entretenimiento que los juegos de apuestas en línea pueden aportar a las personas, y trabajamos 
        incansablemente para asegugarnos de cumplir con todas las regulaciones y requisitos 
        específicos de cada país en el que operamos. Nuestra visión es liderar la industria de juegos de apuestas en 
        línea en Latinoamérica, promoviendo un juego responsable y seguro en colaboración con las autoridades y 
        reguladores locales.
      </p>
      <p>Latinoamérica es un mercado dinámico y en crecimiento para la industria de los juegos de apuestas en línea. 
        Reconocemos la importancia de operar de manera ética y transparente en esta región. Trabajamos mano a mano con 
        nuestros clientes, ayudándoles a navegar por las regulaciones específicas de cada país y a establecer operaciones 
        sólidas y confiables. Sabemos que la confianza del público es fundamental en esta industria, y estamos comprometidos 
        en proporcionar tecnología de vanguardia y soluciones innovadoras para garantizar que los juegos sean seguros y justos.</p>
      <p>La innovación es parte de nuestro ADN. Estamos constantemente actualizando nuestra plataforma para ofrecer una 
        experiencia de usuario excepcional. Fomentamos prácticas de juego responsable, ofrecemos herramientas de autocontrol y trabajamos en 
        conjunto con organizaciones de apoyo y prevención de la ludopatía. Para nosotros, la integridad y la seguridad son valores 
        fundamentales. Estamos orgullosos de ser un socio confiable para las organizaciones que desean brindar emocionantes 
        experiencias de juego en línea en un entorno seguro y regulado en toda Latinoamérica.</p>
      <p className='h4'><u>Reglas de juego</u></p>
      <p className='h5'>Objetivo</p>
      <p>El objetivo del juego es evitar que el muñeco se estrelle contra el suelo.</p>
      <p className='h5'>Pasos</p>
      <p>1- Al principio de la jugada, el jugador tendra un tiempo para digitar el monto a apostar y presionar el botón de apostar.
      </p>
      <p>2- Luego de ese tiempo, comienza la jugada y el multiplicador comenzará a aumentar.</p>
      <p>3- Para completar el objetivo, el jugador debera presionar antes de que la persona caiga al suelo, si lo logra, el usuario recibirá el monto apostado multiplicado por el multiplicador en el que el usuario presionó el botón de retirar. Si la persona se estrella contra el suelo, el jugador perderá el dinero apostado y la partida.</p>
    </div>

  )
}

export default SobreNosotros