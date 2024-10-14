import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { Package2, Plus } from "lucide-react";
export default function PurchaseItemsTable() {
  return (
    <div className="w-full">
      <Table className="w-full h-full overflow-auto">
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell>1</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Button className="flex w-full gap-2">
        <Plus /> Add Product <Package2 />
      </Button>
    </div>
  );
}
