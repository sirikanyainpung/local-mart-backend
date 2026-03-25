import { IsString, IsOptional, IsArray } from "class-validator";

export class CreateBrandModelDto {
    @IsString()
    brand_model_code: string;

    @IsString()
    brand_model_name: string;

    @IsOptional()
    @IsString()
    status?: string;
}

export class CreateBrandDto {
    @IsString()
    brand_code: string;

    @IsString()
    brand_name: string;

    @IsOptional()
    @IsString()
    status?: string;

    @IsOptional()
    @IsArray()
    brand_models?: CreateBrandModelDto[];
}
