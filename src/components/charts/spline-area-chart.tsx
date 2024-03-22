import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface AreaChartProps {
  showY: boolean;
  data: SPDataItem[];
}
export interface SPDataItem {
  month: string;
  impressions: number;
}

export default function SpLineAreaChart({ showY, data }: AreaChartProps) {
  const options: ApexOptions = {
    chart: {
      type: "area",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: data.map((item: SPDataItem) => item.month),
      title: {
        text: "Month",
      },
    },
    yaxis: {
      show: showY,
      title: {
        text: "Impressions",
      },
    },
    grid: {
      show: false,
    },
  };

  return (
    <Chart
      options={options}
      series={[
        { name: "Impressions", data: data.map((item) => item.impressions) },
      ]}
      type="area"
      width="100%"
      height="100%"
    />
  );
}
