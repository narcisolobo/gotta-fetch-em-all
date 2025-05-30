// components/BaseStatsChart.jsx
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const statColors = {
  hp: '#ff5959',
  attack: '#f5ac78',
  defense: '#fae078',
  'special-attack': '#9db7f5',
  'special-defense': '#a7db8d',
  speed: '#fa92b2',
};

function BaseStatsChart({ stats }) {
  const data = stats.map((s) => ({
    name: s.stat.name,
    value: s.base_stat,
  }));

  return (
    <div style={{ width: '100%', height: 250 }}>
      <ResponsiveContainer>
        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 10, right: 20, left: 40, bottom: 10 }}>
          <XAxis type="number" domain={[0, 'dataMax + 20']} />
          <YAxis
            type="category"
            dataKey="name"
            tickFormatter={(name) =>
              name
                .replace('special-', 'Sp. ')
                .replace(/\b\w/g, (l) => l.toUpperCase())
            }
          />
          <Tooltip />
          <Bar dataKey="value">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={statColors[entry.name]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BaseStatsChart;
