import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { SharedService } from 'src/app/Shared/services/shared.service';
import { CollectionDTO } from '../models/collection.dto';

export interface deleteResponse {
  affected: number;
}

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  private urlBlogUocApi: string;
  private controller: string;

  constructor(private http: HttpClient, private sharedService: SharedService) {
    this.controller = 'coleccion';
    this.urlBlogUocApi = 'https://tfmbackend-production.up.railway.app/api/' + this.controller;
  }

  getCollectionsByUserId(userId: string): Observable<CollectionDTO[]> {
    return this.http
      .get<CollectionDTO[]>('https://tfmbackend-production.up.railway.app/api/coleccion')
      .pipe(catchError(this.sharedService.handleError));
  }

  getCollectionElement(elementId: string): Observable<CollectionDTO[]> {
    return this.http
      .get<CollectionDTO[]>('https://tfmbackend-production.up.railway.app/api/elemento/coleccion/' + elementId)
      .pipe(catchError(this.sharedService.handleError));
  }

  createCollection(collection: CollectionDTO): Observable<CollectionDTO> {
    return this.http
      .post<CollectionDTO>(this.urlBlogUocApi + "/nueva", collection)
      .pipe(catchError(this.sharedService.handleError));
  }

  getCollectionById(collectionId: string): Observable<CollectionDTO> {
    return this.http
      .get<CollectionDTO>(this.urlBlogUocApi + '/' + collectionId)
      .pipe(catchError(this.sharedService.handleError));
  }

  updateCollection(
    collectionId: string,
    collection: CollectionDTO
  ): Observable<CollectionDTO> {
    return this.http
      .post<CollectionDTO>(this.urlBlogUocApi + '/actualizacion/' + collectionId, collection)
      .pipe(catchError(this.sharedService.handleError));
  }

  deleteCollection(collectionId: string): Observable<deleteResponse> {
    return this.http
      .delete<deleteResponse>(this.urlBlogUocApi + '/borrado/' + collectionId)
      .pipe(catchError(this.sharedService.handleError));
  }
}
