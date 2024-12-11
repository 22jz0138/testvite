import React from "react";
import styles from "./graphs.module.css";
import { useState, useEffect } from "react";
import { VisitorPie } from "./graphs/VisitorPie";
import RealTimeChart from "./graphs/RealTimeChart ";
import { LegendList } from "./graphs/LegendList";
import { useAuth } from '../../../context/AuthContext';
import Ajax from "../../../hooks/Ajax";
import TestModel from "./graphs/TestModel";

export const Graphs = () => {
  const token = useAuth();
  const [visitorData, setVisitorData] = useState();

  const fetchVisitorData = () => {
    Ajax(null, token.token, 'visitor', 'get')
      .then((data) => {
        if (data.status === "success") {
          setVisitorData(data);
          
          console.log(data);
        } else {
          // fetchVisitorData();
          console.log("データ取得失敗");
        }
      });
  };

  useEffect(() => {
    fetchVisitorData();
  }, []);

  // // visitorDataが存在するか確認してからフィルタリング
  // const div1 = visitorData && visitorData.visitor ? visitorData.visitor.filter(visitor => visitor.division === 1).length : 0;
  // console.log(div1);;


  return (
    <>
      <div className={styles.dashboard}>

        <div className={styles.graph}>
          <VisitorPie data={visitorData} />
        </div>
        <div className={styles.graph}>
          <RealTimeChart data={visitorData}/>
          <TestModel data={visitorData}/>
          {/* 他のコンテンツ */}
        </div>
      </div>
    </>
  );
};
