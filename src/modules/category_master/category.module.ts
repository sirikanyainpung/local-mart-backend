import { Module } from "@nestjs/common";
import { CategoryController } from "./controller/category.controller";
import { CategoryService } from "./service/category.service";
import { CommonModule } from "../common/common.module";

@Module({
    imports: [CommonModule],
    controllers: [CategoryController],
    providers: [CategoryService],
})
export class CategoryModule {}
