import { Component } from '@angular/core';
import {ManualResultService} from "../../services/manual-result.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  firstprize : any;
  secondprize : any;
  thirdPrize : any;
  forthPrize : any;
  fifthPrize : any;
  sixthPrize : any;

  drawTimes: any[] = [];
  manualResult: any[] = [];
  rank : any[] = [];

  columnNumber =10;

  constructor(private manualResultService: ManualResultService) {
    this.manualResultService.getDrawTimeListener().subscribe((response) => {
      this.drawTimes = response;
    });
  }

  ngOnInit(): void {
    this.manualResultService.getManualResultistener().subscribe((response) => {
      this.manualResult = response;
    });

    this.manualResultService.getRankListener().subscribe((response) => {
      this.rank = response;
    });
  }

  getManualResult(drawId: any){
    this.manualResultService.getManualResult(drawId).subscribe(() => {});

  }

}
