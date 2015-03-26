#Contract Reactor (Alpha)

Given a contract ABI & contract address, the "Contract Reactor" automatically creates a React component to interact with that contract. It creates functions and forms to pass arguments to them. Mainly useful (at this point) as a way to easily scaffold front-end functions to interact with a contract during testing.

## Installation

It requires React.js & Ethereum.js (web3). If other Javascript APIs become available, it will be made more modular. See bower.json in examples for an example.

## Using it

As props, you must pass the ABI (as JSON) & the instance of the contract (an object) as created through Ethereum.js (web3). If other Javascript APIs become available they should probably follow a similar format (ie "contract.doSomething(args)") and thus it should be able to continue working without requiring Ethereum.js. This will be changed later as required. 

See examples for basic version (to use it, use bower to fetch the components).

To use in production, simply add reactor.jsx as a script (see examples section).

For the examples, the web root should be one directory up (so as to include the correct reactor.jsx). If you have reactor.jsx in the same folder, then just change the path in the examples.

## TODO

- Show returned values (if any).
- Add prop validaton for development mode of React.
- Add contract state as component state? [Unsure, because you might not want to trust the DOM vs doing a call() instead each time?]
- Add natspec support? [Unsure if needed/required/possible]
- Write simple tests.

Longer term ideas.
- Add possibility to also create/submit contract. [Useful to more quickly bootstrap contract testing]
- Create different types of "views", potentially developing this into a more full-fledged Ethereum front-end framework. [up in the air]

## Notes

Using Ethereum.js -> 0b84376721b7cadb011d32d11efa74e616915d5d [March 24 2015]

##Licence

MIT
