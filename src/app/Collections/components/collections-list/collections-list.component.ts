import { Component } from '@angular/core';
import { CollectionDTO } from '../../models/collection.dto';
import { Router } from '@angular/router';
import { AppState } from 'src/app/app.reducers';
import * as CollectionsAction from '../../actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-collections-list',
  templateUrl: './collections-list.component.html',
  styleUrls: ['./collections-list.component.scss']
})
export class CollectionsListComponent {
  collections: CollectionDTO[];

  displayedColumns: string[] = ['nombre_coleccion', 'tipo_coleccion', 'imagen_coleccion', 'actions'];

  private userId: string;
  constructor(private router: Router, private store: Store<AppState>) {
    this.userId = '';
    this.collections = new Array<CollectionDTO>();

    this.store.select('auth').subscribe((auth) => {
      if (auth.credentials.id) {
        this.userId = auth.credentials.id;
      }
    });

    this.store.select('collections').subscribe((collections) => {
      this.collections = collections.collections;
    });

    this.loadCollections();
  }

  private loadCollections(): void {
    //if (this.userId) {
    this.store.dispatch(
      CollectionsAction.getCollectionsByUserId({ userId: this.userId })
    );
    //}
  }

  createCollection(): void {
    this.router.navigateByUrl('/user/collection/');
  }

  updateCollection(collectionId: string): void {
    this.router.navigateByUrl('user/collection/' + collectionId);
  }

  deleteCollection(collectionId: string): void {
    let errorResponse: any;

    // show confirmation popup
    let result = confirm(
      'Confirm delete collection with id: ' + collectionId + ' .'
    );
    if (result) {
      this.store.dispatch(
        CollectionsAction.deleteCollection({ collectionId: collectionId })
      );
    }
    this.loadCollections();
  }
}
