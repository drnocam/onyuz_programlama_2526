import { BarChart } from '@mui/x-charts/BarChart';
import { GaugeValueArc } from '@mui/x-charts/Gauge';
import { GaugeReferenceArc } from '@mui/x-charts/Gauge';
import { GaugeContainer } from '@mui/x-charts/Gauge';
import { RadarChart } from '@mui/x-charts/RadarChart';


function Birinci() {
  return (
    <div>
      <h1>Birinci Sayfa</h1>
      <RadarChart
  height={300}
  series={[{ label: 'Lisa', data: [120, 98, 86, 99, 85, 65] }]}
  radar={{
    max: 120,
    metrics: ['Math', 'Chinese', 'English', 'Geography', 'Physics', 'History'],
  }}
/>
      <GaugeContainer
  width={200}
  height={200}
  startAngle={-110}
  endAngle={110}
  value={30}
>
  <GaugeReferenceArc />
  <GaugeValueArc />     
</GaugeContainer>
     <BarChart
  xAxis={[
    {
      id: 'barCategories',
      data: ['bar A', 'bar B', 'bar C'],
      height: 28,
    },
  ]}
  series={[
    {
      data: [2, 5, 3],
    },
  ]}
  height={300}
/>


    </div>
  );
}

export default Birinci;