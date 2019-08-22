import { Component, OnInit, Input, OnChanges, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import * as d3 from 'd3';
import { IChinaData } from '../models/data.model';

@Component({
  selector: 'app-northkorea-chart',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './northkorea-chart.component.html',
  styleUrls: ['./northkorea-chart.component.scss']
})


export class NorthkoreaChartComponent implements OnInit, OnChanges {
  // @Input() barchartData: IVietnamData[];
  @ViewChild('barChart') private chartContainer: ElementRef;

  margin = { top: 20, right: 20, bottom: 50, left: 40 };
  // colors = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf',
  //             '#1f77b4', "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf",
  //             '#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd'];
  colors = d3.schemeCategory10;

  barchartData: IChinaData[];

  constructor() {
    this.barchartData = [
      {Year: '2000', Prisoners: 2435},
      {Year: '2001', Prisoners: 1000},
      {Year: '2002', Prisoners: 5540},
      {Year: '2003', Prisoners: 1350},
      {Year: '2004', Prisoners: 3530},
      {Year: '2005', Prisoners: 2435},
      {Year: '2006', Prisoners: 1000},
      {Year: '2007', Prisoners: 5540},
      {Year: '2008', Prisoners: 2330},
      {Year: '2009', Prisoners: 3530},
      {Year: '2010', Prisoners: 1000},
      {Year: '2011', Prisoners: 2330},
      {Year: '2012', Prisoners: 4540},
      {Year: '2013', Prisoners: 1236},
      {Year: '2014', Prisoners: 1230},
      {Year: '2015', Prisoners: 4349},
      {Year: '2016', Prisoners: 5555},
      {Year: '2017', Prisoners: 4034},
      {Year: '2018', Prisoners: 6125},
      {Year: '2019', Prisoners: 2043}
    ];
    }

  ngOnInit() {
    console.log(this.colors);
    console.log('data: ', this.barchartData);
    // Filter BilletCandidateCount = 0
    // this.barchartData = this.barchartData.filter(
    //   barchartData => barchartData.BilletCandidateCount !== 0);

    if (!this.barchartData) { return; }
    // this.createBarchart();
    this.createVerticalBarchart();
  }

  ngOnChanges(): void {
    
  }

// Vertical Bar Chart
private createVerticalBarchart(): void {
  d3.select('svg').remove();

  const element = this.chartContainer.nativeElement;
  const data = this.barchartData;

  d3.select(element).select('svg').remove();

  const svg = d3.select(element).append('svg')
    .attr('width', element.offsetWidth)
    .attr('height', element.offsetHeight);

  const contentWidth = element.offsetWidth - this.margin.left - this.margin.right;
  const contentHeight = element.offsetHeight - this.margin.top - this.margin.bottom;

  const tooltip = d3.select(element).append('div').attr('class', 'toolTip');

  const xScale = d3
    .scaleBand()
    .rangeRound([0, contentWidth])
    .padding(0.2)
    .domain(data.map(d => d.Year));

  const yScale = d3
    .scaleLinear()
    .rangeRound([contentHeight, 0]).nice()
    .domain([0, d3.max(data, d => d.Prisoners)]);

  const chart = svg.append('g')
    .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

  // xAxis
  const xAxis = svg.append('g')
    .attr('class', 'axis axis--x')
    .attr('transform', 'translate(' + this.margin.left + ',' + (contentHeight + this.margin.top) + ')')
    .call(d3.axisBottom(xScale))
    
    .append('text')
    // .attr('dy', '0.5em')
    // .attr('font-size', '1.5em')
    .attr('x', contentWidth - (this.margin.right / 2))
    .attr('y', this.margin.bottom / 2)
    .attr('text-anchor', 'middle')
    .text('Year')
    .attr('fill', 'black');

  // yAxis
  const yAxis = svg.append('g')
    .attr('class', 'axis axis--y')
    .attr('transform', 'translate(' + this.margin.left + ', ' + this.margin.top + ')')
    .call(d3.axisLeft(yScale).ticks(5))
    .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', 6)
    .attr('dy', '0.71em')
    // .attr('text-anchor', 'end')
    .attr('text-anchor', 'middle')
    .text('Prisoners of Conscience')
    .attr('fill', 'black');

  chart.selectAll('.bar')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', d => xScale(d.Year))
    .attr('y', contentHeight)
    .transition()
    .duration(800)
    .attr('y', d => yScale(d.Prisoners))
    .attr('width', xScale.bandwidth())
    .attr('height', d => contentHeight - yScale(d.Prisoners))
    .attr('fill', (d, i) => this.colors[i]);

  chart.selectAll('.bar')
    .data(data)
    .on('mousemove', function(d) {
      tooltip
        .style('left', d3.event.pageX - 50 + 'px')
        .style('top', d3.event.pageY - 70 + 'px')
        .style('display', 'inline-block')
        .html('Year:  ' + (d.Year) + '<hr/>' + 'Prisoners of Conscience: ' + (d.Prisoners));
        })
    .on('mouseout', function(d) { tooltip.style('display', 'none'); } )
    .on('click', d => {
        console.log('clicked BilletId ', d.Year);
      });
  // Display Text on each bar charts
    chart.selectAll('.text')
        .data(data)
        .enter()
        .append('text')
        .attr('class', 'text')
        // .text(d => d.Candidates)
        .attr('x', (a) => xScale(a.Year) + xScale.bandwidth() / 2)
        .attr('y', (a) => yScale(a.Prisoners) - 3)
        .attr('text-anchor', 'middle')
        .text((a) => `${a.Prisoners}`);

}

onResize(e) {
  this.createVerticalBarchart();
  // this.createBarchart();
}

}

