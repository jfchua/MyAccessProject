import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.css']
})
export class Page2Component implements OnInit {
  private data: String;
  constructor() { 
  
  }
  
  
  
  
  ngOnInit() {
	
  }
  fileupload(files: FileList) {
	console.log("entered");
	
	if (files && files.length > 0) {
	
      let file: File = files.item(0);
      let fileReader: FileReader = new FileReader();
      fileReader.readAsText(file);
      fileReader.onload = ev => {
        let csvdata = fileReader.result.toString();
		//this.csv = fileReader.result;
        let body = {data:csvdata};
		//console.log("fileResult.result : "+ fileReader.result);
        console.log(JSON.stringify(csvdata));
		//return this.http.post('apiurl',body).subscribe((data:any)=>console.log(JSON.stringify(data.json)));
      };
    }
  }
  
  
  
  checkEvent(files: FileList){
	console.log(files.item(0));
	//event.preventDefault();
		if (files && files.length > 0) {
	
		  let file: File = files.item(0);
		  let fileReader: FileReader = new FileReader();
		  fileReader.readAsText(file);
		  
		  data: String;
		  fileReader.onload = ev => {
			this.data = fileReader.result.toString();
			console.log(this.data);
		  }
	    } 
  }
  
  download = this.data;
  downloadFile(download) {
    const replacer = (key, value) => value === null ? '' : value; // specify how you want to handle null values here
    const header = Object.keys(download[0]);
    let csv = download.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.join(','));
    let csvArray = csv.join('\r\n');

    var blob = new Blob([csvArray], {type: 'text/csv' })
    saveAs(blob, "myFile.csv");
  }
  
  private excelData;
  
  willDownload = false;
  
  onFileChange(ev) {
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      const dataString = JSON.stringify(jsonData);
	  excelData
      document.getElementById('output').innerHTML = dataString.slice(0, 300).concat("...");
      this.setDownload(dataString);
    }
    reader.readAsBinaryString(file);
  }


  setDownload(data) {
    this.willDownload = true;
    setTimeout(() => {
      const el = document.querySelector("#download");
      el.setAttribute("href", `data:text/json;charset=utf-8,${encodeURIComponent(data)}`);
      el.setAttribute("download", 'xlsxtojson.json');
    }, 1000)
  }
  
  saveToDB(){
  
  }
  
  

  
  
  
}
