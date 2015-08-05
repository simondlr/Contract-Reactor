//Send through a reactor_config file & it will split it into the right components to pass to a ContainerHelper.

var parseConfig = function(data){
    var total_compiled = {};
    var addresses = {}; 
    var templates = {};
    var options = {};
    Object.keys(data["contracts"]).map(function(contract_name) { //iterate through multiple contracts based on keys
        $.ajax({
            //fetch .sol and compile it, adding compiled result & its specified address to separate dictionaries
            //3 parts: the compiled code from .sols. The address mapping. The templates.
            url: data["contracts"][contract_name].path,
            dataType: 'text',
            cache: false,
            async: false,
            success: function(contract) {
                /*
                This is slightly "hacky". If one file has multiple contracts, it returns one dictionary.
                This concatenates them in the scenario where there are multiple files as well.
                */
                var compiled = web3.eth.compile.solidity(contract);
                console.log(compiled);
                console.log(data["contracts"]);
                Object.keys(compiled).map(function(compiled_contract_name) {
                    if(compiled_contract_name in data["contracts"]) {
                        if(total_compiled.hasOwnProperty(compiled_contract_name) == false) { //not yet inserted
                            addresses[compiled_contract_name] = data["contracts"][compiled_contract_name].address; //not sure why I've been doing [] & . notation here.
                            templates[compiled_contract_name] = data["contracts"][compiled_contract_name].template;
                            options[compiled_contract_name] = {"template_overlay": data["contracts"][compiled_contract_name].template_overlay};

                            //feels like really nasty code. rewrite.
                            var comp = {};
                            comp[compiled_contract_name] = compiled[compiled_contract_name];
                            $.extend(total_compiled, comp);
                        }
                    }
                });
            }
        });
    });
    console.log(total_compiled); 
    console.log(addresses); 
    console.log(templates); 
    console.log(options); 

    var config = {};

    config.total_compiled = total_compiled;
    config.addresses = addresses;
    config.templates = templates;
    config.options = options;

    return config;

}
