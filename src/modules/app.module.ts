import { Module } from "@nestjs/common";

import { CommonModule } from "./common";
import { BrandModule } from "./brand_master/brand.module";
import { ProductModule } from "./product_master/product.module";

@Module({
    imports: [CommonModule, BrandModule, ProductModule],
})
export class ApplicationModule {}
