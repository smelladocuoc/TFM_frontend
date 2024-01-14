import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import * as CollectionsAction from '../../../Collections/actions';
import { AppState } from 'src/app/app.reducers';
import { CollectionDTO } from 'src/app/Collections/models/collection.dto';
import { ElementService } from '../../services/element.service';

interface Collection {
  "name": String;
  "value": number;
}

@Component({
  selector: 'app-element-charts',
  templateUrl: './element-charts.component.html',
  styleUrls: ['./element-charts.component.scss']
})

export class ElementChartsComponent {

  view: [number, number] = [700, 400];
  private userId: string;
  collections: CollectionDTO[];
  elements: string[] = [];
  collections_principal: Collection[];
  view2: [number, number] = [500, 400];
  legend: boolean = true;
  legendPosition: any = 'below';
  view3: [number, number] = [700, 400];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  showXAxis = true;
  showYAxis = true;
  gradient2 = false;
  showLegend2 = true;
  showXAxisLabel = true;
  xAxisLabel = 'Colecciones';
  showYAxisLabel = true;
  yAxisLabel = 'Elementos';

  colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  colorScheme2: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };
  colorScheme3: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  collections_single: any = [];
  collections_single2: any = [];

  constructor(private elementService: ElementService, private store: Store<AppState>) {
    //Object.assign(this, { single });
    this.userId = '';
    this.collections = new Array<CollectionDTO>();
    this.collections_principal = [];

    this.store.select('auth').subscribe((auth) => {
      if (auth.credentials.id) {
        this.userId = auth.credentials.id;
      }
    });

    this.store.select('collections').subscribe((collections) => {
      this.collections = collections.collections;


    });

    this.loadCollections();


    this.elementService.getElementsCharts().subscribe(result => {
      // La variable result creala globalmente
      for (let i = 0; i < result.length; i++) {
        if (i % 2 === 0) {
          this.collections_principal.push({
            name: result[i],
            value: parseInt((result[i + 1]).toString())
          });
        }
      }

      this.collections_single = this.collections_principal.map((item) => ({
        "name": item.name,
        "value": item.value
      }));
      this.collections_single2 = this.collections_principal.map((item) => ({
        "name": item.name,
        "value": item.value
      }));
    });

  }

  private loadCollections(): void {
    //if (this.userId) {
    this.store.dispatch(
      CollectionsAction.getCollectionsByUserId({ userId: this.userId })
    );
    //}
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

}
