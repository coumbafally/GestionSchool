import { ApplicationConfig} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

// On importe ce dont on a besoin
import { provideHttpClient} from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
   
    provideRouter(routes),
    provideHttpClient(),

    
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ]
};