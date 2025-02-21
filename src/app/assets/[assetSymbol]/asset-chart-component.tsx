"use client"

import { AssetShow } from "@/app/components/asset-show";
import { Chart, ChartComponentRef } from "@/app/components/chart";
import { Asset } from "@/app/models";
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