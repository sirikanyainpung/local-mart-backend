import { Controller, Post, Body, Get, Query } from "@nestjs/common";
import { BrandService } from "../service/brand.service";
import { CreateBrandDto } from "../model/create-brand.dto";
import { ResponseHelper } from "../../common/helper/response.helper";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Brands")
@Controller("brands")
export class BrandController {
    constructor(private readonly brandService: BrandService) {}

    @Post()
    async create(@Body() body: CreateBrandDto) {
        const result = await this.brandService.create(body);
        return ResponseHelper.success(result, "Create brand success");
    }

    @Get()
    async findAll(@Query() query: any) {
        const result = await this.brandService.findAll(query);
        return ResponseHelper.success(result, "Get brand success");
    }
}
