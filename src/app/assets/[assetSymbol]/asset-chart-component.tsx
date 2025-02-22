"use client"

import { AssetShow } from "@/components/asset-show";
import { Chart, ChartComponentRef } from "@/components/chart";
import { Asset, AssetDaily } from "@/models";
import { socket } from "@/socket-io";
import { Time } from "lightweight-charts";
import { useEffect, useRef } from "react";

type ChartData = {
  time: Time;
  value: number;
}

interface AssetChartComponentProps {
  asset: Asset;
  data?: ChartData[]
}

export function AssetChartComponent({ asset, data }: AssetChartComponentProps) {
  const chartRef = useRef<ChartComponentRef>(null);
  const symbol = asset.symbol;

  useEffect(() => {
    socket.connect();

    socket.emit('joinAsset', { symbol });
    socket.on('assets/daily-created', (assetDaily: AssetDaily) => {
      chartRef.current?.update({
        time: (Date.parse(assetDaily.date) / 1000) as Time,
        value: assetDaily.price
      });
    });

    return () => {
      socket.emit('leaveAsset', { symbol });
      socket.off('assets/daily-created');
    }
  }, [symbol])

  return(
    <Chart
      header={<AssetShow asset={asset}/>}
      ref={chartRef}
      data={data}
    />
  );
}