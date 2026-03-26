import { IsString, IsInt, IsOptional, IsArray } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateBarcodeDto {
    @ApiProperty({ example: "8851234567890", description: "Barcode number" })
    @IsString()
    barcode: string;

    @ApiProperty({ example: 1, description: "Unit ID (e.g. piece, box)" })
    @IsInt()
    unit_id: number;

    @ApiProperty({ example: 10, description: "Quantity per unit" })
    @IsInt()
    qty: number;

    @ApiProperty({ example: "7%", description: "VAT rate" })
    @IsString()
    vat: string;

    @ApiProperty({ example: 20000, description: "Cost price" })
    cost_price: number;

    @ApiProperty({ example: 25000, description: "Sale price" })
    sale_price: number;
}

export class CreateImageDto {
    @ApiProperty({ example: "image", description: "image or video" })
    @IsString()
    image_type: string;

    @ApiProperty({ example: 1, description: "Image order number" })
    @IsInt()
    image_index: number;

    @ApiProperty({
        example: "/uploads/products/iphone15.jpg",
        description: "Image path",
    })
    @IsString()
    image_path: string;
}

export class CreateProductDto {
    @ApiProperty({ example: "SKU001", description: "Stock Keeping Unit code" })
    @IsString()
    sku_code: string;

    @ApiProperty({ example: "iPhone 15 Pro Max", description: "Product name" })
    @IsString()
    product_name: string;

    @ApiProperty({
        example: "Latest Apple smartphone with A17 chip",
        description: "Product description",
        required: false,
    })
    @IsOptional()
    product_description?: string;

    @ApiProperty({ example: 1, description: "Category ID" })
    @IsInt()
    category_id: number;

    @ApiProperty({ example: 1, description: "Brand ID" })
    @IsInt()
    brand_id: number;

    @ApiProperty({ example: 1, description: "Brand model ID" })
    @IsInt()
    brand_model_id: number;

    @ApiProperty({
        type: [CreateBarcodeDto],
        example: [
            {
                barcode: "8851234567890",
                unit_id: 1,
                qty: 10,
                vat: "7%",
                cost_price: 20000,
                sale_price: 25000,
            },
        ],
    })
    @IsArray()
    barcodes: CreateBarcodeDto[];

    @ApiProperty({
        type: [CreateImageDto],
        example: [
            {
                image_type: "image",
                image_index: 1,
                image_path: "/uploads/products/iphone15.jpg",
            },
        ],
    })
    @IsArray()
    images: CreateImageDto[];
}
