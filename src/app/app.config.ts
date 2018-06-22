import { InjectionToken } from '@angular/core';

export let APP_CONFIG = new InjectionToken('app.config');

export interface AppConfig {
    API_ENDPOINT: string;
    LARGE_MOBILE_QUERY: string;
}

export const AppConfig: AppConfig = {
    // TODO add env vars
    // API_ENDPOINT: 'http://localhost:3000/',
    API_ENDPOINT: 'https://api.draftbrasil.net/',
    LARGE_MOBILE_QUERY: '(max-width: 599px)',
};

