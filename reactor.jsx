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
                       return <FunctionWrapper instance={this.props.instance} key={result.name} data={result}/>;
                   }
                }, this)}
            </ul>
        </div>
        );
    }
});

var FunctionWrapper = React.createClass({
    callFunction: function() {
        args = {};
        //get inputs
        $.each(this.refs, function(i, obj) {
              args[obj.props.arg] = obj.state.value; //map inputs to a dictionary
        });
        var function_name = this.props.data.name.split("(")[0]; //seems very hacky to get only function name. It's written as 'function(args)' usually.
        this.props.instance[function_name](args);
    },
    render: function() {
        //use react refs to keep track of inputs to a function.
        return (<div>
            {this.props.data.inputs.map(function(result) {
                 return <div key={result.name}> <InputWrapper ref={result.name} arg={result.name}/> </div>
            }, this)}
            <a href="#" onClick={this.callFunction}>Call() {this.props.data.name}</a>
        </div>
        );
    }
});

var InputWrapper = React.createClass({
    getInitialState: function() {
        return {
            value: ""
        }
    },
    handleChange: function(event) {
        this.setState({value: event.target.value});
    },
    render: function() {
        return <input type="text" value={this.state.value} onChange={this.handleChange}/>
    }
});


