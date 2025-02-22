"use client"

import { AssetShow } from "@/components/asset-show";
import { Chart, ChartComponentRef } from "@/components/chart";
import { Asset } from "@/models";
import { useRef } from "react";

interface AssetChartComponentProps {
  asset: Asset
}

export function AssetChartComponent({ asset }: AssetChartComponentProps) {
  const chartRef = useRef<ChartComponentRef>(null);

  return(
    <Chart
      header={<AssetShow asset={asset}/>}
      ref={chartRef}
    />
  );
}