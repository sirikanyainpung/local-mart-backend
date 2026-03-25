import { Controller, Post, Body, Get, Query } from "@nestjs/common";
import { BrandService } from "../service/brand.service";
import { CreateBrandDto } from "../model/create-brand.dto";

@Controller("brands")
export class BrandController {
    constructor(private readonly brandService: BrandService) {}

    @Post()
    create(@Body() body: CreateBrandDto) {
        return this.brandService.create(body);
    }

    @Get()
    findAll(@Query() query: any) {
        return this.brandService.findAll(query);
    }
}
