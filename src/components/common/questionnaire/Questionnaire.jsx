import React from "react";
import styles from "./Questionnaire.module.css";
import { useState, useEffect } from "react";
import { VisitorPie } from "./graphs/VisitorPie";
import RealTimeChart from "./graphs/RealTimeChart ";
import { LegendList } from "./graphs/LegendList";
import { useAuth } from '../../../context/AuthContext';
import Ajax from "../../../hooks/Ajax";

export const Questionnaire = () => {
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
          <LegendList />
          <VisitorPie data={visitorData} />
          <RealTimeChart/>
        </div>
        <div>
          {/* 他のコンテンツ */}
        </div>
      </div>
    </>
  );
};
