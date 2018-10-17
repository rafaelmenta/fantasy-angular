import { InjectionToken } from '@angular/core';
import { environment } from '../environments/environment';

export let APP_CONFIG = new InjectionToken('app.config');

export interface AppConfig {
    API_ENDPOINT: string;
    LARGE_MOBILE_QUERY: string;
}

export const AppConfig: AppConfig = {
    // TODO add env vars
    API_ENDPOINT: environment.apiUrl,
    LARGE_MOBILE_QUERY: '(max-width: 599px)',
};

