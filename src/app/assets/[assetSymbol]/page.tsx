import { AssetShow } from "@/app/components/asset-show";
import { OrderForm } from "@/app/components/order-form";
import { TabsItem } from "@/app/components/tabs";
import { OrderType } from "@/app/models";
import { Card, Tabs } from "flowbite-react";
import { AssetChartComponent } from "./asset-chart-component";
import { WalletList } from "@/app/components/wallet-list";
import { getAsset, getMyWallet } from "@/app/queries/queries";

interface AssetDashboardProps {
  params: Promise<{ assetSymbol: string }>;
  searchParams: Promise<{ walletId: string }>
}

export default async function AssetDashboard({
  params,
  searchParams
}: AssetDashboardProps) {
  const { walletId } = await searchParams;
  const { assetSymbol } = await params;
  const asset = await getAsset(assetSymbol);

  if(!walletId) {
    return <WalletList />
  }
    
  const wallet = await getMyWallet(walletId);

  if(!wallet) {
    return <WalletList />
  }

  return(
    <div className="flex flex-col space-y-5 flex-grow">
      <div className="flex flex-col space-y-2">
        <AssetShow asset={asset}/>
        <div className="ml-2 font-bold text-2xl">$ {asset.price}</div>
      </div>
      <div className="grid grid-cols-5 flex-grow gap-2">
        <div className="col-span-2">
          <Card>
            <Tabs>
              <TabsItem active title={<div className="text-blue-700">Buy</div>}>
                <OrderForm 
                  asset={asset}
                  walletId={walletId}
                  type={OrderType.BUY}
                />
              </TabsItem>
              <TabsItem title={<div className="text-red-700">Sell</div>}>
                <OrderForm 
                  asset={asset}
                  walletId={walletId}
                  type={OrderType.SELL}
                />
              </TabsItem>
            </Tabs>
          </Card>
        </div>
        <div className="col-span-3 flex flex-grow">
          <AssetChartComponent asset={asset}/>
        </div>
      </div>
    </div>
  );
}