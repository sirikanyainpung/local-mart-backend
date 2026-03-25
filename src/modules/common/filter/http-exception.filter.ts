import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse(); // ✅ ไม่ต้องระบุ type

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = "Internal server error";

        // Nest error
        if (exception instanceof HttpException) {
            status = exception.getStatus();
            const res = exception.getResponse();

            message =
                typeof res === "string"
                    ? res
                    : (res as any)?.message || exception.message;
        }

        // Prisma error
        if (exception instanceof Prisma.PrismaClientKnownRequestError) {
            if (exception.code === "P2002") {
                status = 400;
                const field = (exception.meta as any)?.target?.[0];
                message = `${field} already exists`;
            }
        }

        response.status(status).send({
            status: "error",
            code: status,
            data: [],
            message,
        });
    }
}
