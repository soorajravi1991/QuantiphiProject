import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient , HttpHeaders , HttpParams } from '@angular/common/http';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import * as _ from 'lodash';

@Component({
  	selector: 'app-dashboard',
  	templateUrl: './dashboard.component.html',
  	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
	barChartDataReady 	= false;
	pieChartDataReady 	= false;


	orderStatusFilter 	= '1';
	sellerName 	= '';
	today = new Date();
	fromDateFilter 	= 	{ 
							day: this.today.getUTCDay(), 
							month: this.today.getUTCMonth() - 1, 
							year: this.today.getUTCFullYear()
						};
	toDateFilter 		= { 
								day: this.today.getUTCDay(), 
								month: this.today.getUTCMonth(), 
								year: this.today.getUTCFullYear()
						};
	public donutColors=[ { backgroundColor: [ 'rgba(110, 114, 20, 1)', 'rgba(118, 183, 172, 1)', 'rgba(0, 148, 97, 1)', 'rgba(129, 78, 40, 1)', 'rgba(129, 199, 111, 1)','rgba(135,206,250,1)','rgba(106,90,205,1)','rgba(148,159,177,1)' ] } ];
	
	public pieChartColors: Array < any > = [{
   backgroundColor: ['red', 'yellow', 'rgba(148,159,177,0.2)'],
   borderColor: ['rgba(135,206,250,1)', 'rgba(106,90,205,1)', 'rgba(148,159,177,1)']
}];

	public pieChartOptions: ChartOptions = {
		responsive: true,
	};
	public pieChartLabels: Label[] = [];
	public pieChartData = [];
	public pieChartType: ChartType = 'pie';
	public pieChartLegend = true;
	public pieChartPlugins = [];


	public barChartOptions: ChartOptions = {
		responsive: true,
	};
	public barChartLabels: Label[] = [];
	public barChartType: ChartType = 'bar';
	public barChartLegend = true;
	public barChartPlugins = [];

	public barChartData = [];
	constructor(private http: HttpClient, public ngbDateParserFormatter:NgbDateParserFormatter ) { }

	ngOnInit() {
		this.getProductData();
	// this.getCategoryData();
		this.getOrderData();
	}


	getProductData () {
		
		this.http.get<any>(environment.baseUrl + '/products')
		.subscribe(
				res => {  
				
					this.barChartData = [{data:[], label: 'products'}];
					this.barChartLabels = [];
					_.each(res.products, (product) => {
						this.barChartLabels.push(product.name);
						this.barChartData[0].data.push(product.sold);
			
					});
					this.barChartDataReady = true;		      
			},
			err => {
				console.log(err);

			}

		) 
	}

	getCategoryData () {
		
		
		this.http.get<any>(environment.baseUrl + '/categories')
		.subscribe(
			res => {  
				console.log(res);
			},
			err => {
				console.log(err);
			}

		) 
	}

	getOrderData () {
		let httpOptions = {};		
		
		

		var params = new HttpParams().set("status", this.orderStatusFilter);
		params = params.append("to_date", this.ngbDateToString(this.toDateFilter));
		params = params.append("from_date", this.ngbDateToString(this.fromDateFilter));
		params = params.append("name", this.sellerName);

		httpOptions['params'] = params;
		this.http.get<any>(environment.baseUrl + '/orders',httpOptions)
		.subscribe(
			res => {  			      
				this.pieChartData = [];
				this.pieChartLabels = [];
				this.pieChartLabels = [];
				_.each(res.orders, (sellerOrders) => {
					this.pieChartLabels.push(sellerOrders.seller_name);
					this.pieChartData.push(sellerOrders.revenue);				
				});
				this.pieChartDataReady = true;
			},
			err => {
				console.log(err);

			}
		) 
	}

	ngbDateToString(date) {	
		return this.ngbDateParserFormatter.format(date) + ' 00:00:00';
	}

}
