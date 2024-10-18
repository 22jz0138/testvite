import React from 'react';
import Header from "../../common/header/Header";
import RoutingSidebar from '../../common/sidebar/RoutingSidebar';
import useSetSidebar from '../../../hooks/useSetSidebar';
import styles from "./MainTeamPage.module.css";


export default function MainTeamPage() {

// console.log("ここはチーム一覧");
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
