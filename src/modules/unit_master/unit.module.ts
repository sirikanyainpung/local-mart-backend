import { Module } from "@nestjs/common";
import { UnitController } from "./controller/unit.controller";
import { UnitService } from "./service/unit.service";
import { CommonModule } from "../common/common.module";

@Module({
    imports: [CommonModule],
    controllers: [UnitController],
    providers: [UnitService],
})
export class UnitModule {}
