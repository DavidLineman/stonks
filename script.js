let sum = function (acc, x) { return acc + x};

let updatedPortfolioValueAndProfit = function () {
  let stocksMarketValues = [];
  let stocksUnrealizedProfits = [];

  $('tbody tr').each(function (i, ele) {
    let marketValue = updatedMarketValue(ele);
    stocksMarketValues.push(marketValue);
    let unrealizedProfit = updatedUnrealizedProfit(ele, marketValue);
    stocksUnrealizedProfits.push(unrealizedProfit);
  });

  let portfolioMarketValue = stocksMarketValues.reduce(sum);
  let portfolioUnrealizedProfit = stocksUnrealizedProfits.reduce(sum);
  $('#portfolioValue').html(portfolioMarketValue);
  $('#portfolioProfit').html(portfolioUnrealizedProfit);

  
}

$(document).ready(function() {
  updatedPortfolioValueAndProfit();

  $(document).on('click', '.btn.remove', function (event) {
    $(this).closest('tr').remove();
    updatedPortfolioValueAndProfit();
  });

  let timeout;
  $('tr input').on('input', function () {
    clearTimeout();
    timeout = setTimeout(function() {
      updatedPortfolioValueAndProfit();
    }, 1000);
  });

  $('#addStock').on('submit', function (event) {
    event.preventDefault();
    let name = $(this).children('[name=name]').val();
    let shares = $(this).children('[name=shares]').val();
    let cost = $(this).children('[name=cost]').val();
    let marketPrice = $(this).children('[name=marketPrice]').val();
  
    $('tbody').append('<tr>' +
      '<td class="name">' + name + '</td>' +
      '<td class="shares"><input type="number" value="' + shares + '" /></td>' +
      '<td class="cost"><input type="number" value="' + cost + '" /></td>' +
      '<td class="marketPrice"><input type="number" value="' + marketPrice +
      '" /></td>' +
      '<td class="marketValue"></td>' +
      '<td class="profit"></td>' +
      '<td><button class="btn btn-light btn-sm remove">remove</button></td>' +
      '</tr>');

      updatedPortfolioValueAndProfit();
      $(this).children('[name=name]').val();
      $(this).children('[name=shares]').val();
      $(this).children('[name=cost]').val();
      $(this).children('[name=marketPrice]').val();

  });
});


let updatedMarketValue = function(ele) {
  let sharesOwned = parseFloat($(ele).find('.shares input').val());
  let marketPrice = parseFloat($(ele).find('.marketPrice input').val());

  // market value is shares times market price per share
  let marketValue = sharesOwned * marketPrice;
  $(ele).children('.marketValue').html(marketValue);

  return marketValue;
}

let updatedUnrealizedProfit = function(ele, marketValue) {
  let sharesOwned = parseFloat($(ele).find('.shares input').val());
  let costPerShare = parseFloat($(ele).find('.cost input').val());
  let costOfPurchase = sharesOwned * costPerShare;

  // unrealized profit is market value minus the cost of purchase
  let unrealizedProfit = marketValue - costOfPurchase;
  $(ele).children('.profit').html(unrealizedProfit);

  return unrealizedProfit;
}




$(document).ready(function () {
  $('tbody tr').each(function (i, ele) {
    let marketValue = updatedMarketValue(ele);
    updatedUnrealizedProfit(ele, marketValue);
  });
});