import { Minus, Plus, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useState } from "react";
import CheckoutConfirmPage from "./CheckoutConfirmPage";
import { useCartStore } from "@/store/useCartStore";
import { CartItem } from "@/types/cartType";

const Cart = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { 
    cart, 
    decrementQuantity, 
    incrementQuantity,
    removeFromTheCart, // Make sure this is imported from your cart store
    clearCart 
  } = useCartStore();

  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleRemoveItem = (itemId: string) => {
    removeFromTheCart(itemId); // This will completely remove the item from cart
  };

  return (
    <div className="flex flex-col max-w-7xl mx-auto my-10">
      <div className="flex justify-end">
        <Button 
          variant="link" 
          onClick={clearCart}
          disabled={cart.length === 0}
        >
          Clear All
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Items</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Total</TableHead>
            <TableHead className="text-right">Remove</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cart.map((item: CartItem) => (
            <TableRow key={`${item._id}-${item.name}`}>
              <TableCell>
                <Avatar>
                  <AvatarImage src={item.image} alt={item.name} />
                  <AvatarFallback>
                    {item.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>${item.price.toFixed(2)}</TableCell>
              <TableCell>
                <div className="w-fit flex items-center rounded-full border border-gray-100 dark:border-gray-800 shadow-md">
                  <Button
                    onClick={() => decrementQuantity(item._id)}
                    size={"icon"}
                    variant={"outline"}
                    className="rounded-full bg-gray-200"
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Button
                    size={"icon"}
                    className="font-bold border-none"
                    disabled
                    variant={"outline"}
                  >
                    {item.quantity}
                  </Button>
                  <Button
                    onClick={() => incrementQuantity(item._id)}
                    size={"icon"}
                    className="rounded-full bg-orange hover:bg-hoverOrange"
                    variant={"outline"}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
              <TableCell>${(item.price * item.quantity).toFixed(2)}</TableCell>
              <TableCell className="text-right">
                <Button 
                  size={"sm"} 
                  variant={"destructive"}
                  className="hover:bg-red-600"
                  onClick={() => handleRemoveItem(item._id)} // Added remove functionality here
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow className="text-2xl font-bold">
            <TableCell colSpan={5}>Total</TableCell>
            <TableCell className="text-right">${totalAmount.toFixed(2)}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <div className="flex justify-end my-5">
        <Button
          onClick={() => setOpen(true)}
          className="bg-orange hover:bg-hoverOrange"
          disabled={cart.length === 0}
        >
          Proceed To Checkout
        </Button>
      </div>
      <CheckoutConfirmPage open={open} setOpen={setOpen} />
    </div>
  );
};

export default Cart;