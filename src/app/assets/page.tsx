import { AssetsSync } from "@/components/assets-sync";
import { WalletList } from "@/components/wallet-list";
import { getAssets, getMyWallet } from "@/queries/queries";
import { 
  Table, 
  TableBody, 
  TableHead, 
  TableHeadCell, 
} from "flowbite-react";
import { TableAssetRow } from "./table-asset-row";

interface AssetsListPageProps {
  searchParams: Promise<{ walletId: string }>
}

export default async function AssetsListPage({ searchParams }: AssetsListPageProps) {
  const { walletId } = await searchParams;
  
  if(!walletId) {
    return <WalletList />
  }
  
  const wallet = await getMyWallet(walletId);
  
  if(!wallet) {
    return <WalletList />
  }
  
  const assets = await getAssets();

  return (
    <div className="flex flex-col space-y-5 flex-grow mt-5">
      <article className="format">
        <h1>Assets</h1>
      </article>
      <div className="overflow-x-auto w-full">
        <Table className="w-full max-w-full table-fixed">
          <TableHead>
            <TableHeadCell>Asset</TableHeadCell>
            <TableHeadCell>Price</TableHeadCell>
            <TableHeadCell>Buy/Sell</TableHeadCell>
          </TableHead>
          <TableBody>
            {assets.map(asset => (
              <TableAssetRow 
                key={asset._id}
                asset={asset}
                walletId={walletId}
              />
            ))}
          </TableBody>
        </Table>
      </div>
      <AssetsSync symbols={assets.map(asset => asset.symbol)}/>
    </div>
  );
}
