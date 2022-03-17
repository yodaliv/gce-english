import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { GRADIENT_COLORS, SCORE_VALUE } from 'src/app/exam-play/score-modal/score-modal.modal';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss'],
})
export class DoughnutChartComponent implements AfterViewInit {

  @ViewChild('doughnutCanvas') doughnutCanvas;

  @Input() score = 0;
  @Input() fontSize = '15px';
  private doughnutChart: Chart;
  public successScore = 0;

  constructor() { }

  ngAfterViewInit() {
    this.createDoughnutChart();
  }

  private createDoughnutChart() {
    if (!this.doughnutCanvas.nativeElement) {
      return;
    }
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        datasets: [
          {
            label: 'Score',
            data: [this.score, 100 - this.score],
            backgroundColor: [
              this.getColor(this.score),
              '#faf9fe'
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        cutoutPercentage: 70,
      }
    });
  }

  // Get color based on score value
  private getColor(score) {
    let ctx: any = document.getElementById('doughnutCanvas');
    ctx = ctx.getContext('2d');
    const gradientStroke = ctx.createLinearGradient(500, 0, 0, 0);
    let startColor = '';
    let endColor = '';
    if (score < SCORE_VALUE.low) {
      startColor = GRADIENT_COLORS.low.start;
      endColor = GRADIENT_COLORS.low.end;
    } else if (score < SCORE_VALUE.average) {
      startColor = GRADIENT_COLORS.average.start;
      endColor = GRADIENT_COLORS.average.end;
    } else {
      startColor = GRADIENT_COLORS.high.start;
      endColor = GRADIENT_COLORS.high.end;
    }
    gradientStroke.addColorStop(0, startColor);
    gradientStroke.addColorStop(1, endColor);
    return gradientStroke;
  }

}
