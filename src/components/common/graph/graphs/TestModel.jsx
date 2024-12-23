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
        let start, end;
        if (label.endsWith('時')) {
          // 10時の場合
          const hour = parseInt(label);
          start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, 0); // 10時0分
          end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, 29); // 10時29分
        } else {
          // 10時30分の場合
          const hour = parseInt(label);
          start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, 30); // 10時30分
          end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, 59); // 10時59分
        }

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
    const datasets = [
      {
        label: '企業',
        data: divisionCounts[1] || new Array(labels.length).fill(0),
        backgroundColor: '#4d4d4d', // 企業の色
      },
      {
        label: '教員',
        data: divisionCounts[2] || new Array(labels.length).fill(0),
        backgroundColor: '#ff9800', // 教員の色
      },
      {
        label: 'JEC生徒',
        data: divisionCounts[3] || new Array(labels.length).fill(0),
        backgroundColor: '#4caf50', // JEC生徒の色
      },
      {
        label: 'OB・OG',
        data: divisionCounts[4] || new Array(labels.length).fill(0),
        backgroundColor: '#f44336', // OB・OGの色
      },
      {
        label: 'その他',
        data: divisionCounts[5] || new Array(labels.length).fill(0),
        backgroundColor: '#999999', // その他の色
      },
    ];

    setChartData({
      labels: labels, // 生成したラベルをそのまま設定
      datasets: datasets,
    });
  }, [props.data])

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
  )
}

export default TestModel;
