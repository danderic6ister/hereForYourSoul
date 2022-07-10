// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;
// import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/erc721a/contracts/ERC721A.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
contract HereForYourSoul is ERC721A,Ownable{
    // @dev set the total supply of the collection
    uint256 public altarSupply = 5555;
    
    //@dev sets the amount minted to the teams vault
    uint256 public  immutable  mintToCOVEN = 55;
    
    uint256 public immutable maxTx = 1;
    uint256 public immutable sorcererMint = 2;
    // Saves Gas since we are minting just one 
    // uint256 public immutable commonsMint =1;
    bytes32 public immutable merkleRoot = 0xbe3a35197763e6a487d1baf617545ecbff5e9c88b7ed3a814005564bc718ed9b;


    string public baseURI = "ipfs://toBeSet/";
    bool public  revealed = true ;
    bool public sorcererMintIsActive = true;
    bool public commonsMintIsActive;
    bool public  teamHasClaimed;

    // mapping(address =>uint256) public mintPerformedAsSorcerer;
    // mapping(address => uint256) public mintPerformedAsCommon;
    mapping(address => bool ) public sentTxAsSorcerer;
    mapping(address => bool) public txSentAsCommon;

    constructor()ERC721A("HereForYourSoul","H4YourSoul"){}

    function toggleCommonsMint() external onlyOwner{
        commonsMintIsActive = !commonsMintIsActive;
    }
    

    function mintToCoven()public onlyOwner{
        require(!teamHasClaimed);
        _mint(msg.sender,mintToCOVEN);
        teamHasClaimed = true;

    }

    function _baseURI() internal override view returns(string memory){
        return baseURI;
    }
    

    function isBlessed(bytes32[] calldata proof) internal view returns(bool){
        bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
        return MerkleProof.verify(proof, merkleRoot, leaf);
    }
    // a:  Commons Mint is live  and you can't mint in this phase anymore
    // b: Sorcerer's mint has not begun
    // c: Please enter a valid amount to mint and ensure it is not greater than 2
    // d : You cant send more than one tx
    function sorcerersMint(uint256 amount,bytes32[] calldata proof) public {
        require(!commonsMintIsActive," Commons Mint is live");
        require(sorcererMintIsActive,"Sorcerer's mint has not begun");
        require(isBlessed(proof),"You have not been whitelisted,try your luck in Common's Mint"); 
        require(amount > 0 && amount <= sorcererMint,"c");
        require(!sentTxAsSorcerer[msg.sender],"You can't send more than 1 tx.");
        // Saves GAs
        // require(mintPerformedAsSorcerer[msg.sender] < sorcererMint, "You can't mint more than 2");
        uint totalsupply = totalSupply();
        uint availableToMint = altarSupply -mintToCOVEN;
        require((totalsupply + amount)  <= availableToMint , "Minted Out.");
        _mint(msg.sender,amount);


        sentTxAsSorcerer[msg.sender] = true;
        // mintPerformedAsSorcerer[msg.sender] += amount;

       
    }

    function commonsMintPhase()public {
        require(commonsMintIsActive,"Commons Mint has not begun");
        // Save GAs
        // require(amount == commonsMint,"Can't mint more or less than 1 ");
        require(!txSentAsCommon[msg.sender],"You have sent a tx.");
        uint totalsupply = totalSupply();
        uint availableToMint = altarSupply -mintToCOVEN;
        require((totalsupply + 1)  <= availableToMint , "Minted Out.");
        _mint(msg.sender,1);

        txSentAsCommon[msg.sender] = true;


    }
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        if (!_exists(tokenId)) revert URIQueryForNonexistentToken();

        string memory baseURI_ = _baseURI();

        
        return bytes(baseURI_).length != 0 ? string(abi.encodePacked(baseURI_, _toString(tokenId),".json")) : '';
        
        
        
    }
     function _startTokenId() internal view virtual override returns (uint256) {
        return 1;
    }

}   
// 
// ["0x7d22b128e982b43eb57c7a0142761c730c5dee9f489bf8b5d1b4c5022f5c2e8f","0x04a01326e014116187743337e92dfe097ae3600f491c6d45f09f8f3f883c9437"] 

// ["0xbd408b9e1c3182bb2fd44a1112323a3803b2965754c83f9f420b44f63d190f39","0x04a01326e014116187743337e92dfe097ae3600f491c6d45f09f8f3f883c9437"]

// ["0x76ffeac6cadc713c9d265483fe3ccba807660cbb4ab74dfd0ccd8d4a51e3ba44"]
