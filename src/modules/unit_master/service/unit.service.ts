import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../common/provider";
import { CreateUnitDto } from "../model/create-unit.dto";

@Injectable()
export class UnitService {
    constructor(private prisma: PrismaService) {}

    async create(data: CreateUnitDto) {
        return this.prisma.unitMaster.create({
            data: {
                unit_code: data.unit_code,
                unit_name: data.unit_name,
                unit_qty: data.unit_qty,
                category_id: data.category_id,
                status: data.status || "active",
            },
        });
    }

    async findAll(query: any) {
        const page = parseInt(query.page) || 1;
        const limit = parseInt(query.limit) || 10;
        const search = query.search || "";

        const skip = (page - 1) * limit;

        const where: any = {
            ...(search && {
                OR: [
                    {
                        unit_name: {
                            contains: search,
                            mode: "insensitive" as const,
                        },
                    },
                    {
                        unit_code: {
                            contains: search,
                            mode: "insensitive" as const,
                        },
                    },
                ],
            }),

            ...(query.category_id && {
                category_id: parseInt(query.category_id),
            }),

            ...(query.status && {
                status: query.status,
            }),
        };

        const [data, total] = await Promise.all([
            this.prisma.unitMaster.findMany({
                where,
                skip,
                take: limit,
                orderBy: {
                    unit_id: "desc",
                },
            }),
            this.prisma.unitMaster.count({ where }),
        ]);

        return {
            list: data,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
}
