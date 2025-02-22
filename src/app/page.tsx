import { AssetsSync } from "@/components/assets-sync";
import { WalletList } from "@/components/wallet-list";
import { getMyWallet } from "@/queries/queries";
import { 
  Table, 
  TableBody, 
  TableHead, 
  TableHeadCell, 
} from "flowbite-react";
import { TableWalletAssetRow } from "./table-wallet-asset-row";

interface MyWalletPageProps {
  searchParams: Promise<{ walletId: string }>
}

export default async function MyWalletPage({ searchParams }: MyWalletPageProps) {
  const { walletId } = await searchParams;
  
  if(!walletId) {
    return <WalletList />
  }

  const wallet = await getMyWallet(walletId);

  if(!wallet) {
    return <WalletList />
  }

  return (
    <div className="flex flex-col space-y-5 flex-grow mt-5">
      <article className="format">
        <h1>My Wallet</h1>
      </article>
      <div className="overflow-x-auto w-full">
        <Table className="w-full max-w-full table-fixed">
          <TableHead>
            <TableHeadCell>Asset</TableHeadCell>
            <TableHeadCell>Price</TableHeadCell>
            <TableHeadCell>Quantity</TableHeadCell>
            <TableHeadCell>Buy/Sell</TableHeadCell>
          </TableHead>
          <TableBody>
            {wallet.assets.map(walletAsset => (
              <TableWalletAssetRow 
                key={walletAsset.asset._id}
                walletAsset={walletAsset}
                walletId={walletId}
              />
            ))}
          </TableBody>
        </Table>
      </div>
      <AssetsSync symbols={wallet.assets.map(walletAsset => walletAsset.asset.symbol)}/>
    </div>
  );
}
