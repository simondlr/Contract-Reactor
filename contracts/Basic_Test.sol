contract Multiple_Contracts {
    function Multiple_Contracts() {
        text = "start";
    }

    function setText(bytes32 _newText) external {
        text = _newText;
    }

    bytes32 public text;
}

contract Basic_Test {
    event registerEvent(address indexed user, bytes32 message, bool status);
    
    function Basic_Test() {
        owner = msg.sender;
    }
    
    function event_fire(bytes32 _message, bool _status) {
        registerEvent(msg.sender, _message, _status);
    }
    
    address public owner;
}
