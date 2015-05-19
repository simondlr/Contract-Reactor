//EXAMPLE
//helper function to get URL parameters.
var urlParams;
(window.onpopstate = function () {
    var match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query  = window.location.search.substring(1);

    urlParams = {};
    while (match = search.exec(query))
       urlParams[decode(match[1])] = decode(match[2]);
})();
/*------------------*/

var abi;
var address;
if("address" in urlParams) {
    address = urlParams['address'];
} else {
    var address = '0xa206c162996a2ee95455991f566ee4b376d52445'; //change this to a real address if it has been pushed to the network.
}


console.log(address);
console.log(web3.eth.coinbase);
$.ajax({
  url: "Basic_Test.abi",
  dataType: 'json',
  cache: false,
  success: function(data) {
        abi = data;
        $.each(abi, function(i, obj) {
              //use obj.id and obj.name here, for example:
              console.log(obj);
        });
        var Mycontract = web3.eth.contract(abi);
        var instance = Mycontract.at(address);
        React.render(<Reactor abi={abi} instance={instance}/>, document.getElementById('contract'));
  }
});

