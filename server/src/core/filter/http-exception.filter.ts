import {ArgumentsHost,Catch, ExceptionFilter, HttpException, Logger} from '@nestjs/common';

type ErrorObj = { code?: number, msg?: string, data: Record<string, any>}
type DefaultErrorObj = { statusCode?: number, message?: string, error?: any};
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // 获取请求上下文
    const response = ctx.getResponse(); // 获取请求上下文中的 response对象
    const status = exception.getStatus(); // 获取异常状态码
    const exceptionResp = exception.getResponse();

    // console.log(`exception.message`, exception.message);
    // console.log(`exceptionResp`, exceptionResp);
    Logger.error(exception.message);
    Logger.error(`exceptionResp: ${JSON.stringify(exceptionResp)}`);

    let errorResponse: ErrorObj | DefaultErrorObj = { data: null };
    if (typeof exceptionResp === 'string') {
      errorResponse.code = -1;
      errorResponse.msg = exceptionResp;
    } else {
      errorResponse.code =
        (exceptionResp as ErrorObj).code ||
        (exceptionResp as DefaultErrorObj).statusCode;

      errorResponse.msg =
        (exceptionResp as ErrorObj).msg ||
        (exceptionResp as DefaultErrorObj).message;

      if ((exceptionResp as DefaultErrorObj).error) {
        errorResponse.data = (exceptionResp as DefaultErrorObj).error
      }
    }

    // 设置返回的状态码， 请求头，发送错误信息
    response.status(status);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(errorResponse);
  }
}