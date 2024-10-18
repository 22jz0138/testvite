import React from 'react'
import Header from "../../common/header/Header";
import RoutingSidebar from '../../common/sidebar/RoutingSidebar';
import useSetSidebar from '../../../hooks/useSetSidebar';
import styles from './QuestionnairePage.module.css'

const QuestionnairePage = () => {
  const {checkbool,toggleSidebar} = useSetSidebar();
    console.log("ここはアンケート");
  return (
    <>
      <Header toggleSidebar={toggleSidebar}/>
      <div className={styles.flex}>
        <RoutingSidebar checkbool={checkbool}/>
      </div>
    </>
  )
}

export default QuestionnairePage
