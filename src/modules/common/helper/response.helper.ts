export class ResponseHelper {
    static success(data: any, message = "success", code = 200) {
        return {
            status: "success",
            code,
            data,
            message,
        };
    }

    static error(message = "error", code = 400, data: any = []) {
        return {
            status: "error",
            code,
            data,
            message,
        };
    }
}
