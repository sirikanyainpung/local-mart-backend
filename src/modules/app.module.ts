import { Module } from "@nestjs/common";

import { CommonModule } from "./common";
import { BrandModule } from "./brand_master/brand.module";
import { ProductModule } from "./product_master/product.module";
import { UnitModule } from "./unit_master/unit.module";

@Module({
    imports: [CommonModule, BrandModule, ProductModule, UnitModule],
})
export class ApplicationModule {}
