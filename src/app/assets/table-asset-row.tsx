"use client";

import { AssetShow } from "@/components/asset-show";
import { Asset } from "@/models";
import { useAssetStore } from "@/store";
import { Button, TableCell, TableRow } from "flowbite-react";
import Link from "next/link";
import { useShallow } from "zustand/react/shallow";

interface TableAssetRowProps {
  asset: Asset;
  walletId: string;
}

export function TableAssetRow({ asset, walletId }: TableAssetRowProps) {
  const assetFound = useAssetStore(
    useShallow((state) => state.assets.find(a => a.symbol === asset.symbol))
  );

  const actualAsset = assetFound || asset

  return(
    <TableRow>
      <TableCell>
        <AssetShow asset={actualAsset} />
      </TableCell>
      <TableCell>$ {actualAsset.price}</TableCell>
      <TableCell>
        <Button color="light" as={Link} href={`/assets/${actualAsset.symbol}?walletId=${walletId}`}>Buy/Sell</Button>
      </TableCell>
    </TableRow>
  );
}
