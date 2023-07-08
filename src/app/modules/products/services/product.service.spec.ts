import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { Product } from 'src/app/shared/types/products.types';
import { HttpClient, HttpEvent } from '@angular/common/http';

describe('ProductService', () => {
  let service: ProductService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService],
    });
    service = TestBed.inject(ProductService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should test get products', () => {
    const testData: Product[] = [];

    service.getProducts().subscribe({
      next: (response) => {
        expect(response).toEqual(testData)
      }
    });

    const mockReq = httpTestingController.expectOne(service.apiUrl);
    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    mockReq.flush(testData);

    httpTestingController.verify();
  });

  it('should test send product', () => {
    const testData: Product = {} as Product;

    service.sendProduct(testData).subscribe({
      next: (response) => {
        expect(response).toEqual(testData)
      }
    });

    const mockReq = httpTestingController.expectOne(service.apiUrl);
    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    mockReq.flush(testData);

    httpTestingController.verify();
  });

  it('should test update product', () => {
    const testData: Product = {} as Product;

    service.updateProduct(testData).subscribe({
      next: (response) => {
        expect(response).toEqual(testData)
      }
    });

    const mockReq = httpTestingController.expectOne(service.apiUrl);
    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    mockReq.flush(testData);

    httpTestingController.verify();
  });

  it('should test delete product', () => {
    const testData: Product = { id: 'prod01'} as Product;

    service.deleteProduct(testData).subscribe({
      next: (response) => {
        expect(response).toEqual(testData)
      }
    });

    const mockReq = httpTestingController.expectOne(service.apiUrl+'?id=prod01');
    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    mockReq.flush(testData);

    httpTestingController.verify();
  });
});
