import React from 'react';
import Header from "../../common/header/Header";
import RoutingSidebar from '../../common/sidebar/RoutingSidebar';
import styles from "./Mainteam.module.css";
import useSetSidebar from '../../../hooks/useSetSidebar';

export default function Mainteam() {

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
