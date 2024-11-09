import { Observable } from 'rxjs';

export interface UseCase<IRequest, IResponse> {
  execute(
    request?: IRequest
  ): Observable<IResponse> | Promise<IResponse> | IResponse | boolean | void;
}
