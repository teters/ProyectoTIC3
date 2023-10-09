import React, { useEffect, useState } from 'react';
import { Link } from "react-scroll";
import styles from "./Navbar.module.css";
import { BsPersonCircle } from "react-icons/bs";
import { AiOutlineMenu } from "react-icons/ai";
import { useScrollPosition } from '../Hooks/scrollPosition';
import Home from '../screens/Home';

const Navbar = () => {
    const[navbarOpen, setNavbarOpen] = useState(false)
    const[widowDimension, setWindowDimension] = useState({
        width:window.innerWidth,
        height:window.innerHeight,
    });

    const detectDimension = () => 
        setWindowDimension({
            width: window.innerWidth,
            height: window.innerHeight,
    })

    useEffect(() =>{
        window.addEventListener('resize', detectDimension)
        widowDimension.width > 800 && setNavbarOpen(false)
        return () => {
          //removeEventListener('resize', detectDimension)
        }

    },[widowDimension])
    
    const links = [
        {
            id: 1,
            link: "Home",
        },
        {
            id: 2,
            link: "MiPerfil",
        },
        {
            id: 3,
            link: "SobreNosotros",
        },
        {
            id: 4,
            link: "Contacto",
        },
    ];

const scrollPosition = useScrollPosition();

  return (
    <div className= {
        navbarOpen 
        ? styles.navOpen
        : scrollPosition > 0
        ? styles.navOnScroll
        : styles.navbar
        } 
    >
        { !navbarOpen && <p className = {styles.logo}>RISKY HEIGHTS | CASINO</p> }
        {!navbarOpen /*&& widowDimension.width < 800*/ && (
            <AiOutlineMenu color='#f1f1f1' onClick= {() => setNavbarOpen(!navbarOpen)} size={25} />
        )
        }
        {navbarOpen && (
        <ul>
        {links.map(x => (
            <div>
                <Link
                onClick={() => setNavbarOpen(false)}
                to = {x.link}
                smooth
                duration={500}
                className={styles.navLink}
                > 
                {x.link === "Home" && "Inicio"}
                {x.link === "MiPerfil" && "Mi Perfil"}
                {x.link === "SobreNosotros" && "Sobre Nosotros"}
                {x.link === "Contacto" && "Contacto"}
                </Link>
            </div>
        ))}
      </ul>
      )}
    </div>
  );
};

export default Navbar