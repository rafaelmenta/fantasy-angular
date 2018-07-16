import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../../app.config';

@Injectable({
  providedIn: 'root'
})
export class AdminUploadService {

  constructor(
    @Inject(APP_CONFIG) private config: AppConfig,
    private http: HttpClient) { }

  uploadFile(direction: string, file: File, realName: string) {
    const url = `${this.config.API_ENDPOINT}upload/${direction}`;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('realName', realName);

    const params = new HttpParams();

    const options = {
      params: params,
      reportProgress: true,
    };

    // const req = new HttpRequest('POST', url, formData, options);
    return this.http.post(url, formData, options);
  }
}
