import React from 'react';
import { VictoryPie, VictoryTheme, VictoryContainer } from 'victory';

export const VisitorPie = () => {
  const data = [
    { x: "30", y: 30, fill: '#555' },
    { x: "35", y: 35, fill: '#4caf50' },
    { x: "25", y: 25, fill: '#ff9800' },
    { x: "10", y: 10, fill: '#f44336' },
  ];


  return (
    <>
      <VictoryPie
        innerRadius={0}
        padAngle={0}
        width={400}
        height={400}
        viewBox={"0 0 500 500"}
        data={data}
        style={{
          data: {
            fill: ({ datum }) => datum.fill,
          },
          labels: {
            fontSize: 20,
            fill: '#333',
          },
        }}
        theme={VictoryTheme.clean}
        containerComponent={
          <VictoryContainer
            style={{
              backgroundColor: "#f0f0f0",
              borderRadius: "10px",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          />
        }
      />
    </>
  );
};
