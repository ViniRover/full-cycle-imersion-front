"use client";

import { AssetShow } from "@/components/asset-show";
import { WalletAsset } from "@/models";
import { useAssetStore } from "@/store";
import { Button, TableCell, TableRow } from "flowbite-react";
import Link from "next/link";
import { useShallow } from "zustand/react/shallow";

interface TableWalletAssetRowProps {
  walletAsset: WalletAsset;
  walletId: string;
}

export function TableWalletAssetRow({ walletAsset, walletId }: TableWalletAssetRowProps) {
  const assetFound = useAssetStore(
    useShallow((state) => state.assets.find(a => a.symbol === walletAsset.asset.symbol))
  );

  const asset = assetFound || walletAsset.asset

  return(
    <TableRow>
      <TableCell>
        <AssetShow asset={asset} />
      </TableCell>
      <TableCell>$ {asset.price}</TableCell>
      <TableCell>{walletAsset.shares}</TableCell>
      <TableCell>
        <Button color="light" as={Link} href={`/assets/${asset.symbol}?walletId=${walletId}`}>Buy/Sell</Button>
      </TableCell>
    </TableRow>
  );
}