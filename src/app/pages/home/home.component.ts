import {Component, ElementRef, ViewChild} from '@angular/core';
import {ManualResultService} from "../../services/manual-result.service";
//import { jsPDF, RGBAData} from "jspdf";
// @ts-ignore
import domToImage from 'dom-to-image';
require('dom-to-image');
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  // @ts-ignore
  @ViewChild('dataToExport', {static: false}) public dataToExport: ElementRef ;


  firstPrizeResult: any;
  secondPrizeResult: any;
  thirdPrizeResult: any;
  forthPrizeResult: any;
  fifthPrizeResult: any;
  sixthPrizeResult: any;


  drawTimes: any[] = [];
  manualResult: any[] = [];
  rank: any[] = [];

  showManualResult = false;

  columnNumber = 10;

  constructor(private manualResultService: ManualResultService) {
    this.manualResultService.getDrawTimeListener().subscribe((response) => {
      this.drawTimes = response;
    });
  }

  ngOnInit(): void {
    this.manualResultService.getManualResultistener().subscribe((response) => {
      this.manualResult = response;
      this.firstPrizeResult = this.manualResult.filter(x => x.rank_id == 1);
      this.secondPrizeResult = this.manualResult.filter(x => x.rank_id == 2);
      this.thirdPrizeResult = this.manualResult.filter(x => x.rank_id == 3);
      this.forthPrizeResult = this.manualResult.filter(x => x.rank_id == 4);
      this.fifthPrizeResult = this.manualResult.filter(x => x.rank_id == 5);
      this.sixthPrizeResult = this.manualResult.filter(x => x.rank_id == 6);
      // console.log(x);
    });

    this.manualResultService.getRankListener().subscribe((response) => {
      this.rank = response;
    });
  }

  getManualResult(drawId: any) {
    this.manualResultService.getManualResult(drawId).subscribe((response) => {
      if (response.success == 1) {
        this.showManualResult = true;
      }
    });

  }

  goToHome() {
    this.showManualResult = false;
  }

  downloadPdf(): void {
    // let doc = new jsPDF();
    // doc.html("obrz");
    // // doc.addHTML(document.getElementById("obrz"), function() {
    // //   doc.save("obrz.pdf");
    // // });
    // doc.save('tes');

    // @ts-ignore
    const printContents = document.getElementById('obrz').innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;

    //   const doc = new jsPDF();
    //   // doc.addHTML(document.getElementById("obrz"), function() {
    //   //   doc.save("obrz.pdf");
    //   // });
    //   // @ts-ignore
    //   doc.html(this.content.nativeElement, function() {
    //     doc.save("obrz.pdf");
    //   });
    //   console.log(doc);

  }

}
