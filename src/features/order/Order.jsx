// Test ID: IIDSAT

import { useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import OrderItem from "./OrderItem";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";

function Order() {
  const order = useLoaderData();

  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="px-4 py-6">
      <div className="flex flex-wrap items-center gap-4 mb-4 justify-normal ">
        <h2 className="text-xl font-semibold">Order #{id} status</h2>

        <div className="space-x-2 ">
          {priority && (
            <span className="px-3 py-1 text-sm tracking-wide uppercase bg-red-500 rounded-full text-semibold text-red-50">
              Priority
            </span>
          )}
          <span className="px-3 py-1 text-sm tracking-wide uppercase bg-green-500 rounded-full text-semibold text-green-50">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 px-6 py-5 justify-normal bg-stone-200">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>
      <ul className="border-t border-b divide-y divide-stone-200">
        {cart.map((item) => {
          return <OrderItem key={item.id} item={item} />;
        })}
      </ul>

      <div className="px-6 py-5 space-y-2 bg-stone-200">
        <p className="text-sm font-medium text-stone-600">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm font-medium text-stone-600">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
    </div>
  );
}

export const loader = async ({ params }) => {
  const order = await getOrder(params.orderId);
  return order; 
};

export default Order;
