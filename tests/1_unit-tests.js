/*
*
*
*       FILL IN EACH UNIT TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]----
*       (if additional are added, keep them at the very end!)
*/

// for testing  
// mocha --ui tdd tests/1_unit-tests.js
// mocha --ui tdd tests/1_unit-tests.js


var chai = require('chai');
var assert = chai.assert;
var ConvertHandler = require('../controllers/convertHandler.js');

var convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  
  suite('Function convertHandler.getNum(input)', function() {
    
    test('Whole number input', function(done) {
      var input = '32L';
      assert.equal(convertHandler.getNum(input),32);
      done();
    });
    
    test('Decimal Input', function(done) {
      let input = '3.1mi'
      assert.equal(convertHandler.getNum(input), 3.1);
      done();
    });
    
    test('Fractional Input', function(done) {
      let input = '3/2mi'
      assert.equal(convertHandler.getNum(input), 1.5);
      done();
    });
    
    test('Fractional Input w/ Decimal', function(done) {
      let input = '8.4/4mi';
      assert.equal(convertHandler.getNum(input), 2.1)
      done();
    });
    
    test('Invalid Input (double fraction)', function(done) {
      let input = '3/2/2mi'
      assert.isNull(convertHandler.getNum(input), 'Invalid Number');
      done();
    });
    
    test('No Numerical Input', function(done) {
      let input = 'lbs';
      assert.equal(convertHandler.getNum(input), 1);
      done();
    }); 
    
  });
  
  suite('Function convertHandler.getUnit(input)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
      let validInputs = ['gal', 'l', 'km', 'mi', 'lbs', 'kg']
      input.forEach(function(ele) {
        assert.include(validInputs, convertHandler.getUnit(ele));
      });
      done();
    });
    
    test('Unknown Unit Input', function(done) {
      let input = '123ljkdnfgkjn';
      assert.isNull(convertHandler.getUnit(input))
      done();
    });  
    
  });
  
  suite('Function convertHandler.getReturnUnit(initUnit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','l','mi','km','lbs','kg'];
      var expect = ['l','gal','km','mi','kg','lbs'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
      done();
    });
    
  });  
  
  suite('Function convertHandler.spellOutUnit(unit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','l','mi','km','lbs','kg'];
      let expect = ['gallon', 'liter', 'mile', 'kilometer', 'pound', 'kilogram'];
      input.forEach(function (elem, i) {
        assert.equal(convertHandler.spellOutUnit(elem), expect[i]);
      });
      done();
    });
    
  });
  
  suite('Function convertHandler.convert(num, unit)', function() {
    
    test('Gal to L', function(done) {
      var input = [5, 'gal'];
      var expected = 18.9271;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('L to Gal', function(done) {
      let input = [5, 'l'];
      let expected = 1.32086;
      let converted = convertHandler.convert( input[0], input[1] );
      assert.approximately(converted, expected, 0.1);
      done();
    });
    
    test('Mi to Km', function(done) {
      let input = [2, 'mi'];
      let expected = 3.21868;
      let converted = convertHandler.convert( input[0], input[1] );
      assert.approximately(converted, expected, 0.1);
      done();
    });
    
    test('Km to Mi', function(done) {
      let input = [2, 'km'];
      let expected = 1.24274;
      let converted = convertHandler.convert( input[0], input[1] );
      assert.approximately(converted, expected, 0.1);
      done();
    });
    
    test('Lbs to Kg', function(done) {
      let input = [5, 'lbs'];
      let expected = 2.26796;
      let converted = convertHandler.convert( input[0], input[1] );
      assert.approximately(converted, expected, 0.1);
      done();
    });
    
    test('Kg to Lbs', function(done) {
      let input = [2, 'kg'];
      let expected = 4.40925;
      let converted = convertHandler.convert( input[0], input[1] );
      assert.approximately(converted, expected, 0.1);
      done();
    });
    
  });

});