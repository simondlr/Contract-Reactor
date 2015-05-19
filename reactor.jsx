var Reactor = React.createClass({
    getInitialState: function() {
        return {
            blockNumber: "", //todo, later for potentially adding contract creation as well.
        }
    },
    render: function() {
        console.log(this.props.instance);
        return (
        <div>
            Address of contract is {this.props.instance.address}.
            <DeployWrapper address={this.props.instance.address}/>
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

var DeployWrapper = React.createClass({
    getInitialState: function() {
        //check if contract exists
        //if not
        getCode = web3.eth.getCode(this.props.address);
        var submitted = true;
        if (getCode == "0x") {
            submitted = false;
            console.log("Contract doesn't exist.");
        }
        return {
           submitted : submitted,
        }
    },
    render: function() {
        console.log(this.state.submitted);
        if(this.state.submitted == true) {
            return (
                <div>
                    Contract exists on the blockchain.   
                </div>
            );
        } else {
            return (
                <div>
                    Contract does not exist on the blockchain. Deploy here.
                </div>
            );
        }
    }
});

var FunctionWrapper = React.createClass({
    executeFunction: function(type) {
        args = {};
        //get inputs [replace with pure js as this requires jquery as a dependency]
        $.each(this.refs, function(i, obj) {
              args[obj.props.arg] = obj.state.value; //map inputs to a dictionary
        });
        var function_name = this.props.data.name.split("(")[0]; //seems very hacky to get only function name. It's written as 'function(args)' usually.
        if(type == "call") {
            result = this.props.instance[function_name].call(args);
            console.log(result);
        } else if(type == "transact") {
            result = this.props.instance[function_name].sendTransaction(args);
            console.log(result);
        }
    },
    render: function() {
        //use react refs to keep track of inputs to a function.
        return (<div>
            {this.props.data.inputs.map(function(result) {
                 return <div key={result.name}> <InputWrapper ref={result.name} arg={result.name} /> </div>
            }, this)}
            <a href="#" onClick={this.executeFunction.bind(this,"call")}>Call() {this.props.data.name}</a> - <a href="#" onClick={this.executeFunction.bind(this,"transact")}>Transact() {this.props.data.name}</a>
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
        return <input type="text" value={this.state.value} placeholder={this.props.arg} onChange={this.handleChange}/>
    }
});


