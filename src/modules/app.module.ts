import { Module } from "@nestjs/common";

import { CommonModule } from "./common";
// import { PassengerModule } from "./passenger/passenger.module";
import { BrandModule } from "./brand_master/brand.module";

@Module({
    imports: [CommonModule, BrandModule],
})
export class ApplicationModule {}
