import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CountryService } from '../../../../core/services/country.service';
import { AppState } from '../../../../app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-country-view',
  templateUrl: './country-view.component.html',
  styleUrls: ['./country-view.component.scss']
})
export class CountryViewComponent implements OnInit,OnDestroy {
  countries:any[]=[];
  subscriptionCountries:Subscription=null;
  datafake:any[]=[];
  constructor(private _countryService:CountryService,private store:Store<AppState>) { }

  ngOnInit(): void {
    this.store.select('search').subscribe((data:{search:string})=>{
      this._countryService.getCountry(data.search).subscribe((resp)=>{
        console.log(resp);
        this.countries=resp;
        //no da la respuesta esparada por el API usado
      },
      (error)=>{
        console.log(error.message);
        this.countries=this.datafake;
      }
      );
    })
    this.subscriptionCountries=this._countryService.getContries().subscribe((data)=>{
      console.log(data);
      this.countries=data;
      this.datafake=data;
    });
  }

  ngOnDestroy(): void {
    this.subscriptionCountries.unsubscribe();
  }

}
