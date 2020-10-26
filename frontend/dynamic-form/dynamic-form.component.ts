import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, ReactiveFormsModule , Validators } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { formServices } from '../forms.service';
import { userServices } from '../user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {
  winnerForm: FormGroup;
  recFile: File = null;
  uploadedFile;
  subWinnerForm: FormGroup;
  fileName;
  fields = 1;
  formJson = [];
  element = {
    "type": String,
    "name": String,
    "val": []
  };
  returnedVal = [];
  constructor(private fb: FormBuilder, private forms: formServices, private _userServices: userServices, private _router: Router) {

    this._userServices.isActive().subscribe(
      data => { },
      error => this._router.navigate(['/signin']),
    );
    this.winnerForm = this.fb.group({
      competitionName: ['' , Validators.required],
      file: ['',Validators.required],
    });
    this.subWinnerForm = this.fb.group({
      types: this.fb.array([]),
      values: this.fb.array([]),
      labels: this.fb.array([])
    });
  }
  extraLabel = "";
  Labels = [];
  ngOnInit() {
    window.document.body.style.backgroundColor = "black";
  }
  get labels() {
    return this.subWinnerForm.get("labels") as FormArray;
  }
  get types() {
    return this.subWinnerForm.get('types') as FormArray;
  }
  get values() {
    return this.subWinnerForm.get('values') as FormArray;
  }
  get competition() {
    return this.winnerForm.get('competitionName') as FormArray;
  }
  get file() {
    return this.winnerForm.get('file') as FormArray;
  }

  addAlias() {
    this.fields == 0
    this.values.push(this.fb.control(''));
    this.types.push(this.fb.control(''));
    this.labels.push(this.fb.control(''));
  }

  bannerObj(event) {
    this.recFile = <File>event.target.files[0];
    const file = event.target.files[0];
    this.uploadedFile = file;
  

  }
  onSubmit() {
    const fileObj = new FormData();
    fileObj.append('file', this.uploadedFile);
    var dynamicFeildsValues = this.values.value;
    var dynamicFeildsTypes = this.types.value;
    var dynamicFeildsLabels = this.labels.value;
    if (this.types.invalid || this.labels.invalid)
    {
      console.log("here")
    }
    for (var i = 0; i < dynamicFeildsTypes.length; i++) {
      this.returnedVal = dynamicFeildsValues[i].split(",")
      this.element = {
        "type": dynamicFeildsTypes[i],
        "name": dynamicFeildsLabels[i],
        "val": this.returnedVal
      };
      this.formJson.push(this.element);
    }
    
    var cName = this.competition.value;
    this.forms.submitTemplateForm(fileObj);
    this.forms.submitDataForm(this.formJson, cName, this.uploadedFile.name);
  }

}
