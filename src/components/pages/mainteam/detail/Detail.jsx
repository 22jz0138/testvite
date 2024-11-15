import React from "react";
import { useParams,useNavigate  } from "react-router-dom";
import sampleteam from '../../../../../smpleteam.json'
import { useEffect } from "react";
import styles from "./Detail.module.css"
import Header from "../../../common/header/Header";
import RoutingSidebar from "../../../common/sidebar/RoutingSidebar";
import useSetSidebar from '../../../../hooks/useSetSidebar';
import useSetUrlPath from '../../../../hooks/useSetUrlPath';
import TeamDetail from "../../../common/teamdetail/TeamDetail";
import useRequireAuth from '../../../../hooks/useRequireAuth';

const Detail = () => {
    useRequireAuth();
    const navigate = useNavigate();
    const { id } = useParams();
    const data = sampleteam;
    const arraylast = (data.slice(-1)[0]);
    const lastTeamId = arraylast.id;
    console.log(lastTeamId);
    
    useEffect(() => {
        // アイテムが存在しない場合、エラーページにリダイレクト
        if(id > lastTeamId){
            navigate("/NoTeam");
        }
    }, [id, navigate]);

    if (id > lastTeamId) {
        return null; // リダイレクトするため、コンテンツは表示しない
    }
  // IDに基づいてデータを取得するなどの処理を追加可能
    const {checkbool,toggleSidebar} = useSetSidebar();
    const mypath = useSetUrlPath();

    return (
  <>
    <Header toggleSidebar={toggleSidebar} path={mypath}/>
    <div className={styles.flex}>
      <RoutingSidebar checkbool={checkbool}/>
      <div className={styles.detailArea}>
        <TeamDetail/>
      </div>
    </div>
    </>
  )
};

export default Detail;
