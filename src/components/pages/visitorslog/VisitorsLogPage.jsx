import React from 'react'
import Header from "../../common/header/Header";
import RoutingSidebar from '../../common/sidebar/RoutingSidebar';
import useSetSidebar from '../../../hooks/useSetSidebar';
import Visitor from '../../common/visitor/Visitor';
import styles from "./VisitorsLogPage.module.css"

const VisitorsLogPage = () => {
  const {checkbool,toggleSidebar} = useSetSidebar();
  console.log("ここは来場者");
  return (
  <>
  <Header toggleSidebar={toggleSidebar}/>
  <div className={styles.flex}>
    <RoutingSidebar checkbool={checkbool}/>


    <Visitor className={styles.Visitor}/>

  </div>

</>
  )
}

export default VisitorsLogPage
