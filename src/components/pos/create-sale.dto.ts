export class CreateSaleDto {
  date!: Date;
  note?: string;
  sale_items!: CreateSaleItemDto[];
}

export class CreateSaleItemDto {
  product_id!: number;
  qty!: number;
  price!: number;
}
