import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../common/provider";
import { CreateProductDto } from "../model/create-product.dto";

@Injectable()
export class ProductService {
    constructor(private prisma: PrismaService) {}

    async create(data: CreateProductDto) {
        return this.prisma.productMaster.create({
            data: {
                sku_code: data.sku_code,
                product_name: data.product_name,
                product_description: data.product_description,
                category_id: data.category_id,
                brand_id: data.brand_id,
                brand_model_id: data.brand_model_id,
                status: "active",

                // 🔥 nested create
                barcodes: {
                    create: data.barcodes.map((b) => ({
                        barcode: b.barcode,
                        unit_id: b.unit_id,
                        qty: b.qty,
                        vat: b.vat,
                        cost_price: b.cost_price,
                        sale_price: b.sale_price,
                        status: "active",
                    })),
                },

                images: {
                    create: data.images.map((img) => ({
                        sku_code: data.sku_code,
                        image_type: img.image_type,
                        image_index: img.image_index,
                        image_path: img.image_path,
                        status: "active",
                    })),
                },
            },

            include: {
                barcodes: true,
                images: true,
            },
        });
    }
}
