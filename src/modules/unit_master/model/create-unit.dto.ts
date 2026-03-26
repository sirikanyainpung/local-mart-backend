import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsInt, IsOptional } from "class-validator";

export class CreateUnitDto {
    @ApiProperty({ example: "PCS" })
    @IsString()
    unit_code: string;

    @ApiProperty({ example: "Piece" })
    @IsString()
    unit_name: string;

    @ApiProperty({ example: 1 })
    @IsInt()
    unit_qty: number;

    @ApiProperty({ example: 1 })
    @IsInt()
    category_id: number;

    @ApiProperty({ example: "active", required: false })
    @IsOptional()
    @IsString()
    status?: string;
}
