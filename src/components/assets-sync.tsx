"use client"

import { Asset } from "@/models";
import { socket } from "@/socket-io";
import { useAssetStore } from "@/store";
import { useEffect } from "react";

interface AssetSyncProps {
  symbols: string[];
}

export function AssetsSync({ symbols }: AssetSyncProps) {
  const changeAsset = useAssetStore((state) => state.changeAsset);

  useEffect(() => {
    socket.connect();

    socket.emit('joinAssets', { symbols: symbols });
    socket.on('assets/price-changed', (asset: Asset) => {
      changeAsset(asset);
    });

    return () => {
      socket.emit('leaveAssets', { symbols: symbols });
      socket.off('assets/price-changed');
    }
  }, [symbols, changeAsset]);

  return null;
}