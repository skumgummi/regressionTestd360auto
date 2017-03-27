var ancillariesPage = function(){

  var helperFunctions = require('../helpers/helperFunctions.js');

  this.shoppingCartButton = element(by.css('button[ng-click="$parent.moveToPaymentFromExtras()"]'));

  this.airplaneType = element(by.xpath('//*[@id="segment-container"]/div[5]/ng-include/div/div/div/div/div/div[2]/div/div/div[1]/p/b'));

  //this.selectSeatButton = element(by.css('img[src="images/seat-img.jpg"]'));
  this.selectSeatButton = element(by.css('li[ng-click="selectSeat()"]'));
  this.selectSeat1 = element(by.xpath('//*[@id="segment-container"]/div[2]/ul/li[1]/a'));
  this.selectSeat2 = element(by.xpath('//*[@id="segment-container"]/div[2]/ul/li[2]/a'));
  this.selectSeat3 = element(by.xpath('//*[@id="segment-container"]/div[2]/ul/li[3]/a'));
  this.selectSeat4 = element(by.xpath('//*[@id="segment-container"]/div[2]/ul/li[4]/a'));
  this.selectSeat5 = element(by.xpath('//*[@id="segment-container"]/div[2]/ul/li[5]/a'));
  this.selectSeat6 = element(by.xpath('//*[@id="segment-container"]/div[2]/ul/li[6]/a'));
  //this.seatAddToBooking = element(by.xpath('//*[@id="cep-widget"]/div/div[1]/div[1]/div/div[1]/div[3]/button'));
  this.seatAddToBooking = element(by.css('.extraCartContainer')).element(by.css('.btn.btn-primary.confirmBooking'));

  this.forgotSeatOkay = element(by.xpath('//*[@id="cep-widget"]/div[1]/div[2]/div[2]/div[2]/button'));
  var noSeatAvailable = element(by.binding('translation["ancillarySeatMap.noseatavailabletext"]'));
  var seatOccupied = element(by.css('span.seat-icon.seatOccupied.icon-cancel'));
  var backButton = element(by.css('.icon-left-open'));

  this.selectBagsButton = element(by.css('img[src="images/bag-img.jpg"]'));
  this.addBaggageOutbound = element(by.id('add_0_0'));
  this.removeBaggageOutbound = element(by.id('remove_0_0'));
  this.addBaggageReturn = element(by.id('add_0_1'));
  this.removeBaggageReturn = element(by.id('remove_0_1'));
  this.bagAddToBooking = element(by.binding('translation["ancillaryxbags.addToBooking"]'));
  this.freeBaggageInfo = element(by.binding('translation["ancillaryxbags.freeBaggageInfo"]'));
  this.bagCancelButton = element(by.binding('translation["ancillaryxbags.cancel"]'));

  this.addMealButton = element(by.css('img[alt="Select Meal"]'));
  this.selectMealOutbound = element(by.xpath('//*[@id="segment-container"]/div[2]/ul/li[1]/a'));
  this.selectMealReturn = element(by.xpath('//*[@id="segment-container"]/div[2]/ul/li[2]/a'));
  this.mealDropDown = element(by.css('.btn.btn-default.paidMealsBtn'));
  this.mealDropDownOption1 = element(by.xpath('//*[@id="segment-container"]/div[4]/div[1]/div[1]/div/div[2]/div/ul/li[2]'));
  this.mealDropDownOption2 = element(by.xpath('//*[@id="segment-container"]/div[4]/div[1]/div[1]/div/div[2]/div/ul/li[3]'));
  this.mealDropDownOption3 = element(by.xpath('//*[@id="segment-container"]/div[4]/div[1]/div[1]/div/div[2]/div/ul/li[4]'));
  this.mealDropDownOption4 = element(by.xpath('//*[@id="segment-container"]/div[4]/div[1]/div[1]/div/div[2]/div/ul/li[5]'));



  this.selectSeat = function(){
    noSeatAvailable.isPresent().then(function(present){
      if(present){
        console.log('no seat booking available on this flight');
      }
    });
    var airplane = "";
    browser.sleep(5000);
    element(by.xpath('//*[@id="segment-container"]/div[5]/ng-include/div/div/div/div/div/div[2]/div/div/div[1]/p/b')).isPresent().then(function(present){
      if(present){
        element(by.xpath('//*[@id="segment-container"]/div[5]/ng-include/div/div/div/div/div/div[2]/div/div/div[1]/p/b')).getText().then(function(text){
        airplane = text;
        console.log('0 Airplane:' + airplane);
        })
      }
    });
    browser.waitForAngular().then(function(){

      selectSeat737800go = function(){
        var rowNum = helperFunctions.getRandomNum(4, 19);
        var seatNum = helperFunctions.getRandomNum(1, 6);
        console.log('selecting row: ' + parseInt(rowNum)+13);
        console.log('selecting seat: ' + seatNum);
        element(by.xpath('//*[@id="cep-widget"]/div/div[2]/div/div[2]/div/div/div/div['+rowNum.toString()+']/div/sas-seat['+seatNum.toString()+']/span/span')).getAttribute('seatOccupied').then(function(seatStatus){
          if(seatStatus === true){
            console.log('seat not available');
            console.log(seatStatus);
            selectSeat737800go();
          }
        })
        helperFunctions.scrollElementToBeClickable(element(by.xpath('//*[@id="cep-widget"]/div/div[2]/div/div[2]/div/div/div/div['+rowNum.toString()+']/div/sas-seat['+seatNum.toString()+']/span/span')));
        element(by.xpath('//*[@id="cep-widget"]/div/div[2]/div/div[2]/div/div/div/div['+rowNum.toString()+']/div/sas-seat['+seatNum.toString()+']/span/span')).click();
      };


      selectSeat737700go = function(){
        var rowNum = helperFunctions.getRandomNum(2, 17);
        var seatNum = helperFunctions.getRandomNum(1, 6);
        console.log('selecting row: ' + parseInt(rowNum)+7);
        console.log('selecting seat: ' + seatNum);
        element(by.xpath('//*[@id="cep-widget"]/div/div[2]/div/div[2]/div/div/div/div['+rowNum.toString()+']/div/sas-seat['+seatNum.toString()+']/span/span')).getAttribute('seatOccupied').then(function(seatStatus){
          if(seatStatus === true){
            console.log('seat not available');
            console.log(seatStatus);
            selectSeat737700go();
          }
        })
        helperFunctions.scrollElementToBeClickable(element(by.xpath('//*[@id="cep-widget"]/div/div[2]/div/div[2]/div/div/div/div['+rowNum.toString()+']/div/sas-seat['+seatNum.toString()+']/span/span')));
        element(by.xpath('//*[@id="cep-widget"]/div/div[2]/div/div[2]/div/div/div/div['+rowNum.toString()+']/div/sas-seat['+seatNum.toString()+']/span/span')).click();
      };

      selectSeat737600go = function(){
        var rowNum = helperFunctions.getRandomNum(2, 13);
        var seatNum = helperFunctions.getRandomNum(1, 6);
        console.log('selecting row: ' + parseInt(rowNum)+8);
        console.log('selecting seat: ' + seatNum);
        element(by.xpath('//*[@id="cep-widget"]/div/div[2]/div/div[2]/div/div/div/div['+rowNum.toString()+']/div/sas-seat['+seatNum.toString()+']/span/span')).getAttribute('seatOccupied').then(function(seatStatus){
          if(seatStatus === true){
            console.log('seat not available');
            console.log(seatStatus);
            selectSeat737600go();
          }
        })
        helperFunctions.scrollElementToBeClickable(element(by.xpath('//*[@id="cep-widget"]/div/div[2]/div/div[2]/div/div/div/div['+rowNum.toString()+']/div/sas-seat['+seatNum.toString()+']/span/span')));
        element(by.xpath('//*[@id="cep-widget"]/div/div[2]/div/div[2]/div/div/div/div['+rowNum.toString()+']/div/sas-seat['+seatNum.toString()+']/span/span')).click();
      };

      selectSeatA319go = function(){
        var rowNum = helperFunctions.getRandomNum(2, 17);
        var seatNum = helperFunctions.getRandomNum(1, 6);
        element(by.xpath('//*[@id="cep-widget"]/div/div[2]/div/div[2]/div/div/div/div['+rowNum.toString()+']/div/sas-seat['+seatNum.toString()+']/span/span')).getAttribute('seatOccupied').then(function(seatStatus){
          if(seatStatus === true){
            console.log('seat not available');
            console.log(seatStatus);
            selectSeatA319go();
          }
        })
        helperFunctions.scrollElementToBeClickable(element(by.xpath('//*[@id="cep-widget"]/div/div[2]/div/div[2]/div/div/div/div['+rowNum.toString()+']/div/sas-seat['+seatNum.toString()+']/span/span')));
        element(by.xpath('//*[@id="cep-widget"]/div/div[2]/div/div[2]/div/div/div/div['+rowNum.toString()+']/div/sas-seat['+seatNum.toString()+']/span/span')).click();
      };

      selectSeatA320go = function(){
        var rowNum = helperFunctions.getRandomNum(2, 17);
        var seatNum = helperFunctions.getRandomNum(1, 6);
        console.log('selecting row: ' + rowNum);
        console.log('selecting seat: ' + seatNum);
        element(by.xpath('//*[@id="cep-widget"]/div/div[2]/div/div[2]/div/div/div/div['+rowNum.toString()+']/div/sas-seat['+seatNum.toString()+']/span/span')).getAttribute('seatOccupied').then(function(seatStatus){
          if(seatStatus === true){
            console.log('seat not available');
            console.log(seatStatus);
            selectSeatA320go();
          }
        })

        helperFunctions.scrollElementToBeClickable(element(by.xpath('//*[@id="cep-widget"]/div/div[2]/div/div[2]/div/div/div/div['+rowNum.toString()+']/div/sas-seat['+seatNum.toString()+']/span/span')));
        element(by.xpath('//*[@id="cep-widget"]/div/div[2]/div/div[2]/div/div/div/div['+rowNum.toString()+']/div/sas-seat['+seatNum.toString()+']/span/span')).click();
      };

      selectSeatA321go = function(){
        var rowNum = helperFunctions.getRandomNum(2, 19);
        var seatNum = helperFunctions.getRandomNum(1, 6);
        console.log('selecting row: ' + parseInt(rowNum)+16);
        console.log('selecting seat: ' + seatNum);
        element(by.xpath('//*[@id="cep-widget"]/div/div[2]/div/div[2]/div/div/div/div['+rowNum.toString()+']/div/sas-seat['+seatNum.toString()+']/span/span')).getAttribute('seatOccupied').then(function(seatStatus){
          if(seatStatus === true){
            console.log('seat not available');
            console.log(seatStatus);
            selectSeatA321go();
          }
        })
        helperFunctions.scrollElementToBeClickable(element(by.xpath('//*[@id="cep-widget"]/div/div[2]/div/div[2]/div/div/div/div['+rowNum.toString()+']/div/sas-seat['+seatNum.toString()+']/span/span')));
        element(by.xpath('//*[@id="cep-widget"]/div/div[2]/div/div[2]/div/div/div/div['+rowNum.toString()+']/div/sas-seat['+seatNum.toString()+']/span/span')).click();
      };

      selectSeatCRJ900go = function(){
        var rowNum = helperFunctions.getRandomNum(2, 16);
        var seatNum = helperFunctions.getRandomNum(1, 4);
        console.log('selecting row: ' + rowNum);
        console.log('selecting seat: ' + seatNum);
        element(by.xpath('//*[@id="cep-widget"]/div/div[2]/div/div[2]/div/div/div/div['+rowNum.toString()+']/div/sas-seat['+seatNum.toString()+']/span/span')).getAttribute('seatOccupied').then(function(seatStatus){
          if(seatStatus === true){
            console.log('seat not available');
            console.log(seatStatus);
            selectSeatCRJ900go();
          }
        })
        helperFunctions.scrollElementToBeClickable(element(by.xpath('//*[@id="cep-widget"]/div/div[2]/div/div[2]/div/div/div/div['+rowNum.toString()+']/div/sas-seat['+seatNum.toString()+']/span/span')));
        element(by.xpath('//*[@id="cep-widget"]/div/div[2]/div/div[2]/div/div/div/div['+rowNum.toString()+']/div/sas-seat['+seatNum.toString()+']/span/span')).click();
      };

    if(airplane == "Boeing 737-600"){
      console.log("Selecting seat in Boeing 737-600");
      console.log('1 Airplane:' + airplane);
      selectSeat737600go();
    }
    else if(airplane == "Boeing 737-700"){
      console.log("Selecting seat in Boeing 737-700");
      console.log('2 Airplane:' + airplane);
      selectSeat737700go();
    }
    else if(airplane == "Boeing 737-800"){
      console.log("Selecting seat in Boeing 737-800");
      console.log('3 Airplane:' + airplane);
      selectSeat737800go();
    }
    else if(airplane == "Airbus A319"){
      console.log("Selecting seat in Airbus a319");
      console.log('4 Airplane:' + airplane);
      selectSeatA319go();
    }
    else if(airplane == "Airbus A320"){
      console.log("Selecting seat in Airbus A320");
      console.log('5 Airplane:' + airplane);
      selectSeatA320go();
    }
    else if(airplane == "CRJ900"){
      console.log("Selecting seat in CRJ900");
      console.log('6 Airplane:' + airplane);
      selectSeatCRJ900go();
    }
    else if(airplane == "Airbus A321"){
      console.log("Selecting seat in Airbus A321");
      console.log('7 Airplane:'+airplane);
      selectSeatA321go();
    }
    else{
      backButton.click();
    }
  });
};



  //Got stuck on the buttons used to switch between outbound and return flight, no unique identifiers? trying xpath

};
module.exports = new ancillariesPage();
