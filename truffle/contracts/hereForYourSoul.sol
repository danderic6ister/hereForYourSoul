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
    bytes32 public immutable merkleRoot = 0x1bfab583593848c26f149cb904997f62124659eca80be648880813d6411fbc3b;


    string public baseURI = "ipfs://toBeSet/";
    bool public  revealed ;
    bool public sorcererMintIsActive;
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
        sorcererMintIsActive = true;
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

}    

// //     //
//     [
//   "0xcefcf29b4e023f4f06af91658414b2c466bd96c3974d4192aaca513a27ccbdf2",
//   "0x1c04101d820837d31c90304f93c972bb74e88d097df556e82bed5ddda0325831"
// ]
// // // // 
// ["0x523bab317f97a6c3bd085b8092501712bbd7f538a83f76171561ed61f319c995","0x1c04101d820837d31c90304f93c972bb74e88d097df556e82bed5ddda0325831"]

// // ["0x393fd3a706d508a2a3d970f3288798a446c904cd61be94ce00eae67afbb6c2ca"]

// }