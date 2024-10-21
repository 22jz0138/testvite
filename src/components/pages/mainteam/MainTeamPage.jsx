import React from 'react';
import Header from "../../common/header/Header";
import RoutingSidebar from '../../common/sidebar/RoutingSidebar';
import useSetSidebar from '../../../hooks/useSetSidebar';
import styles from "./MainTeamPage.module.css";
import useSetUrlPath from '../../../hooks/useSetUrlPath';


export default function MainTeamPage() {

// console.log("ここはチーム一覧");
const {checkbool,toggleSidebar} = useSetSidebar();
const mypath = useSetUrlPath();
return (
<>
<Header toggleSidebar={toggleSidebar} path={mypath}/>
      <div className={styles.flex}>
        <RoutingSidebar checkbool={checkbool}/>
      </div>
    </>
  )
}
