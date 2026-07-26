export interface APIResponseEntity<T = unknown> {
    status: boolean;
    statusCode: number;
    message: string;
    errorMsg?: string | null;
    data: T | null;
}
