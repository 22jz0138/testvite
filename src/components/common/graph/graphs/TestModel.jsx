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

//     // データが存在するか確認し、visitorを取得
//     const visitorData = props.data?.visitor || [];

//     // divisionごとのカウントを格納するオブジェクトを初期化
//     const divisionCounts = {};

//     // divisionごとにデータを分ける
//     visitorData.forEach(item => {
//       const itemTime = new Date(item.created_at);
//       intervals.forEach((interval, index) => {
//         if (itemTime >= interval.start && itemTime < interval.end) {
//           const division = item.division; // divisionを取得
//           if (!divisionCounts[division]) {
//             divisionCounts[division] = new Array(intervals.length).fill(0); // 初期化
//           }
//           divisionCounts[division][index]++; // カウントを増やす
//         }
//       });
//     });

//     // datasetsを作成
//     const datasets = Object.keys(divisionCounts).map(division => ({
//       label: `Division ${division}`, // ラベルを設定
//       data: divisionCounts[division],
//       backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`, // ランダムな色
//     }));

//     setChartData({
//       labels: labels,
//       datasets: datasets,
//     });
//   }, [props.data]);

//   return (
//     <div>
//       <Bar data={chartData} options={{
//         scales: {
//           y: {
//             stacked: true, // Y軸を積み上げに設定
//           },
//           x: {
//             stacked: true, // X軸を積み上げに設定
//           },
//         },
//       }} />
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
    const startHour = 10; // 開始時間
    const endHour = 17; // 終了時間
    const labels = [];

    // 10時から17時までの30分ごとのラベルを生成
    for (let hour = startHour; hour <= endHour; hour++) {
      labels.push(`${hour}時`);
      labels.push(`${hour}時30分`);
    }

    // データが存在するか確認し、visitorを取得
    const visitorData = props.data?.visitor || [];
    const divisionCounts = {};

    // divisionごとにデータを分ける
    visitorData.forEach(item => {
      const itemTime = new Date(item.created_at);
      labels.forEach((label, index) => {
        const [hour, minute] = label.split('時').map(Number);
        const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute || 0);
        const end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, (minute || 0) + 30);
        if (itemTime >= start && itemTime < end) {
          const division = item.division; // divisionを取得
          if (!divisionCounts[division]) {
            divisionCounts[division] = new Array(labels.length).fill(0); // 初期化
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
      labels: labels, // 生成したラベルをそのまま設定
      datasets: datasets,
    });
  }, [props.data]);

  return (
    <div style={{ width: '100%', height: '50%' }}> {/* 幅を100%に設定 */}
      <Bar 
        data={chartData} 
        options={{
          responsive: true,
          maintainAspectRatio: false, // アスペクト比を維持しない
          scales: {
            y: {
              stacked: true, // Y軸を積み上げに設定
            },
            x: {
              stacked: true, // X軸を積み上げに設定
            },
          },
        }} 
      />
    </div>
  );
};

export default TestModel;
