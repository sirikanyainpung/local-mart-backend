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

    async findAll(query: any) {
        const page = parseInt(query.page) || 1;
        const limit = parseInt(query.limit) || 10;
        const search = query.search || "";

        const skip = (page - 1) * limit;

        // 🔥 dynamic filter
        const where: any = {
            ...(search && {
                OR: [
                    {
                        product_name: {
                            contains: search,
                            mode: "insensitive" as const,
                        },
                    },
                    {
                        sku_code: {
                            contains: search,
                            mode: "insensitive" as const,
                        },
                    },
                ],
            }),

            ...(query.brand_id && {
                brand_id: parseInt(query.brand_id),
            }),

            ...(query.category_id && {
                category_id: parseInt(query.category_id),
            }),

            ...(query.status && {
                status: query.status,
            }),
        };

        const [data, total] = await Promise.all([
            this.prisma.productMaster.findMany({
                where,
                include: {
                    barcodes: true,
                    images: true,
                },
                skip,
                take: limit,
                orderBy: {
                    product_id: "desc",
                },
            }),
            this.prisma.productMaster.count({ where }),
        ]);

        return {
            list: data,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
}
