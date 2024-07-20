import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface ApiData {
  id: number;
  name: string;
  data: string; // Adjust the type based on the actual structure of your data field
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  rows: ApiData[] = [];
  filteredData: ApiData[] = [];
  columns = [
    { prop: 'id', name: 'ID' },
    { prop: 'userId', name: 'User ID' },
    { prop: 'title', name: 'Title' },
    { prop: 'completed', name: 'Completed' }
  ];
  filters: { [key: string]: string } = {};

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('https://jsonplaceholder.typicode.com/todos')
      .subscribe((data: any) => {
        this.rows = data;
        this.filteredData = [...this.rows];
      });
  }

  updateFilter(event: any, prop: string) {
    const val = event.target.value.toLowerCase();

    this.filters[prop] = val;

    this.filteredData = this.rows.filter((item: any) => {
      for (const key in this.filters) {
        if (this.filters[key] && item[key].toString().toLowerCase().indexOf(this.filters[key]) === -1) {
          return false;
        }
      }
      return true;
    });
  }
}