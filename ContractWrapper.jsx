//takes compiled code, instance and template.
var ContractWrapper = React.createClass({
    render: function() {
        return (
            <div>
            Specified address of contract is {this.props.instance.address}.
            <DeployWrapper compiled={this.props.compiled} name={this.props.name} instance={this.props.instance}/>
            <ul>
                {this.props.compiled.info.abiDefinition.map(function(result) {
                    if(result.type == "function") { //TODO: Determine whether events can be called from outside, otherwise it should be included.
                        //react key = unique function name for contract.
                        var function_template = {};
                        console.log(this.props);
                        if (this.props.contract_template.hasOwnProperty(result.name)) { //if a specific function has a template for it.
                            function_template = this.props.contract_template[result.name];
                        }
                        var args = "";
                        $.each(result.inputs, function(i, obj) {
                            args += obj.type;
                        });
                        var key = result.name + args; //function()arg1typearg2type, etc
                        return <FunctionWrapper function_template={function_template} instance={this.props.instance} key={key} data={result}/>;
                    }
                }, this)}
            </ul>
            </div>
        );
    }
});
