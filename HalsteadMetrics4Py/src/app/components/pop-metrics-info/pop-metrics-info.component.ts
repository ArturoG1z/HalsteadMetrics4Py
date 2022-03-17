import { Component, OnInit, Input } from '@angular/core';
import { IHalsteadMetrics } from 'src/app/models/interfaces/interfaces';
import { metricsObjectToArray, myParseFloat } from 'src/app/utils/tools';

@Component({
  selector: 'app-pop-metrics-info',
  templateUrl: './pop-metrics-info.component.html',
  styleUrls: ['./pop-metrics-info.component.scss'],
})
export class PopMetricsInfoComponent implements OnInit {
  @Input() metrics: IHalsteadMetrics;
  metricsArray: any[][] = [];
  constructor() {}

  ngOnInit() {
    this.metricsArray = metricsObjectToArray(this.metrics).map((e) =>
      [e[0], myParseFloat(parseFloat(e[1]))]
    );
  }
}
