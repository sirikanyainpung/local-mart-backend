import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../common/provider";
import { CreateBrandDto } from "../model/create-brand.dto";

@Injectable()
export class BrandService {
    constructor(private prisma: PrismaService) {}

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

    async create(data: CreateBrandDto | CreateBrandDto[]) {
        // 🔥 ถ้าเป็น array → bulk
        if (Array.isArray(data)) {
            const result = [];

            for (const item of data) {
                const created = await this.prisma.brandMaster.create({
                    data: {
                        brand_code: item.brand_code,
                        brand_name: item.brand_name,
                        status: item.status || "active",

                        brand_models: item.brand_models
                            ? {
                                  create: item.brand_models.map((m) => ({
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

                result.push(created);
            }

            return result;
        }

        // 🔥 single create (ของเดิม)
        return this.prisma.brandMaster.create({
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
    }

    async findAll(query: any) {
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

    // async findAll(query: any) {
    //     try {
    //         const page = parseInt(query.page) || 1;
    //         const limit = parseInt(query.limit) || 10;
    //         const search = query.search || "";

    //         const skip = (page - 1) * limit;

    //         const where = search
    //             ? {
    //                   OR: [
    //                       {
    //                           brand_name: {
    //                               contains: search,
    //                               mode: "insensitive" as const,
    //                           },
    //                       },
    //                       {
    //                           brand_code: {
    //                               contains: search,
    //                               mode: "insensitive" as const,
    //                           },
    //                       },
    //                   ],
    //               }
    //             : {};

    //         const [data, total] = await Promise.all([
    //             this.prisma.brandMaster.findMany({
    //                 where,
    //                 include: { brand_models: true },
    //                 skip,
    //                 take: limit,
    //                 orderBy: { brand_id: "desc" },
    //             }),
    //             this.prisma.brandMaster.count({ where }),
    //         ]);

    //         return ResponseHelper.success(
    //             {
    //                 list: data,
    //                 meta: {
    //                     total,
    //                     page,
    //                     limit,
    //                     totalPages: Math.ceil(total / limit),
    //                 },
    //             },
    //             "Get brand success",
    //         );
    //     } catch (error) {
    //         return ResponseHelper.error("Get brand failed");
    //     }
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
