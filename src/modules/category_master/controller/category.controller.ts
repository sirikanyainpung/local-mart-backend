import { Controller, Post, Body, Get, Query } from "@nestjs/common";
import { CategoryService } from "../service/category.service";
import { CreateCategoryDto } from "../model/create-category.dto";
import { ResponseHelper } from "../../common/helper/response.helper";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Category")
@Controller("category")
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Post()
    async create(@Body() body: CreateCategoryDto) {
        const result = await this.categoryService.create(body);

        return ResponseHelper.success(result, "Create category tree success");
    }

    @Get()
    async getTree(@Query() query: any) {
        const result = await this.categoryService.getTree(query);
        return ResponseHelper.success(result, "Get category tree success");
    }
    // async findAll(@Query() query: any) {
    //     const result = await this.categoryService.findAll(query);
    //     return ResponseHelper.success(result, "Get category success");
    // }
}
