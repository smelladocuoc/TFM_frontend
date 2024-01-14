import { Component } from '@angular/core';
import { CollectionDTO } from '../../models/collection.dto';
import { Router } from '@angular/router';
import { AppState } from 'src/app/app.reducers';
import * as CollectionsAction from '../../actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-collection-list-user',
  templateUrl: './collection-list-user.component.html',
  styleUrls: ['./collection-list-user.component.scss']
})
export class CollectionListUserComponent {
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

  loadUserElements(collectionId: string): void {
    this.router.navigateByUrl('elements/collection/' + collectionId + '/' + this.userId);
  }
}
