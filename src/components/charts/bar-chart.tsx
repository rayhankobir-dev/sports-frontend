import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
interface BarChartProps {
  title: string;
  color: string;
  data: [string, string | number][];
}

const BarChart: React.FC<BarChartProps> = ({ title, color, data }) => {
  const options: ApexOptions = {
    chart: {
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        colors: {
          ranges: [
            {
              from: 0,
              to: 1000,
              color: color,
            },
          ],
        },
      },
    },
    xaxis: {
      categories: data.map((item) => item[0]),
    },
    yaxis: {
      title: {
        text: title,
      },
    },
  };

  return (
    <Chart
      options={options}
      series={[
        {
          name: "Series 1",
          data: data.map((item) => ({ x: item[0], y: item[1] })),
        },
      ]}
      type="bar"
      width="100%"
      height="100%"
    />
  );
};

export default BarChart;
