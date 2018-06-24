import { Component, Input, OnChanges, SimpleChange, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
	
import { NavController } from 'ionic-angular';
import * as scan from '../../../node_modules/cordova-plugin-document-scanner/www/scan.js';
import { CcPage } from '../cc/cc';
import { FormsModule } from "@angular/forms"; 
	
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

	imgSrc:string = "";
	imgSrcList = [];

	constructor(public navCtrl: NavController) {

	}

	ngOnInit(){

	}


	scanByCamera(){
		console.log("scan By Camera");
		//bind this
		scan.scanDoc(1, this.onSuccess.bind(this), this.onFail) ;
	}


	scanByCameraPromice(){
		console.log("scanByCameraPromice")
		//promise
		let newPromise = new Promise((resolve, reject) => {
				scan.scanDoc(1, resolve, this.onFail) 
		});
		return newPromise;
	}


	scanByCameraWithPromice(){
		console.log("scanByCameraWithPromice");
		this.scanByCameraPromice().then((data)=> {
		  // resolve
		  console.log(data);
		  this.imgSrc = String(data); 
		  this.imgSrcList.push({"src": String(data)})
		  console.log(this.imgSrcList);
		}).catch((err)=> {
		  // reject
		  console.log(err)
		});
	}


	onSuccess(imageURI) { 
		console.log("imageURI:" + imageURI);  
		this.imgSrc = String(imageURI);
		this.imgSrcList.push({"src": String(imageURI)});
		console.log(this.imgSrcList);
	}


	onFail(message) {
		alert('Failed because: ' + message);
	} 

}
