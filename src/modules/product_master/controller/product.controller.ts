import { Controller, Post, Body, Get, Query } from "@nestjs/common";
import { ProductService } from "../service/product.service";
import { CreateProductDto } from "../model/create-product.dto";
import { ResponseHelper } from "../../common/helper/response.helper";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Products")
@Controller("products")
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post()
    async create(@Body() body: CreateProductDto) {
        const result = await this.productService.create(body);

        return ResponseHelper.success(result, "Create product success");
    }

    @Get()
    async findAll(@Query() query: any) {
        const result = await this.productService.findAll(query);

        return ResponseHelper.success(result, "Get product success");
    }
}
