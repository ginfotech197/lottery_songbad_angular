import { Component } from '@angular/core';
import {ManualResultService} from "../../services/manual-result.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  drawTimes: any[] = [];

  constructor(private manualResultService: ManualResultService) {
    this.manualResultService.getDrawTimeListener().subscribe((response) => {
      this.drawTimes = response;
    });
  }

  getManualResult(drawId: any){
    this.manualResultService.getManualResult(drawId);
  }

}
