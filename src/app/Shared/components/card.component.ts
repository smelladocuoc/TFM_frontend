import { Component, Input } from '@angular/core';
import { ElementDTO } from 'src/app/Element/models/element.dto';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() elements: ElementDTO[] = [];

}
