import React from 'react';
import styles from './Header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IoMdLogIn } from "react-icons/io";

import { useState } from 'react';

export default function Header({ toggleSidebar, path  }) {
  return (
    <>
      <header className={styles.Header}>
        <div className={styles.logosArea}> 
          <FontAwesomeIcon icon="fa-solid fa-bars" size='lg' className={styles.ham}  onClick={toggleSidebar}/>
          <h1 className={styles.kadwabold}>JPages</h1>
        </div>
        {/* <h1>{path}</h1> */}
        <div className={styles.loginArea}>
          <IoMdLogIn size="3em"/>
        </div>
      </header>
    </>
  )
}
