contract Basic_Test {
    // Create a new ballot with $(_numProposals) different proposals.
    event registerEvent(address indexed user, bytes32 message);
    
    function Basic_Test() {
        owner = msg.sender;
    }
    
    function event_fire(bytes32 _message) {
        registerEvent(msg.sender, _message);
    }
    
    address public owner;
}
