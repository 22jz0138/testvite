import React from 'react'
import Header from "../../common/header/Header";
import RoutingSidebar from '../../common/sidebar/RoutingSidebar';
import useSetSidebar from '../../../hooks/useSetSidebar';
import styles from './ReceptionPage.module.css'

const ReceptionPage = () => {
  const {checkbool,toggleSidebar} = useSetSidebar();
    console.log("ここは受付");
  return (
    <>
      <Header toggleSidebar={toggleSidebar}/>
      <div className={styles.flex}>
        <RoutingSidebar checkbool={checkbool}/>
      </div>
    </>
  )
}

export default ReceptionPage
