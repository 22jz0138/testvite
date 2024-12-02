import React from 'react'
import Header from '../../../common/header/Header';
import RoutingSidebar from '../../../common/sidebar/RoutingSidebar';
import useSetSidebar from '../../../../hooks/useSetSidebar';
import useSetUrlPath from '../../../../hooks/useSetUrlPath';
import useRequireAuth from '../../../../hooks/useRequireAuth';
import { useParams } from 'react-router-dom';
import styles from './DetailStudent.module.css';

export default function DetailStudent() {
    useRequireAuth();
    const { id } = useParams();
    const {checkbool,toggleSidebar} = useSetSidebar();
    const mypath = useSetUrlPath();
    console.log(id);
    Ajax(null, token.token, 'team', 'get')
    .then((data) => {
        
    });
    return (
    <>
    <Header toggleSidebar={toggleSidebar} path={mypath}/>
        <div className={styles.flex}>
            <RoutingSidebar checkbool={checkbool}/>
        </div>
    </>
    )
}
