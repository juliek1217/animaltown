var console = require('console')
var http = require('http')
var shelter = require('./shelter.js')

printData();

//exports.printData = printData;
function printData() {
  var apiResultArr = [];
  var itemArr = [];
  var coords;
  var item;

  apiUrl = "http://openapi.animal.go.kr/openapi/service/rest/animalShelterSrvc/shelterInfo?serviceKey=1ue1B%2F%2BAyZt6YT5FD9QwHPsG%2BIAXeOU0zhlXlNKevbrnJPbJ81zInGB0jcGQ2QJWfqdHMsZUudy4fPjX0%2F1flQ%3D%3D&&numOfRows=1000";
  apiResultArr = http.getUrl(apiUrl,{format: 'xmljs'});
  totalItems = parseInt(apiResultArr.response.body.totalCount);

  //pageSize = parseInt(apiResultFirstPage.response.page.total); // number of pages
  // pageNumItem = 1000;
  // apiEndPoint = 'http://api.vworld.kr/req/search?';
  // apiQuery = 'service=search&request=search&version=2.0&query=동물병원&type=place&format=json&errorformat=json&size=1000&page=';
  // apiPage = '1';
  // apiKey = '&key=4D2E35C8-796B-3DBA-BA2F-86F820A0CB43';
  // apiUrl = apiEndPoint + apiQuery + apiPage + apiKey;
  // apiResultFirstPage = http.getUrl(apiUrl,{format: 'json'});
  // totalItems = parseInt(apiResultFirstPage.response.record.total);
  // pageSize = parseInt(apiResultFirstPage.response.page.total); // number of pages
// const fs = require('fs')
//   let data = "Learning how to write in a file."
//   // Write data in 'Output.txt' .
//   fs.writeFile('Output.txt', data, (err) => {
//     // In case of a error throw err.
//     if (err) throw err;
//   })
//console.log(apiResultArr.response.body.items.legnth)
  for (var i = 0; i < totalItems; i++) {
      item = createItemArr(shelter.item, apiResultArr.response.body.items.item[i]);
      itemArr.push(item);
  }

  for (var i = 0; i < totalItems; i++) {
        console.log("{");
        console.log("\"index\": \""+ i+"\",");
        console.log("\"careNm\": \""+ itemArr[i].careNm+"\",");
        console.log("\"careTel\": "+ itemArr[i].careTel+",");
        console.log("\"closeDay\": "+ itemArr[i].closeDay+",");
        console.log("\"dataStdDt\": "+ itemArr[i].dataStdDt+",");
        console.log("\"divisionNm\": "+ itemArr[i].divisionNm+",");
        console.log("\"dsignationDate\": "+ itemArr[i].dsignationDate+",");
        console.log("\"careAddr\": \""+ itemArr[i].careAddr+"\",");
        console.log("\"jibunAddr\": \""+ itemArr[i].jibunAddr+"\",");
        console.log("\"lng\": "+ itemArr[i].lng+",");
        console.log("\"lat\": "+ itemArr[i].lat+",");
        console.log("\"saveTrgtAnimal\": "+ itemArr[i].saveTrgtAnimal+",");
        console.log("\"orgNm\": "+ itemArr[i].orgNm+",");
        console.log("\"rnum\": "+ itemArr[i].rnum+",");
        console.log("\"specsPersonCnt\": "+ itemArr[i].specsPersonCnt+",");
        console.log("\"weekCellEtime\": "+ itemArr[i].weekCellEtime+",");
        console.log("\"weekCellStime\": "+ itemArr[i].weekCellStime+",");
        console.log("\"weekOprEtime\": "+ itemArr[i].weekOprEtime+",");
        console.log("\"weekOprStime\": "+ itemArr[i].weekOprStime +",");
        console.log("\"weekendCellEtime\": "+ itemArr[i].weekendCellEtime+",");
        console.log("\"weekendCellStime\": "+ itemArr[i].weekendCellStime+",");
        console.log("\"weekendOprEtime\": "+ itemArr[i].weekendOprEtime+",");
        console.log("\"weekendOprStime\": "+ itemArr[i].weekendOprStime+",");
        console.log("},");
  }
}



