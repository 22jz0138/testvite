import React from "react";
import styles from "./Questionnaire.module.css";
import { VisitorPie} from "./graphs/VisitorPie";
import { LegendList } from "./graphs/LegendList";

export const Questionnaire = () => {
  return (
    <>
        <div className={styles.graph}>
            <LegendList/>
            <VisitorPie/>
        </div>
        <div>
            
        </div>
    </>
  )
}
