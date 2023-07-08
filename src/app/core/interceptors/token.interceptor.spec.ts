import { TestBed } from '@angular/core/testing';

import { TokenInterceptor } from './token.interceptor';
import { HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';

describe('HttpInterceptor', () => {
  let interceptor: TokenInterceptor;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TokenInterceptor
      ]
    });
    interceptor = TestBed.inject(TokenInterceptor);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should add authorId header', async() => {
    const authorId = 'token123';
    const request = new HttpRequest('GET', 'https://test.com/api');
    const event = await interceptor
      .intercept(request, {
        handle: () => of(new HttpResponse()),
      } as HttpHandler)
      .subscribe((event: HttpEvent<any>) => {
        if (event instanceof HttpRequest) {
          expect(event.headers.get('authorId')).toEqual(authorId);
        }
      });
  });
});
