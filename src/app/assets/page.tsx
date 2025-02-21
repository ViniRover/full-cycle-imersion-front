import { 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeadCell, 
  TableRow  
} from "flowbite-react";
import { AssetShow } from "../components/asset-show";
import Link from "next/link";
import { WalletList } from "../components/wallet-list";
import { getAssets, getMyWallet } from "../queries/queries";

interface AssetsListPageProps {
  searchParams: Promise<{ walletId: string }>
}

export default async function AssetsListPage({ searchParams }: AssetsListPageProps) {
  const { walletId } = await searchParams;
  const assets = await getAssets();

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
              <TableRow key={asset._id}>
                <TableCell>
                  <AssetShow asset={asset} />
                </TableCell>
                <TableCell>$ {asset.price}</TableCell>
                <TableCell>
                  <Button color="light" as={Link} href={`/assets/${asset.symbol}?walletId=${walletId}`}>Buy/Sell</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
