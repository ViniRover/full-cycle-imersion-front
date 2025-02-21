import Image from "next/image";
import { Asset } from "../models";

interface AssetShowProps {
  asset: Asset
}

export function AssetShow({ asset }: AssetShowProps) {
  return(
    <div className="flex space-x-1">
      <div className="content-center">
        <Image
          src={asset.imageUrl} 
          alt={asset.symbol}
          width={30}
          height={30}
        />
      </div>
      <div className="flex flex-col text-sm">
        <span>{asset.name}</span>
        <span>{asset.symbol}</span>
      </div>
    </div>
  );
}