import { Card, Tabs } from "flowbite-react";
import { AssetChartComponent } from "./asset-chart-component";
import { WalletList } from "@/components/wallet-list";
import { getAsset, getAssetDailies, getMyWallet } from "@/queries/queries";
import { AssetShow } from "@/components/asset-show";
import { TabsItem } from "@/components/tabs";
import { OrderForm } from "@/components/order-form";
import { OrderType } from "@/models";
import { Time } from "lightweight-charts";


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
  
  if(!walletId) {
    return <WalletList />
  }
    
  const wallet = await getMyWallet(walletId);
  
  if(!wallet) {
    return <WalletList />
  }

  const asset = await getAsset(assetSymbol);
  const assetDailies = await getAssetDailies(asset.symbol);
  const chartData = assetDailies.map(assetDaily => ({
    time: (Date.parse(assetDaily.date) / 1000) as Time,
    value: assetDaily.price
  }));
  
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
          <AssetChartComponent asset={asset} data={chartData}/>
        </div>
      </div>
    </div>
  );
}