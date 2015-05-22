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

var config;
if("config" in urlParams) {
    config = urlParams['config'];
} else {
    var config = 'example_config.json'; //random default
}

$.ajax({
    url: config,
    dataType: 'json',
    cache: false,
    error: function(data) {
        console.log(data);
    },
    success: function(data) {
        //map through multiple contracts (this includes multiple ones in 1 file + different files.
        console.log(data);
        var total_compiled = {};
        var addresses = {}; 
        $.each(data.contract_paths, function(i, obj) {
            $.ajax({
                url: obj.contract_path,
                dataType: 'text',
                cache: false,
                async: false,
                success: function(contract) {
                    compiled = web3.eth.compile.solidity(contract);
                    console.log(Object.keys(compiled)[0]);
                    addresses[Object.keys(compiled)[0]] = data.contract_addresses[Object.keys(compiled)[0]];
                    $.extend(total_compiled, compiled);
                }
            });     
        });
        console.log(total_compiled); 
        console.log(addresses); 
        React.render(<Reactor compiled={total_compiled} addresses={addresses}/>, document.getElementById('contracts'));
    }
});
