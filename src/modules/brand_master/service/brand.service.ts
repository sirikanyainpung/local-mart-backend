import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../common/provider";
import { CreateBrandDto } from "../model/create-brand.dto";
import { Prisma } from "@prisma/client";
import { ResponseHelper } from "../../common/helper/response.helper";

@Injectable()
export class BrandService {
    constructor(private prisma: PrismaService) {}

    async create(data: CreateBrandDto) {
        try {
            const result = await this.prisma.brandMaster.create({
                data: {
                    brand_code: data.brand_code,
                    brand_name: data.brand_name,
                    status: data.status || "active",
                    brand_models: data.brand_models
                        ? {
                              create: data.brand_models.map((m) => ({
                                  brand_model_code: m.brand_model_code,
                                  brand_model_name: m.brand_model_name,
                                  status: m.status || "active",
                              })),
                          }
                        : undefined,
                },
                include: {
                    brand_models: true,
                },
            });

            return ResponseHelper.success(result, "Create brand success");
        } catch (error) {
            // 🔥 handle Prisma error
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                // duplicate
                if (error.code === "P2002") {
                    const field = (error.meta as any)?.target?.[0];

                    return ResponseHelper.error(`${field} already exists`, 400);
                }
            }

            return ResponseHelper.error("Create brand failed", 500);
        }
    }

    async findAll(query: any) {
        try {
            const page = parseInt(query.page) || 1;
            const limit = parseInt(query.limit) || 10;
            const search = query.search || "";

            const skip = (page - 1) * limit;

            const where = search
                ? {
                      OR: [
                          {
                              brand_name: {
                                  contains: search,
                                  mode: "insensitive" as const,
                              },
                          },
                          {
                              brand_code: {
                                  contains: search,
                                  mode: "insensitive" as const,
                              },
                          },
                      ],
                  }
                : {};

            const [data, total] = await Promise.all([
                this.prisma.brandMaster.findMany({
                    where,
                    include: { brand_models: true },
                    skip,
                    take: limit,
                    orderBy: { brand_id: "desc" },
                }),
                this.prisma.brandMaster.count({ where }),
            ]);

            return ResponseHelper.success(
                {
                    list: data,
                    meta: {
                        total,
                        page,
                        limit,
                        totalPages: Math.ceil(total / limit),
                    },
                },
                "Get brand success",
            );
        } catch (error) {
            return ResponseHelper.error("Get brand failed");
        }
    }

    // async create(data: CreateBrandDto) {
    //     return this.prisma.brandMaster.create({
    //         data: {
    //             brand_code: data.brand_code,
    //             brand_name: data.brand_name,
    //             status: data.status || "active",

    //             brand_models: data.brand_models
    //                 ? {
    //                       create: data.brand_models.map((m) => ({
    //                           brand_model_code: m.brand_model_code,
    //                           brand_model_name: m.brand_model_name,
    //                           status: m.status || "active",
    //                       })),
    //                   }
    //                 : undefined,
    //         },
    //         include: {
    //             brand_models: true,
    //         },
    //     });
    // }

    // async findAll(query: any) {
    //     const page = parseInt(query.page) || 1;
    //     const limit = parseInt(query.limit) || 10;
    //     const search = query.search || "";

    //     const skip = (page - 1) * limit;

    //     const where = search
    //         ? {
    //               OR: [
    //                   {
    //                       brand_name: {
    //                           contains: search,
    //                           mode: "insensitive" as const,
    //                       },
    //                   },
    //                   {
    //                       brand_code: {
    //                           contains: search,
    //                           mode: "insensitive" as const,
    //                       },
    //                   },
    //               ],
    //           }
    //         : {};

    //     const [data, total] = await Promise.all([
    //         this.prisma.brandMaster.findMany({
    //             where,
    //             include: {
    //                 brand_models: true,
    //             },
    //             skip,
    //             take: limit,
    //             orderBy: {
    //                 brand_id: "desc",
    //             },
    //         }),
    //         this.prisma.brandMaster.count({ where }),
    //     ]);

    //     return {
    //         data,
    //         meta: {
    //             total,
    //             page,
    //             limit,
    //             totalPages: Math.ceil(total / limit),
    //         },
    //     };
    // }
}
