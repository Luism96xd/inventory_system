"use client";

import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import styles from '@/styles/Sidebar.module.css';
import { BiSolidDashboard, BiSolidUserPin, BiSolidDevices, BiSolidWrench, BiSolidReport } from "react-icons/bi";
import Link from 'next/link';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuVisible(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  function toggleMenuVisibility() {
    setIsMenuVisible(!isMenuVisible);
  }

  return (
    <>
      <aside className={`${styles['sidebar']} ${isOpen ? styles['active'] : ""}`} id="aside">
        <div className={`${styles["head"]}`}>
          <div className={`${styles["profile"]}`}>
            <Image src="/img/logo1.png" alt="Logo" width={64} height={64} />
            <p> ITS INVENTORY</p>
          </div>
          <button className='button-menu' onClick={() => setIsOpen(!isOpen)}>
            {(isOpen)
              ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            }
          </button>
        </div>
        <div className={styles["options"]}>
          <Link href="/">
            <BiSolidDashboard className={styles['icon']} />
            <span className={styles["option"]}>Dashboard</span>
          </Link>
          <div className='w-full' onClick={toggleMenuVisibility}>
            <Link href="/equipos">
              <BiSolidDevices className={styles['icon']} />
              <span className={styles["option"]}>Equipos</span>
            </Link>
            {isMenuVisible && (
              <div className="dropdown-menu">
                <Link href="/familias">
                  <span className={styles["option dropdown-item"]}>Familias</span>
                </Link>
                <Link href="/contratos">
                  <span className={styles["option dropdown-item"]}>Contratos</span>
                </Link>
                <Link href="/sedes">
                  <span className={styles["option dropdown-item"]}>Sedes</span>
                </Link>
                <Link href="/unidmedidas">
                  <span className={styles["option dropdown-item"]}>Unidades de Medida</span>
                </Link>
              </div>
            )}

          </div>
          <Link href="/trabajadores">
            <BiSolidUserPin className={styles['icon']} />
            <span className={styles["option"]}>Trabajadores</span>
          </Link>
          <Link href="/reportes">
            <BiSolidReport className={styles['icon']} />
            <span className={styles["option"]}>Reportes</span>
          </Link>
          <Link href={"/settings"}>
            <BiSolidWrench className={styles['icon']} />
            <span className={styles["option"]}>Configuración</span>
          </Link>
        </div>
      </aside>
    </>

  )
}

export default Sidebar;