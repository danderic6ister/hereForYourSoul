// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;
// import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/erc721a/contracts/ERC721A.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";




contract HereForYourSoul is ERC721A,Ownable{

    uint256 public immutable altarSupply = 5555;
    uint256 public mintToCOVEN = 55;
    uint256 public maxTx = 1;
    uint256 public sorcererMint = 2;
    uint256 public commonsMint =1;


    string public baseURI;
    bool revealed ;
    bool sorcererMintIsAtive;
    bool commonsMintIsActive;

    mapping(address =>uint256) public mintPerformedAsSorcerer;
    mapping(address => uint256) public mintPerformedAsCommon;

    constructor()ERC721A("HereForYourSoul","H4YourSoul"){
        baseURI = "ipfs://toBeSet";
       
    }

    function setCommonsMintActiveOrNot(bool _status) public onlyOwner{
        commonsMintIsActive = _status;
    }
    function mintToCoven()public onlyOwner{
        _mint(msg.sender,mintToCOVEN);

    }



}