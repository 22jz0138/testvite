// import React, { useState, useEffect } from 'react';
// import { Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const TestModel = (props) => {
//   const [chartData, setChartData] = useState({ labels: [], datasets: [] });

//   useEffect(() => {
//     const now = new Date();
//     const intervals = [];
//     const labels = [];

//     // 60分前から1分前までを30分ごとに分割
//     for (let i = 60; i > 0; i -= 30) {
//       const start = new Date(now.getTime() - i * 60000);
//       const end = new Date(now.getTime() - (i - 30) * 60000);
//       intervals.push({ start, end });
//       labels.push(`${i}分前から${i - 30}分前`);
//     }

//     // データが存在するか確認し、訪問者数をカウント
//     const visitorData = props.data?.visitor || []; // props.data.visitorがfalsyの場合は空配列を使用
//     const counts = intervals.map(interval => {
//       return visitorData.filter(item => {
//         const itemTime = new Date(item.created_at);
//         return itemTime >= interval.start && itemTime < interval.end;
//       }).length;
//     });

//     setChartData({
//       labels: labels,
//       datasets: [
//         {
//           label: 'データ数',
//           data: counts,
//           backgroundColor: 'rgba(75, 192, 192, 0.6)',
//         },
//       ],
//     });
//   }, [props.data]);

//   return (
//     <div>
//       <h1>時間帯別データ数</h1>
//       <Bar data={chartData} />
//     </div>
//   );
// };

// export default TestModel;
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TestModel = (props) => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const now = new Date();
    const intervals = [];
    const labels = [];

    // 60分前から1分前までを30分ごとに分割
    for (let i = 60; i > 0; i -= 30) {
      const start = new Date(now.getTime() - i * 60000);
      const end = new Date(now.getTime() - (i - 30) * 60000);
      intervals.push({ start, end });
      labels.push(`${i}分前から${i - 30}分前`);
    }

    // データが存在するか確認し、visitorを取得
    const visitorData = props.data?.visitor || [];

    // divisionごとのカウントを格納するオブジェクトを初期化
    const divisionCounts = {};

    // divisionごとにデータを分ける
    visitorData.forEach(item => {
      const itemTime = new Date(item.created_at);
      intervals.forEach((interval, index) => {
        if (itemTime >= interval.start && itemTime < interval.end) {
          const division = item.division; // divisionを取得
          if (!divisionCounts[division]) {
            divisionCounts[division] = new Array(intervals.length).fill(0); // 初期化
          }
          divisionCounts[division][index]++; // カウントを増やす
        }
      });
    });

    // datasetsを作成
    const datasets = Object.keys(divisionCounts).map(division => ({
      label: `Division ${division}`, // ラベルを設定
      data: divisionCounts[division],
      backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`, // ランダムな色
    }));

    setChartData({
      labels: labels,
      datasets: datasets,
    });
  }, [props.data]);

  return (
    <div>
      <Bar data={chartData} options={{
        scales: {
          y: {
            stacked: true, // Y軸を積み上げに設定
          },
          x: {
            stacked: true, // X軸を積み上げに設定
          },
        },
      }} />
    </div>
  );
};

export default TestModel;
