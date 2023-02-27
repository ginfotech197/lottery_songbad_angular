import { Component } from '@angular/core';
import {FormGroup, Validators, FormControl} from "@angular/forms";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manual-result',
  templateUrl: './manual-result.component.html',
  styleUrls: ['./manual-result.component.scss']
})
export class ManualResultComponent {

  manualResultActive = false;


  highSecurityPassword: FormGroup;


  constructor() {
    this.highSecurityPassword = new FormGroup({
      password: new FormControl(null, [Validators.required]),
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

}
