/*
*
*
*       Complete the handler logic below
*       
*       
*/

// worked out on repl.it first
// https://repl.it/@AA87/getNum-from-31mi-using-regex
//  https://repl.it/@AA87/getUnit-and-others

function ConvertHandler() {
  
  this.getNum = function (input) {
  let numRegex = /^(\d+\.?\d*)?(\/?)(\d+)?(\w)+$/;
  
    // return numRegex.test(input);

    if (!numRegex.test(input)) {
      return null;
    }

    let arr = input.match(numRegex);

    // console.log(arr);

    let [, num1, backslash, num2, unit] = arr;

    if (backslash && num2) {
      return Number(num1) / Number(num2);
    } else if (num1) {
      return Number(num1);
    } else {
      return 1;
    }
  };

// getNum('3.2.2mi');
// getNum('3.1mi');
// getNum('8.4/4mi');
// getNum('2.3.4.5mi');
// getNum('8/4mi')
// getNum('3/mi');  // just returns 3 / 1, should give an error but ignores it for now
// getNum('8.4/4.2mi')  // not working, returns null;
  
  this.getUnit = function(input) {
    let arr = input.split('');
    let index = arr.findIndex(w => w.match(/[a-zA-Z]/));
    let unit = arr.slice(index).join('').toLowerCase();
    let units = ['gal', 'lbs', 'mi', 'l', 'kg', 'km'];
    if (units.includes(unit)) {
      return unit;
    } else {
      return null;
    }
  };
  
  
  this.getReturnUnit = function(initUnit) {
    let units = {
      lbs: 'kg',
      kg: 'lbs',
      mi: 'km',
      km: 'mi',
      gal: 'l',
      l: 'gal'
    };
    return units[initUnit.toLowerCase()];
  };
  

  this.spellOutUnit = function(unit) {
    let units = {
      mi: 'mile',
      km: 'kilometer',
      kg: 'kilogram',
      lbs: 'pound',
      gal: 'gallon',
      l: 'liter'
    };
    return units[unit.toLowerCase()];
  };
  
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;  
    let convertTable = {
      km: 1 / miToKm,
      mi: miToKm,
      gal: galToL,
      l: 1 / galToL,
      lbs: lbsToKg,
      kg: 1 / lbsToKg
    }
    return Number((convertTable[initUnit.toLowerCase()] * initNum).toFixed(5));
  };
  
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)}${initNum == 1 ? ' ' : 's '}convert${initNum == 1? 's': ''} to ${returnNum} ${this.spellOutUnit(returnUnit)}${returnNum == 1 ? '': 's'}.`;
  };
  
}

module.exports = ConvertHandler;
