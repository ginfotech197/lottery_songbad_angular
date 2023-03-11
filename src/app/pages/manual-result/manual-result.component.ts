import { Component } from '@angular/core';
import {FormGroup, Validators, FormControl} from "@angular/forms";
import Swal from 'sweetalert2';
import {ManualResultService} from "../../services/manual-result.service";

@Component({
  selector: 'app-manual-result',
  templateUrl: './manual-result.component.html',
  styleUrls: ['./manual-result.component.scss']
})
export class ManualResultComponent {

  manualResultActive = false;
  manualResultForm: FormGroup;
  rankForm: FormGroup;

  highSecurityPassword: FormGroup;

  drawTimes: any[] = [];
  ranks: any[] = [];

  prizeValueInputArray: any[] = [];

  numberOfItems: any[] = [];;
  column = 4;
  values = null;

  innerWidth : number;


  constructor(private manualResultService: ManualResultService) {

    this.innerWidth = window.innerWidth;

    this.manualResultForm = new FormGroup({
      drawMasterId: new FormControl(null, [Validators.required]),
      rankId: new FormControl(null, [Validators.required]),
      items: new FormControl(null, [Validators.required]),
      values: new FormControl(null, [Validators.required]),
    });

    this.rankForm = new FormGroup({
      id: new FormControl(null, [Validators.required]),
      prize: new FormControl(null, [Validators.required]),
    });

    this.highSecurityPassword = new FormGroup({
      password: new FormControl(null, [Validators.required]),
    });

    this.manualResultService.getDrawTimeListener().subscribe((response) => {
      this.drawTimes = response;
    });

    this.manualResultService.getRankListener().subscribe((response) => {
      this.ranks = response;
    })

  }

  initializeArrayLength(){
    this.numberOfItems.length = this.manualResultForm.value.items;
  }

  createArray(indexCol: number,indexRow: number,value: any){
    const index = parseInt(String(parseInt(String(indexCol)) * this.column)) + parseInt(String(indexRow));
    // console.log('indexCol ' + 'indexRow :  ' + (parseInt(String(parseInt(String(indexCol)) * this.column)) + parseInt(String(indexRow))));
    // console.log(this.prizeValueInputArray);

    // return;
    if(this.manualResultForm.value.drawMasterId == null){
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Please select draw time',
        showConfirmButton: false,
        timer: 2000
      });
    }
    if(this.manualResultForm.value.rankId == null){
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Please select rank',
        showConfirmButton: false,
        timer: 2000
      });
    }

    // console.log(this.prizeValueInputArray[index]);
    // if(value.value == ""){
    //   this.prizeValueInputArray.splice(index,1);
    //   return;
    // }

    const findSameIndex = this.prizeValueInputArray.findIndex(x => x.value === value.value)
    if(findSameIndex != -1){
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Number Already Exists',
        showConfirmButton: false,
        timer: 2000
      });
      value.value = null;
      return;
    }else{
      let x = {
        'drawMasterId': this.manualResultForm.value.drawMasterId,
        'rankId' : this.manualResultForm.value.rankId,
        'value' : value.value
      }
      this.prizeValueInputArray.push(x);
    }

    // if(this.prizeValueInputArray[index]){
    //   let x = {
    //     'drawMasterId': this.manualResultForm.value.drawMasterId,
    //     'rankId' : this.manualResultForm.value.rankId,
    //     'value' : value.value
    //   }
    //   this.prizeValueInputArray[index] = x;
    //   return;
    // }
  }

  updateRank(){
    this.manualResultService.updateRank(this.rankForm.value).subscribe((response) => {
      if(response.success == 1){
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Updated',
          showConfirmButton: false,
          timer: 2000
        });
        this.rankForm.reset();
      }

    });

  }


  validatePassword(){
    if(this.highSecurityPassword.value.password == '1234@admin'){
      this.manualResultActive = true;
    }else{
      Swal.fire({
        position: 'top-end',
        icon: 'info',
        title: 'Invalid Password',
        showConfirmButton: false,
        timer: 2000
      });
      this.highSecurityPassword.reset();
    }

  }

  saveManualResult(){

    if(this.manualResultForm.value.items != this.prizeValueInputArray.length){
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Enter correct number of items',
        showConfirmButton: false,
        timer: 2000
      });
      console.log(this.prizeValueInputArray);
      console.log(this.prizeValueInputArray.length);
      console.log(this.manualResultForm.value.items);
      return;
    }

    this.manualResultService.saveManualResult(this.prizeValueInputArray).subscribe((response) => {
      if(response.success == 1){
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Saved',
          showConfirmButton: false,
          timer: 2000
        });
        this.manualResultForm.reset();
        // @ts-ignore
        this.prizeValueInputArray = [];
        this.numberOfItems.length = 0;

      }
    });
  }

}
