import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultComponent {
  @Input() value = '';
  @Input() shouldDisplay: boolean;
}
