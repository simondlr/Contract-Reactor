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

var address;
if("address" in urlParams) {
    address = urlParams['address'];
} else {
    var address = '0xa206c162996a2ee95455991f566ee4b376d52445'; //random default
}

var contract;
if("contract" in urlParams) {
    contract = urlParams['contract'];
} else {
    var contract = "contracts/Basic_Test.sol"; //default
}


$.ajax({
    url: contract,
    dataType: 'text',
    cache: false,
    success: function(data) {
        compiled = web3.eth.compile.solidity(data);
        console.log(compiled.info.abiDefinition);
        var abi = compiled.info.abiDefinition;
        $.each(abi, function(i, obj) {
            //use obj.id and obj.name here, for example:
            console.log(obj);
        });
        var Mycontract = web3.eth.contract(abi);
        var instance = Mycontract.at(address);
        React.render(<Reactor abi={abi} instance={instance}/>, document.getElementById('contract'));
  },
});
