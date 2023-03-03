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


  constructor(private manualResultService: ManualResultService) {

    this.manualResultForm = new FormGroup({
      drawMasterId: new FormControl(null, [Validators.required]),
      rankId: new FormControl(null, [Validators.required]),
      value: new FormControl(null, [Validators.required]),
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
    this.manualResultService.saveManualResult(this.manualResultForm.value).subscribe((response) => {
      if(response.success == 1){
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Saved',
          showConfirmButton: false,
          timer: 2000
        });
        this.manualResultForm.reset();
      }
    });
  }

}
