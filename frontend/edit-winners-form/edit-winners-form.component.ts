import { Component, OnInit } from '@angular/core';
import { formServices } from '../forms.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms';
import { FormGroup, FormArray, FormBuilder, ReactiveFormsModule , Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-winners-form',
  templateUrl: './edit-winners-form.component.html',
  styleUrls: ['./edit-winners-form.component.css']
})
export class EditWinnersFormComponent implements OnInit {
  subWinnerForm: FormGroup;
  routeParam: Params;
  formTemplate;
  extraField;
  competionName;
  fields = 1;
  formJson = [];
  reqObj ={
    templateId:"",
    extraField:[],
  }
  element = {
    "type": String,
    "name": String,
    "val": []
  };
  returnedVal = [];
  formId;
  constructor(private _formServices: formServices, private _route: ActivatedRoute, private _router: Router,private fb: FormBuilder,) {
    this.getRouteParams();
    this.subWinnerForm = this.fb.group({
      types: this.fb.array([]),
      values: this.fb.array([]),
      labels: this.fb.array([])
    });
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
  ngOnInit(): void {
      window.document.body.style.backgroundColor = "black";
      this._formServices.getFormTemplate(this.routeParam).subscribe(
        data => {
          this.formTemplate = data;
          this.formId = this.formTemplate._id;
          this.extraField = this.formTemplate.extraField;
          this.competionName = this.formTemplate.competionName;
          for(let j=0;j<this.formTemplate.extraField.length;j++)
          this.formJson.push(this.formTemplate.extraField[j]);
        },
        error => {
          console.log(error);
          this._router.navigate(['**']);
        }
      )
    }
  getRouteParams() {

    this._route.params.subscribe(params => {
      return this.routeParam = params.id;
    });
  }
  addAlias() {
    this.fields == 0
    this.values.push(this.fb.control(''));
    this.types.push(this.fb.control(''));
    this.labels.push(this.fb.control(''));
  }
onSubmit(form: NgForm) {
    var formData;
    var dynamicFeildsValues = this.values.value;
    var dynamicFeildsTypes = this.types.value;
    var dynamicFeildsLabels = this.labels.value;
    for (let i = 0; i < dynamicFeildsTypes.length; i++) {
      this.returnedVal = dynamicFeildsValues[i].split(",")
      this.element = {
        "type": dynamicFeildsTypes[i],
        "name": dynamicFeildsLabels[i],
        "val": this.returnedVal
      };
      this.formJson.push(this.element);
    }
    formData = form.value;
    let s = 0;
    for (var dataElement in formData) {
      if (formData[dataElement] !== "") {
        if (new RegExp('^[0-9]*$').test(dataElement)) {
          this.returnedVal = formData[dataElement].split(",")
          this.formJson[dataElement].val = this.returnedVal;
        }
        else {
          if (this.formJson[s])
            this.formJson[s].name = formData[dataElement]
          s++;
        }
      }
    }
    this.reqObj.templateId = this.formId;
    this.reqObj.extraField = this.formJson;
    this._formServices.updateFormTemplate(this.reqObj);
  }
}
