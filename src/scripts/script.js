function selecionarCalculo() {
  document.getElementById("icmsTaxIncluded").classList.remove("taxError");
  document.getElementById("ipiTaxIncluded").classList.remove("taxError");               

  let icmsIncluso = document.forms["data"]["icmsTaxIncluded"].value;
  let ipiIncluso = document.forms["data"]["ipiTaxIncluded"].value;

  if (icmsIncluso == "yes" && ipiIncluso == "yes") {
    calcularImpostoICMSeIPI()
  }

  if (icmsIncluso == "yes" && ipiIncluso == "no") {
    calcularImpostoICMS()
  }

  if (icmsIncluso == "no" && ipiIncluso == "no") {
    calcularImposto()
  }

  if (icmsIncluso == "no" && ipiIncluso == "yes") {
    alert("Favor confimar se a seleção dos impostos inclusos está correta");
    document.getElementById("icmsTaxIncluded").className = "taxError";
    document.getElementById("ipiTaxIncluded").className = "taxError";
  }
}

let price;

function priceReplaceComma() {
  let priceComma = document.forms["data"]["price"].value;
  price = priceComma.replace(/\./g, "").replace(/,/g, ".") * 1;
  return price
}

function calcularImpostoICMSeIPI() {
  priceReplaceComma()  
  let icms = document.forms["data"]["icmsTax"].value * 1;
  let ipi = document.forms["data"]["ipiTax"].value;
  ipi = ipi.replace(/,/g, ".") * 1;

  let icmsValue = price * (icms / 100);
  let ipiValue = price - (price / (1 + (ipi / 100)));
  
  let icmsBase = price;
  let ipiBase = price - ipiValue;

  let liquidPrice = price - (icmsValue + ipiValue);

  convertAndSend(liquidPrice, icmsBase, icmsValue, ipiBase, ipiValue);   
}

function calcularImpostoICMS() {
  priceReplaceComma()
  let icms = document.forms["data"]["icmsTax"].value * 1;
  let ipi = document.forms["data"]["ipiTax"].value;
  ipi = ipi.replace(/,/g, ".") * 1;

  let icmsValue = (price * (1 + (ipi / 100))) * (icms / 100);
  let ipiValue = (price * (1 + (ipi /100))) - price;
  
  let icmsBase = price + ipiValue;
  let ipiBase = price;

  let liquidPrice = price - icmsValue;

  convertAndSend(liquidPrice, icmsBase, icmsValue, ipiBase, ipiValue);
}

function calcularImposto() {
  priceReplaceComma()
  let icms = document.forms["data"]["icmsTax"].value * 1;
  let ipi = document.forms["data"]["ipiTax"].value;
  ipi = ipi.replace(/,/g, ".") * 1;

  let ipiBase = (price / (1 - ((icms / 100) * (1 + (ipi / 100)))));

  let icmsValue = ipiBase - price;
  let ipiValue = (ipiBase * (1 + (ipi / 100))) - ipiBase;
  
  let icmsBase = price + icmsValue + ipiValue;        

  let liquidPrice = price;

  convertAndSend(liquidPrice, icmsBase, icmsValue, ipiBase, ipiValue);
}

function convertAndSend(liquidPrice, icmsBase, icmsValue, ipiBase, ipiValue) {
  let liquidPriceFormat = liquidPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  let icmsBaseFormat = icmsBase.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  let icmsValueFormat = icmsValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  let ipiBaseFormat = ipiBase.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  let ipiValueFormat = ipiValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  
  document.getElementById("liquidPrice").innerHTML = liquidPriceFormat;       
  document.getElementById("icmsBase").innerHTML = icmsBaseFormat;
  document.getElementById("icmsValue").innerHTML = icmsValueFormat;
  document.getElementById("ipiBase").innerHTML = ipiBaseFormat;
  document.getElementById("ipiValue").innerHTML = ipiValueFormat;

  let values = document.querySelectorAll('.values');
  let numValues = values.length;           

  for (var i = 0; i < numValues; i++) {
    values[i].classList.add('background');
  }        
}

let inputs = document.getElementsByTagName('input');
let numInputs = inputs.length;

for (var i = 0; i < numInputs; i++) {
  inputs[i].addEventListener('click', removeBackground, false);
}

for (var i = 0; i < numInputs; i++) {
  inputs[i].addEventListener('change', clearResults, false);
}

let selects = document.getElementsByTagName('select');
let numSelects = selects.length;

for (var j = 0; j < numSelects; j++) {
  selects[j].addEventListener('change', clearResults, false);
}

function clearResults() {
  let values = document.querySelectorAll('.values');
  let numValues = values.length;           

  for (var i = 0; i < numValues; i++) {
    values[i].classList.remove('background');
    values[i].innerHTML = "R$0";
  }        
}

function removeBackground() {  
  let values = document.querySelectorAll('.values');
  let numValues = values.length;           

  for (var i = 0; i < numValues; i++) {
    values[i].classList.remove('background');          
  }               
} 
