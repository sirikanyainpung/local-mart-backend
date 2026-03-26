import { IsString, IsOptional, IsArray } from "class-validator";
import { ApiProperty } from "@nestjs/swagger"; // 1. นำเข้า ApiProperty

export class CreateBrandModelDto {
    @ApiProperty({ example: "CP-001" }) // 2. เพิ่มเพื่อบอก Swagger
    @IsString()
    brand_model_code: string;

    @ApiProperty({ example: "Chicken" })
    @IsString()
    brand_model_name: string;

    @ApiProperty({ example: "active", required: false })
    @IsOptional()
    @IsString()
    status?: string;
}

export class CreateBrandDto {
    @ApiProperty({ example: "CP" })
    @IsString()
    brand_code: string;

    @ApiProperty({ example: "CPF" })
    @IsString()
    brand_name: string;

    @ApiProperty({ example: "active", required: false })
    @IsOptional()
    @IsString()
    status?: string;

    @ApiProperty({
        type: [CreateBrandModelDto], // 3. ระบุว่าเป็น Array ของ Class ไหน
        required: false,
    })
    @IsOptional()
    @IsArray()
    brand_models?: CreateBrandModelDto[];
}

// import { IsString, IsOptional, IsArray } from "class-validator";

// export class CreateBrandModelDto {
//     @IsString()
//     brand_model_code: string;

//     @IsString()
//     brand_model_name: string;

//     @IsOptional()
//     @IsString()
//     status?: string;
// }

// export class CreateBrandDto {
//     @IsString()
//     brand_code: string;

//     @IsString()
//     brand_name: string;

//     @IsOptional()
//     @IsString()
//     status?: string;

//     @IsOptional()
//     @IsArray()
//     brand_models?: CreateBrandModelDto[];
// }
