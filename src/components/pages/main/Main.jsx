import React from 'react';
import Header from "../../common/header/Header";
import RoutingSidebar from '../../common/sidebar/RoutingSidebar';
import styles from "./Main.module.css";

export default function Main() {
  return (
    <>
        <Header/>
        <div className={styles.flex}>
          <RoutingSidebar/>

        </div>

    </>
  )
}
