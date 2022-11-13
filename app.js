window.currenciesBackup = [];

function filterCurrencies(searchValue) {
  var result = [];
  for(var currency of currenciesBackup) {
    var currencyName = currency.txt.toLowerCase();
    var currencyCc = currency.cc.toLowerCase();
    if(currencyName.indexOf(searchValue) >= 0 || currencyCc.indexOf(searchValue) >= 0) {
      result.push(currency);
    }
  }
  renderCurrencies(result);
}

function renderCurrencies(currencies) {
  var htmlString = '';
  if(!currencies.length) {
    htmlStr = `<tr><td colspan="4" class="text-center">No currency found</td></tr>`;
    document.getElementById('currencies').innerHTML = htmlStr;
    return;
  }
  for (var currency of currencies) {
    htmlString += `<tr>
      <td>${currency.txt}</td>
      <td>${currency.cc}</td>
      <td>${currency.rate.toFixed(2)}</td>
    </tr>`;
  }
  document.getElementById('currencies').innerHTML = htmlString;

  var trs = document.getElementsByTagName('tr');
  for(var item = 0; item < trs.length; item++) {
    var tr = trs[item];
    tr.onmouseenter = function(e) {
      e.currentTarget.classList.add('bg-info');
    }
    tr.onmouseleave = function(e) {
      e.currentTarget.classList.remove('bg-info');
    }
  }
}

fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=20221112&json').then(res => res.json()).then(function(data) {
  window.currenciesBackup = data;
  renderCurrencies(data);
});

var search = document.getElementById('search');
search.onkeyup = function(e) {
  var searchValue = e.currentTarget.value;
  filterCurrencies(searchValue.trim().toLowerCase());
}