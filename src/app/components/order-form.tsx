import { Button, Label, TextInput } from "flowbite-react";
import { Asset, OrderType } from "../models";

interface OrderFormProps {
  asset: Asset;
  walletId: string;
  type: OrderType;
}

export function OrderForm({ asset, type, walletId }: OrderFormProps) {
  const color = type === OrderType.BUY ? 'text-blue-700' : 'text-red-700';
  const translatedType = type === OrderType.BUY ? 'Buy' : 'Sell';

  return(
    <form className="flex flex-col gap-4">
      <input type="hidden" name="assetId" defaultValue={asset._id}/>
      <input type="hidden" name="walletId" defaultValue={walletId}/>
      <input type="hidden" name="type" defaultValue={type}/>
      <div>
        <div className="mb-2">
          <Label htmlFor="shares" value="Quantity" className={color}/>
        </div>
        <TextInput 
          id="shares" 
          name="shares" 
          required 
          type="number"
          min={1}
          step={1}
          defaultValue={1}
          color={type === OrderType.BUY ? 'info' : 'failure'}
        />
      </div>
      <div>
        <div className="mb-2">
          <Label htmlFor="price" value="Price ($)" className={color}/>
        </div>
        <TextInput 
          id="price" 
          name="price" 
          required 
          type="number"
          min={1}
          step={1}
          defaultValue={1}
          color={type === OrderType.BUY ? 'info' : 'failure'}
        />
      </div>
      <Button type="submit" color={type === OrderType.BUY ? 'blue' : 'failure'}>
        {translatedType}
      </Button>
    </form>
  );
}