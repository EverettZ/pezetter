import { EnsureHttpsInterceptor } from './interceptors/ensure-https-interceptor';
import { MenuOverlayService } from './menu-overlay/menu-overlay.service';
import { ScrollParallaxService } from './scroll-parallax/scroll-parallax.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { NgModule } from '@angular/core';

import { ResumeService } from './resume/resume.service';
import { RequestCacheWithMap, RequestCache } from './request-cache/request-cache.service';
import { CachingInterceptor } from './interceptors/caching-interceptor';

import { NoopInterceptor } from './interceptors/noop-interceptor';

@NgModule({
    imports: [
        HttpClientModule
    ],
    providers: [
        ScrollParallaxService,
        ResumeService,
        MenuOverlayService,
        { provide: RequestCache, useClass: RequestCacheWithMap },
        { provide: HTTP_INTERCEPTORS, useClass: NoopInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: EnsureHttpsInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true },
    ]
})
export class ServicesModule { }
