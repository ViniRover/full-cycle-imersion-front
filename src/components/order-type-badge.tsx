import { Badge } from "flowbite-react";
import { OrderType } from "../models";

interface OrderTypeBadgeProps {
  type: OrderType;
}

export function OrderTypeBadge({ type }: OrderTypeBadgeProps) {
  return (
    <Badge
      color={type === OrderType.BUY ? "blue" : "red"}
      className="w-fit"
    >
      {type === OrderType.BUY ? "Compra" : "Venda"}
    </Badge>
  );
}