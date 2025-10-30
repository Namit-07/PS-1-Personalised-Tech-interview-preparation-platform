'use client';

import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function ProgressChart({ type, data, options }) {
  if (type === 'pie') {
    return <Pie data={data} options={options} />;
  }
  
  if (type === 'bar') {
    return <Bar data={data} options={options} />;
  }
  
  return null;
}
