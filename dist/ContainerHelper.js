/*
A helper component that takes ABIs and automatically cascades to the relevant parts & components.
*/

var ContainerHelper = React.createClass({displayName: "ContainerHelper",
    render: function() {
        return (
        React.createElement("div", null, 
            Object.keys(this.props.compiled).map(function(result) { //iterate through multiple contracts based on keys
                //console.log(this.props.compiled[result]);
                //var abi = this.props.compiled[result].info.abiDefinition;
                var contract = web3.eth.contract(this.props.compiled[result].info.abiDefinition);
                var instance = contract.at(this.props.addresses[result]);
                React.createElement("hr", null)
                var contract_template = {};
                var new_compiled = this.props.compiled;
                var abi = this.props.compiled[result].info.abiDefinition;

                if(this.props.templates.hasOwnProperty(result)) {
                    if(this.props.templates[result] != undefined) {
                        contract_template = this.props.templates[result]; //if a contract has a template.

                        if(this.props.options[result]["template_overlay"] == false) {
                            //remove parts of the ABI.
                            $.each(abi, function(i, obj) {
                                if(obj.name != undefined) {
                                    //console.log(this.props.templates[result]);
                                    if(this.props.templates[result].hasOwnProperty(obj.name) == false) {
                                        console.log("deleting part of abi");
                                        console.log(abi[i]);
                                        delete abi[i];
                                    }
                                }
                            }.bind(this));
                            console.log("false");
                        }
                    }

                    var deploy = false; 
                    if (this.props.options[result].hasOwnProperty("deploy_overlay")) {
                        console.log(this.props.options[result].deploy_overlay);
                        deploy = this.props.options[result].deploy_overlay;
                    }
                }
                return  (
                    React.createElement("div", {key: result}, 
                    React.createElement(ContractWrapper, {key: result, deploy: deploy, name: result, contract_template: contract_template, compiled: this.props.compiled[result], instance: instance})
                    )
                )
            }, this)
        )
        );
    }
});

