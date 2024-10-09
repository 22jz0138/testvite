import React from 'react';
import styles from './Header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



export default function Header() {



  return (
    
    <>
      <header className={styles.Header}>
        <FontAwesomeIcon icon="fa-solid fa-bars" size='lg' className={styles.ham}  />
        <h1>JPages</h1>
      </header>
    </>
    
    
  )
}
