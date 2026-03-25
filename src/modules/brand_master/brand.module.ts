import { Module } from "@nestjs/common";
import { BrandController } from "./controller/brand.controller";
import { BrandService } from "./service/brand.service";
import { CommonModule } from "../common/common.module";

@Module({
    imports: [CommonModule], // 👈 เพื่อใช้ PrismaService
    controllers: [BrandController],
    providers: [BrandService],
})
export class BrandModule {}
