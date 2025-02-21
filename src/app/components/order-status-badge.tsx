import { Badge } from "flowbite-react";
import { OrderStatus } from "../models";

interface OrderStatusBadgeProps {
  status: OrderStatus
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  let color: string;
  let text: string;
  switch (status) {
    case OrderStatus.PENDING:
      color = "info";
      text = "Pendente";
      break;
    case OrderStatus.OPEN:
      color = "warning";
      text = "Aberto";
      break;
    case OrderStatus.CLOSED:
      color = "success";
      text = "Fechado";
      break;
    case OrderStatus.FAILED:
      color = "failure";
      text = "Falhou";
      break;
  }
  return <Badge color={color} className="w-fit">{text}</Badge>;
}