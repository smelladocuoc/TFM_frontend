import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { SharedService } from 'src/app/Shared/services/shared.service';
import { ElementDTO } from '../models/element.dto';
import { CollectionDTO } from 'src/app/Collections/models/collection.dto';

interface updateResponse {
  affected: number;
}

interface deleteResponse {
  affected: number;
}

@Injectable({
  providedIn: 'root',
})
export class ElementService {
  private urlBlogUocApi: string;
  private controller: string;

  constructor(private http: HttpClient, private sharedService: SharedService) {
    this.controller = 'elemento';
    this.urlBlogUocApi = 'https://tfmbackend-production.up.railway.app/api/' + this.controller;
  }

  getElements(): Observable<ElementDTO[]> {
    return this.http
      .get<ElementDTO[]>(this.urlBlogUocApi)
      .pipe(catchError(this.sharedService.handleError));
  }

  getElementsByUserId(userId: string): Observable<ElementDTO[]> {
    return this.http
      .get<ElementDTO[]>('https://tfmbackend-production.up.railway.app/api/elemento/user/' + userId + '/1')
      .pipe(catchError(this.sharedService.handleError));
  }

  getElementsCollection(collectionId: string, userId: string): Observable<ElementDTO[]> {
    return this.http
      .get<ElementDTO[]>('https://tfmbackend-production.up.railway.app/api/elemento/coleccion/' + collectionId + '/' + userId)
      .pipe(catchError(this.sharedService.handleError));
  }

  getElementsCharts(): Observable<String[]> {
    return this.http
      .get<String[]>('https://tfmbackend-production.up.railway.app/api/elemento/grafico/numero')
      .pipe(catchError(this.sharedService.handleError));
  }

  getElementsNouserCollection(collectionId: string, userId: string): Observable<ElementDTO[]> {
    return this.http
      .get<ElementDTO[]>('https://tfmbackend-production.up.railway.app/api/elemento/nouser/coleccion/' + collectionId + '/' + userId)
      .pipe(catchError(this.sharedService.handleError));
  }

  createElement(element: ElementDTO, selectedValue: string): Observable<ElementDTO> {
    return this.http
      .post<ElementDTO>(this.urlBlogUocApi + '/nuevo/' + selectedValue, element)
      .pipe(catchError(this.sharedService.handleError));
  }

  getElementById(elementId: string): Observable<ElementDTO> {
    return this.http
      .get<ElementDTO>(this.urlBlogUocApi + '/' + elementId)
      .pipe(catchError(this.sharedService.handleError));
  }

  updateElement(elementId: string, element: ElementDTO, selectedValue: string): Observable<ElementDTO> {
    return this.http
      .post<ElementDTO>(this.urlBlogUocApi + '/actualizacion/' + elementId + '/' + selectedValue, element)
      .pipe(catchError(this.sharedService.handleError));
  }

  updateCommentElement(elementId: string, comentario: String): Observable<ElementDTO> {
    return this.http
      .post<ElementDTO>(this.urlBlogUocApi + '/actualizacion/comentario/' + elementId + '/1', comentario)
      .pipe(catchError(this.sharedService.handleError));
  }

  addElementUser(elementsIdArray: string[], userId: string): Observable<ElementDTO> {
    return this.http
      .post<ElementDTO>(this.urlBlogUocApi + '/user/nuevo/' + userId, elementsIdArray)
      .pipe(catchError(this.sharedService.handleError));
  }

  deleteElement(elementId: string): Observable<deleteResponse> {
    return this.http
      .delete<deleteResponse>(this.urlBlogUocApi + '/borrado/' + elementId)
      .pipe(catchError(this.sharedService.handleError));
  }

  deleteElementUser(elementId: string, userId: string): Observable<deleteResponse> {
    return this.http
      .delete<deleteResponse>(this.urlBlogUocApi + '/borrado/user/' + elementId + "/" + userId)
      .pipe(catchError(this.sharedService.handleError));
  }
}
