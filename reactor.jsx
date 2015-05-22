var Reactor = React.createClass({
    /*getInitialState: function() {
        return {
            blockNumber: "", //todo, later for potentially adding contract creation as well.
        }
    },*/
    render: function() {
        return (
        <div>
            {Object.keys(this.props.compiled).map(function(result) { //iterate through multiple contracts based on keys
                console.log(this.props.compiled[result]);
                var abi = this.props.compiled[result].info.abiDefinition;
                var contract = web3.eth.contract(abi);
                var instance = contract.at(this.props.addresses[result]);
                return <div key={result}> <hr/> <ContractWrapper abi={abi} instance={instance} /> </div>;
            }, this)}
        </div>
        );
    }
});

var DeployWrapper = React.createClass({
    getInitialState: function() {
        //check if contract exists
        //TODO: Code must match compiled code.
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

var ContractWrapper = React.createClass({
    render: function() {
        return (
            <div>
            Specified address of contract is {this.props.instance.address}.
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
            <button className={"btn btn-default"} onClick={this.executeFunction.bind(this,"call")}>Call() {this.props.data.name}</button> - <button className={"btn btn-default"} onClick={this.executeFunction.bind(this,"transact")}>Transact() {this.props.data.name}</button>
            <br /><br />
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
        return <input className={"form-control"} type="text" value={this.state.value} placeholder={this.props.arg} onChange={this.handleChange}/>
    }
});


