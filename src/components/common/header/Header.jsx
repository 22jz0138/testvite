import React from 'react';
import styles from './Header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

export default function Header({ toggleSidebar, path  }) {
  return (
    <>
      <header className={styles.Header}>
        <FontAwesomeIcon icon="fa-solid fa-bars" size='lg' className={styles.ham}  onClick={toggleSidebar}/>
        <h1 className={styles.kadwabold}>JPages</h1>
        <h1>{path}</h1>
      </header>
    </>
    
    
  )
}
