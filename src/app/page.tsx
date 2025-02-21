import { 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeadCell, 
  TableRow  
} from "flowbite-react";
import { AssetShow } from "./components/asset-show";
import { WalletList } from "./components/wallet-list";
import Link from "next/link";
import { getMyWallet } from "./queries/queries";

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
              <TableRow key={walletAsset.asset._id}>
                <TableCell>
                  <AssetShow asset={walletAsset.asset} />
                </TableCell>
                <TableCell>$ {walletAsset.asset.price}</TableCell>
                <TableCell>{walletAsset.shares}</TableCell>
                <TableCell>
                  <Button color="light" as={Link} href={`/assets/${walletAsset.asset.symbol}?walletId=${walletId}`}>Buy/Sell</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
