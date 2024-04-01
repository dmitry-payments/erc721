pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNft is ERC721 {

    constructor(string memory name_, string memory symbol_) ERC721(name_, symbol_) {
    }

    function mint(address to, uint256 tokenId) public {
        _mint(to, tokenId);
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return "https://api.animo.art/v1/m/";
    }

}