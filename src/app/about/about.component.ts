import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';
import { GraphqlProductsService} from '../graphql.products.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  goals:Array<any>=[];
  loading: boolean = true;
  private querySubscription: Subscription = new Subscription;

  constructor( private route: ActivatedRoute, private router:Router, private _data:DataService,private graphqlProductsService: GraphqlProductsService) {
    this.route.params.subscribe(res => console.log(res.id));
   }

  ngOnInit(): void {
    //this._data.goal.subscribe((res: string[]) => this.goals=res);
    this.querySubscription = this.graphqlProductsService.links("-")
    .valueChanges
    .subscribe(({ data, loading }) => {
      this.loading = loading;
      this.goals = JSON.parse(JSON.stringify(data)).links;
      console.log(JSON.stringify(this.goals))
    });
  }

  sendmeHome(){
    this.router.navigate(['']);
  }

}
