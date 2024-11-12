import React from 'react'
import {VictoryPie,VictoryTheme,VictoryContainer} from "victory";
import styles from "./Questionnaire.module.css";


export const Questionnaire = () => {
  return (
    <>
        {/* <div>
            <h1>総来場者</h1>
        </div> */}
        <div classname={styles.graph}>
            <h1>来場者区分</h1>
            <VictoryPie
                innerRadius={100}
                padAngle={5}
                width={400}
                height={400}
                viewBox={"s0 0 500 500 "}
                data={[
                    { x: "企業", y: 30 },
                    { x: "学校関係者", y: 35 },
                    { x: "学生", y: 25 },
                    { x: "その他", y: 10 },
                ]}
                style={{
                    
                    labels: {
                      fontSize: 20, // ラベル文字サイズの変更
                      fill: '#333', // ラベルの文字色
                    },
                }}
                theme={VictoryTheme.clean}
                containerComponent={
                <VictoryContainer
                    style={{
                        backgroundColor: "#f0f0f0", // 背景色
                        padding: "20px", // パディング
                        borderRadius: "10px", // 角を丸く
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // 影
                    }}
                />
                }
            />
        </div>
        <div>
            
        </div>
    </>
  )
}
