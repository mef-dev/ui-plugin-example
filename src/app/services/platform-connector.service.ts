import { Injectable } from '@angular/core';
import { IHttpService, PlatformHelper, PluginLocalData } from '@natec/mef-dev-platform-connector';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class PlatformConnectorService {

  private platformHttpService: IHttpService | undefined = PlatformHelper.getPlatformHttpClient();

  constructor(private httpService: HttpService) { }

  get HttpClient(): IHttpService{
    return this.platformHttpService ?? this.httpService;
  }

  get PluginData(): PluginLocalData | undefined{
    return PlatformHelper.getPluginData();
  }


}
