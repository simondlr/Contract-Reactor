//EXAMPLE
var abi;
var address = "0x0"; //change this to a real address if it has been pushed to the network.
$.ajax({
  url: "Basic.abi",
  dataType: 'json',
  cache: false,
  success: function(data) {
        abi = data;
        $.each(abi, function(i, obj) {
              //use obj.id and obj.name here, for example:
              console.log(obj);
        });
        var contract = web3.eth.contract(abi);
        var instance = new contract(address);
        React.render(<Reactor abi={abi} instance={instance}/>, document.getElementById('contract'));
  }
});
