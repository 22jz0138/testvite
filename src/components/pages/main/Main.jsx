import React from 'react';
import Header from "../../common/header/Header";
import RoutingSidebar from '../../common/sidebar/RoutingSidebar';
import styles from "./Main.module.css";
import useSetSidebar from '../../../hooks/useSetSidebar';

export default function Main() {

  const {checkbool,toggleSidebar} = useSetSidebar();

  return (
    <>
        <Header toggleSidebar={toggleSidebar}/>
        <div className={styles.flex}>
          <RoutingSidebar checkbool={checkbool}/>

        </div>

    </>
  )
}
