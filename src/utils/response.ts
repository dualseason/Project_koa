// 定义接口
export interface IResponse {
    status: string;
    message: string;
    getHttpStatusCode(): number;
}

// 定义类SuccessResponse ,用于处理成功类型
export class SuccessResponse implements IResponse {
    status: string;
    message: string;
    data: any;
    constructor(data: any, message: string = "") {
        this.status = "ok";
        this.message = message;
        this.data = data;
    }

    /**
     * 获取 HTTP status code
     */
    public getHttpStatusCode(): number {
        return 200;
    }
}

// 定义类ErrorResponse,用于处理失败类型
export class ErrorResponse implements IResponse {
    status: string;
    message: string;
    code: number;
    constructor(message: string, code: number) {
        this.status = "error";
        this.message = message;
        this.code = code;
    }
    public getHttpStatusCode(): number {
        return this.code;
    }
}
