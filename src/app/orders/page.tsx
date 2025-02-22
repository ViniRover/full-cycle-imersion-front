import { AssetShow } from "@/components/asset-show";
import { OrderStatusBadge } from "@/components/order-status-badge";
import { OrderTypeBadge } from "@/components/order-type-badge";
import { WalletList } from "@/components/wallet-list";
import { getMyWallet, getWalletOrders } from "@/queries/queries";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeadCell, 
  TableRow  
} from "flowbite-react";

interface OrdersListPageProps {
  searchParams: Promise<{ walletId: string }>
}

export default async function OrdersListPage({ searchParams }: OrdersListPageProps) {
  const { walletId } = await searchParams;
  const orders = await getWalletOrders(walletId);
 
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
        <h1>Orders</h1>
      </article>
      <div className="overflow-x-auto w-full">
        <Table className="w-full max-w-full table-fixed">
          <TableHead>
            <TableHeadCell>Asset</TableHeadCell>
            <TableHeadCell>Price</TableHeadCell>
            <TableHeadCell>Quantity</TableHeadCell>
            <TableHeadCell>Type</TableHeadCell>
            <TableHeadCell>Status</TableHeadCell>
          </TableHead>
          <TableBody>
            {orders.map(order => (
              <TableRow key={order._id}>
                <TableCell>
                  <AssetShow asset={order.asset} />
                </TableCell>
                <TableCell>$ {order.price}</TableCell>
                <TableCell>{order.shares}</TableCell>
                <TableCell>
                  <OrderTypeBadge type={order.type}/>
                </TableCell>
                <TableCell>
                  <OrderStatusBadge status={order.status}/>
                </TableCell>                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
