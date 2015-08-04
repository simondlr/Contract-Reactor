#Contract Reactor (alternatively, the Reacther) (Alpha)

You have a Solidity contract: how do you make it so that you can easily build a front-end that maps to the functions of the contract?

This attempts to make it easier to scaffold out a front-end, using only the contract & its ABI. Given this, it automatically creates input forms, based on the contracts that is passed to it. It is built in React, meaning that each component that has been written can be used separately if so desired. A small (in development) templating feature is built in to modify the forms.

## Installation

The Reactor can be found in dist/reactor.js. It contains exported variables ready to be used. It requires web3 & jquery to run, so that must also be included in your project.

## Components

There are 5 components for various granularities.

### ContainerHelper:

This is a helper component. It takes a config file with the source to contracts, as well as the additional information it needs (such as the templates and what to do with it), and then packages it so that you can immediately create an automatic front-end component. The config/templating section has more information.

### ContractWrapper:

Requires the following props:  
- deploy (bool): Whether the DeployWrapper should be inserted at the top.  
- name: Name of contract (used only for passing onwards to the DeployWrapper).  
- contract_template: The template that needs to be applied to the contract (see Templating).  
- compiled: The compiled JSON blob from web3.compile. This contains the code, ABI, etc.
- instance: The instance of the contract as it is on the chain (derived from web3's contract.at(address)).  
- key (optional): this is dependent on react and only required if you have multiple contracts being scaffolded out from one loop (for referencing).  

### DeployWrapper 

A small wrapper that allows you to deploy the code. It also shows if the code has actually been deployed at the specified address.

Requires the following props:  
- compiled: The compiled JSON blob from web3.compile. This contains the code, ABI, etc.
- name: Name of contract.
- instance: The instance of the contract as it is on the chain (derived from web3's contract.at(address)).  

### FunctionWrapper

Requires the following props:  
- function_template: The sub-section of a contract template specifically for this function (see Templating).  
- instance: The contract it is supposed to engage with on the chain (derived from web3's contract.at(address)).  
- data: the part of the ABI responsible for this specific function.  
- key (optional): this is dependent on react and only required if you have multiple functions being scaffolded out from one loop (for referencing).  

### InputWrapper

Requires the following props:  
- input_template: The sub-section of a function template specifically for this input field (see Templating).    
- ref: This is for react. A required unique reference is required for the input to refer to this instance.  
- arg: The argument it directly corresponds to in the function.  


### ContainerHelper

This is a special helper component. It takes all the components required and creates all the contracts it is given and scaffolds it.

Required props:
- templates: the full set of templates (the highest level) from the config.  
- compiled: The compiled JSON blob from web3.compile. This contains the code, ABI, etc.  
- addresses: A dictionary of contract_name -> address.  
- options: A dictionary of options for the various components (see Templating).  d


## Using it

If just want to scaffold a basic front-end and the ABI has all the information you need, then all you need to do is point the config to the contract & its address, which is explained below.

## Config & Templating

The 'reactor_config.json' file is the configuration point for the reactor. All the different templates, options, addresses and so forth can be derived from this config. You can create json configs for every component separately as well. The script.jsx in the example shows how the config is being used to create the different parts that is fed to the ContainerHelper. Depending on some final design decisions, it might make sense to combine this into the ContainerHelper.

At the top level, there's "contracts", which is a dictionary to all the contract classes used by the reactor.

Here's an example of a config file.

```
{
    "contracts": { 
        "Token": {
            "address": "0xbc72cf3079e08295364510917f92a10d0d54f9d2",
            "path": "contracts/Standard_Token.sol",
            "template_overlay": false,
            "deploy_overlay": false,
            "template": {
                "coinBalanceOf": {
                    "button": "Check Balance",
                    "inputs": {
                        "_addr": {
                            "label": "Address",
                            "default_value": "eg 0xbc72cf3079e08295364510917f92a10d0d54f9d2"
                        }
                    }
                },
                "sendCoin": {
                    "button": "Send Token",
                    "inputs": {
                        "_to": {
                            "label": "Insert Address",
                            "default_value": "eg 0xbc72cf3079e08295364510917f92a10d0d54f9d2"
                        },
                        "_value": {
                            "label": "Amount to send",
                            "default_value": "eg 12"
                        }
                    }
                }
            }
        }
    }
} 
```

For each contract, you need to specify the address, the path towards it (in the future, ideally it would not need to be recompiled every time). The "template" is pretty straightforward. For a specific function, you can specify what the "button" value should be. For each "input", you can specify what the input form should contain, which is currently a "label" & a "default_value".

The current options you can specify is "template_overlay" & "deploy_overlay". If "template_overlay" is set to "true", it will still include all fields/inputs in the contract, except just replace what is there with the template specifications. If it is set to "false" any parts of the ABI that does NOT have a matching template will not be shown. This allows you to for example only display 1 function of the ABI if you are so inclined.

The "deploy_overlay" ideally triggers the "DeployWrapper", which adds an additional header. This is mainly for testing purposes.

## Example

The example uses a basic token, and scaffolds out all the forms/inputs for it. It uses Truffle to bundle it. To run the example, at this stage, simply go into the build directory and run a simple server (since ajax calls are being used). Then open up index.html.

## Building on this

If you want to build on this and compile a new distributable version, you must run the following commands. First install, jsx & uglifyjs. Then do the following:

jsx -x jsx src dist  
cd into dist.  
uglifyjs ContainerHelper.js ContractWrapper.js FunctionWrapper.js InputWrapper.js DeployWrapper.js > reactor.js  

Now you can pass reactor.js around as you wish.

## Status/TODO

I'd consider this 80% towards a first proper release. I'm mainly contemplating some final design issues, especially wrt bringing in the script from the jsx as another helper tool (essentially ConfigParser).

##Licence

MIT
