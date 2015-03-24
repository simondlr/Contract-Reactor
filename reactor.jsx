var Reactor = React.createClass({
    getInitialState: function() {
        return {
            blockNumber: "", //todo, later.
        }
    },
    render: function() {
        return (
        <div>
            Address of contract is {this.props.instance.address}.
            <ul>
                {this.props.abi.map(function(result) {
                   if(result.type == "function") { //TODO: Determine whether events can be called from outside, otherwise it should be included.
                       //react key = unique function name for contract.
                       return <ListFunctionWrapper instance={this.props.instance} key={result.name} data={result}/>;
                   }
                }, this)}
            </ul>
        </div>
        );
    }
});

var ListFunctionWrapper = React.createClass({
    callFunction: function() { //currently only works for functions without arguments
        var function_name = this.props.data.name.split("(")[0]; //seems very hacky to get only function name. It's written as 'function(args)' usually.
        this.props.instance[function_name](); //currently call without args
    },
    render: function() {
        return <li><a href="#" onClick={this.callFunction}>{this.props.data.name}</a></li>;
    }
});