/*
createItemArr
*/
function createItemArr(jsonArray, item){
  var coords;
  var item;
  var addr, addrOld;
  var data;

  if(item.lat && item.lng){ coords = { longitude: item.lng, latitude: item.lat } }
  if(item.careAddr){ 
      addr = item.careAddr; 
  if(addr.includes("(")) {
      addr = item.careAddr.substring(0, parseInt(item.careAddr.indexOf('(')))
      addr.trim();
      }
  }
  for (var i = 0; i < jsonArray.length && data == null; i++) {

      //if(jsonArray[i].name == item.careNm && jsonArray[i].address.includes(item.careAddr)){
        if(jsonArray[i].address.includes(addr)){
        if(coords == null) { coords = { longitude: jsonArray[i].lng, latitude: jsonArray[i].lat }}
        //console.log(item.careAddr)
        data = {
        lat: coords.longitude, 
        lng: coords.latitude, 
        careAddr: item.careAddr,
        careNm: item.careNm, 
        careTel: item.careTel,
        closeDay: item.closeDay,
        dataStdDt: item.dataStdDt, 
        divisionNm: item.divisionNm, 
        dsignationDate: item.dsignationDate, 
        jibunAddr: item.jibunAddr, 
        orgNm: item.orgNm, 
        rnum: item.rnum, 
        saveTrgtAnimal: item.saveTrgtAnimal, 
        specsPersonCnt: item.specsPersonCnt, 
        weekCellEtime: item.weekCellEtime, 
        weekCellStime: item.weekCellStime, 
        weekOprEtime: item.weekOprEtime, 
        weekOprStime: item.weekOprStime, 
        weekendCellEtime: item.weekendCellEtime, 
        weekendCellStime: item.weekendCellStime, 
        weekendOprEtime: item.weekendOprEtime, 
        weekendOprStime: item.weekendOprStime, 
        }
      }
    
    // var geoCodeUrl = "http://api.vworld.kr/req/address?service=address&request=getCoord"
    // var requestParam = "&refine=true&simple=false&format=xml&type=road&address="
    // var vworldKey = "&key=4D2E35C8-796B-3DBA-BA2F-86F820A0CB43";
    // if(item.careAddr){ 
    //   addr = item.careAddr; 
    //     if(addr.includes("(")) {
    //   addr = item.careAddr.substring(0, parseInt(item.careAddr.indexOf('(')))
    //   addr.trim();
    //   }
    // }
    // if(item.jibunAddr){ 
    //   addrOld = item.jibunAddr;
    //   if(addrOld.includes("(지번) ")){
    //   addrOld = addrOld.replace("(지번) ", "")
    // }
    // }
    
    // if(addr) {
    //   var url = geoCodeUrl+requestParam+addr.toString()+vworldKey;
    //   var getCoords = http.getUrl(url,{format: 'xmljs'});
    //   if(getCoords.response.result){
    //     coords = { longitude: getCoords.response.result.point.x, latitude: getCoords.response.result.point.y }
    //   }
    //   else{
    //     requestParam = "&refine=true&simple=false&format=xml&type=parcel&address="
    //     var url = geoCodeUrl+requestParam+addr.toString()+vworldKey;
    //     var getCoords = http.getUrl(url,{format: 'xmljs'});
    //     if(getCoords.response.result) {
    //       coords = { longitude: getCoords.response.result.point.x, latitude: getCoords.response.result.point.y }
    //     }
    //     else {
    //       coords = { longitude: undefined, latitude: undefined }
    //     }
    //  }
    // }
    // else if(addrOld && coords.longitude == undefined ){
    //   var url = geoCodeUrl+requestParam+addrOld.toString()+vworldKey;
    //   var getCoords = http.getUrl(url,{format: 'xmljs'});
    //   if(getCoords.response.result){
    //     coords = { longitude: getCoords.response.result.point.x, latitude: getCoords.response.result.point.y }
    //   }
    //   else{
    //     requestParam = "&refine=true&simple=false&format=xml&type=parcel&address="
    //     var url = geoCodeUrl+requestParam+addrOld.toString()+vworldKey;
    //     var getCoords = http.getUrl(url,{format: 'xmljs'});
    //     if(getCoords.response.result) {
    //       coords = { longitude: getCoords.response.result.point.x, latitude: getCoords.response.result.point.y }
    //     }
    //     else {
    //        coords = { longitude: undefined, latitude: undefined }
    //     }
    //   }
    // }
  }



  return data;
}


