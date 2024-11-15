import React from 'react'
import Header from "../../common/header/Header";
import RoutingSidebar from '../../common/sidebar/RoutingSidebar';
import useSetSidebar from '../../../hooks/useSetSidebar';
import styles from './QuestionnairePage.module.css'
import useSetUrlPath from '../../../hooks/useSetUrlPath';
import { Questionnaire } from '../../common/questionnaire/Questionnaire';
import useRequireAuth from '../../../hooks/useRequireAuth';

const QuestionnairePage = () => {
  useRequireAuth();
  const {checkbool,toggleSidebar} = useSetSidebar();
  const mypath = useSetUrlPath();
  return (
  <>
  <Header toggleSidebar={toggleSidebar} path={mypath}/>
      <div className={styles.flex}>
        <RoutingSidebar checkbool={checkbool}/>
        <Questionnaire/>
      </div>
    </>
  )
}

export default QuestionnairePage
