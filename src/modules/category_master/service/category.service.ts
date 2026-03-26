import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../common/provider";
import { CreateCategoryDto } from "../model/create-category.dto";

@Injectable()
export class CategoryService {
    constructor(private prisma: PrismaService) {}

    async create(data: CreateCategoryDto) {
        return this.createRecursive(data, null);
    }

    async createRecursive(data: any, parentId: number | null = null) {
        // 🔥 VALIDATE LEVEL
        const level = parseInt(data.category_level);

        if (parentId === null && level !== 1) {
            throw new Error("Root category must be level 1");
        }

        if (parentId !== null && level === 1) {
            throw new Error("Child category cannot be level 1");
        }

        const category = await this.prisma.categoryMaster.create({
            data: {
                category_code: data.category_code,
                category_name_th: data.category_name_th,
                category_name_en: data.category_name_en,
                category_level: data.category_level,
                parent_category_id: parentId,
                status: "active",
            },
        });

        let children: any[] = [];

        if (data.parent_list && data.parent_list.length > 0) {
            for (const child of data.parent_list) {
                const childResult = await this.createRecursive(
                    child,
                    category.category_id,
                );
                children.push(childResult);
            }
        }

        // 🔥 สำคัญ: return tree structure
        return {
            ...category,
            children,
        };

        // const category = await this.prisma.categoryMaster.create({
        //     data: {
        //         category_code: data.category_code,
        //         category_name_th: data.category_name_th,
        //         category_name_en: data.category_name_en,
        //         category_level: data.category_level,
        //         parent_category_id: parentId,
        //         status: "active",
        //     },
        // });

        // // 🔥 ถ้ามีลูก → loop ต่อ
        // if (data.parent_list && data.parent_list.length > 0) {
        //     for (const child of data.parent_list) {
        //         await this.createRecursive(child, category.category_id);
        //     }
        // }

        // return category;
    }

    async buildTree(parentId: number | null, filter: any): Promise<any[]> {
        const parent_list = await this.prisma.categoryMaster.findMany({
            where: {
                parent_category_id: parentId,
                ...(filter.status && { status: filter.status }),
                ...(filter.search && {
                    OR: [
                        {
                            category_name_th: {
                                contains: filter.search,
                                mode: "insensitive" as const,
                            },
                        },
                        {
                            category_name_en: {
                                contains: filter.search,
                                mode: "insensitive" as const,
                            },
                        },
                        {
                            category_code: {
                                contains: filter.search,
                                mode: "insensitive" as const,
                            },
                        },
                    ],
                }),
            },
            orderBy: { category_id: "asc" },
        });

        // 🔥 recursion
        const result = [];
        for (const item of parent_list) {
            const childNodes = await this.buildTree(item.category_id, filter);

            result.push({
                ...item,
                parent_list: childNodes,
            });
        }

        return result;
    }

    async getTree(query: any) {
        const page = parseInt(query.page) || 1;
        const limit = parseInt(query.limit) || 10;
        const search = query.search || "";
        const status = query.status || undefined;

        const skip = (page - 1) * limit;

        // 🔥 root filter (L1 หรือ parent ที่กำหนด)
        const rootWhere: any = {
            ...(query.parent_category_id
                ? { parent_category_id: parseInt(query.parent_category_id) }
                : { parent_category_id: null }),

            ...(query.category_level && {
                category_level: query.category_level,
            }),

            ...(status && { status }),

            ...(search && {
                OR: [
                    {
                        category_name_th: {
                            contains: search,
                            mode: "insensitive" as const,
                        },
                    },
                    {
                        category_name_en: {
                            contains: search,
                            mode: "insensitive" as const,
                        },
                    },
                    {
                        category_code: {
                            contains: search,
                            mode: "insensitive" as const,
                        },
                    },
                ],
            }),
        };

        // 🔥 root list
        const [roots, total] = await Promise.all([
            this.prisma.categoryMaster.findMany({
                where: rootWhere,
                skip,
                take: limit,
                orderBy: { category_id: "asc" },
            }),
            this.prisma.categoryMaster.count({ where: rootWhere }),
        ]);

        // 🔥 build tree ต่อจาก root
        const tree = [];
        for (const root of roots) {
            const parent_list = await this.buildTree(root.category_id, {
                search,
                status,
            });

            tree.push({
                ...root,
                parent_list,
            });
        }

        return {
            list: tree,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
}
