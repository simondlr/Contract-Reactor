contract Basic {
    function Basic() {
    }
    
    //generates ABI function.
    function setPublicWord(bytes32 _newWord) external returns (bytes32 public_word) {
        public_word = _setPublicWord(_newWord);
    }
    
    //doesn't generate ABI function
    function _setPublicWord(bytes32 _newWord) private returns (bytes32 public_word) {
        public_word = _newWord;
        logNewWord(_newWord);
    }

    //generates ABI event
    event logNewWord(bytes32 _newWord);
    
    //generates ABI function
    function getBothWords() external constant returns (bytes32 _public_word, bytes32 _private_word) {
        _public_word = public_word;
        _private_word = _private_word;
    }
    
    //generates ABI function
    function getOneWord(bytes32 _word) external constant returns (bytes32 _returnWord) {
        if (_word == "private") 
        { _returnWord = private_word; }
        else if (_word == "public_word")
        { _returnWord = public_word; }
        
        //should return nothing if not correct specifier passed
    }
    
    bytes32 public public_word = "public"; //generates accessor
    bytes32 private_word = "private"; //no accessor
}
