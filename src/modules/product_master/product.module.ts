import { Module } from "@nestjs/common";
import { ProductController } from "./controller/product.controller";
import { ProductService } from "./service/product.service";
import { CommonModule } from "../common/common.module";

@Module({
    imports: [CommonModule], // 👈 เพื่อใช้ PrismaService
    controllers: [ProductController],
    providers: [ProductService],
})
export class ProductModule {}
