import { Controller, Post, Body, Get, Query } from "@nestjs/common";
import { UnitService } from "../service/unit.service";
import { CreateUnitDto } from "../model/create-unit.dto";
import { ResponseHelper } from "../../common/helper/response.helper";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Units")
@Controller("units")
export class UnitController {
    constructor(private readonly unitService: UnitService) {}

    @Post()
    async create(@Body() body: CreateUnitDto) {
        const result = await this.unitService.create(body);
        return ResponseHelper.success(result, "Create unit success");
    }

    @Get()
    async findAll(@Query() query: any) {
        const result = await this.unitService.findAll(query);
        return ResponseHelper.success(result, "Get unit success");
    }
}
