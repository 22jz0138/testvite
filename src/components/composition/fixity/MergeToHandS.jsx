import React from 'react';
import Header from "../../common/header/Header";
import RoutingSidebar from '../../common/sidebar/RoutingSidebar';
import styles from "./MergeToHandS.module.css";
import useSetSidebar from '../../../hooks/useSetSidebar';

export default function MergeToHandS() {

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