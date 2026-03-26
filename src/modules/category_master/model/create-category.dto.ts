import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional, IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class CreateCategoryDto {
    @ApiProperty({ example: "ELEC" })
    @IsString()
    category_code: string;

    @ApiProperty({ example: "อิเล็กทรอนิกส์" })
    @IsString()
    category_name_th: string;

    @ApiProperty({ example: "Electronics", required: false })
    @IsOptional()
    @IsString()
    category_name_en?: string;

    @ApiProperty({ example: "1" })
    @IsString()
    category_level: string;

    // 🔥 จุดสำคัญ
    @ApiProperty({
        type: () => [CreateCategoryDto],
        required: false,
        example: [
            {
                category_code: "ELEC-01",
                category_name_th: "ตู้เย็น",
                category_name_en: "Refrigerator",
                category_level: "2",
                parent_list: [
                    {
                        category_code: "ELEC-01-01",
                        category_name_th: "1 ประตู",
                        category_name_en: "Refrigerator-1",
                        category_level: "3",
                    },
                ],
            },
        ],
    })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateCategoryDto)
    parent_list?: CreateCategoryDto[];
}
