// SPDX-License-Identifier: MIT
pragma solidity 0.8.6;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Catlacs is ERC721Enumerable, Ownable {
	using Strings for uint256;

	string private _baseTokenURI =
		"https://raw.githubusercontent.com/nftinvesting/Catlacs/master/other/";
	string private _contractURI =
		"https://raw.githubusercontent.com/nftinvesting/Catlacs/master/other/contract_uri.json";

	uint256 public itemPrice = 70000000000000000; // 0.07 ETH
	bool public isSaleActive = false;
	uint256 public constant totalTokenToMint = 10000; //not including burned ones!
	uint256 public purchasedTokens = 0;
	mapping(uint256 => string) public nftName;

	event Action(uint256 petID, uint256 value, uint256 actionID, string payload);

	constructor() ERC721("Crypto Cannabis Club", "CCC") {}

	//core of the contract
	function purchaseToken(uint256 _howMany) public payable {
		require(_howMany > 0, "minimum 1 token");
		require(
			_howMany <= totalTokenToMint - purchasedTokens,
			"amount is greater than the token available"
		);
		require(isSaleActive, "sale is not active");
		require(_howMany <= 50, "max 50 tokens at once");
		require(itemPrice * _howMany == msg.value, "exact value in ETH needed");
		for (uint256 i = 0; i < _howMany; i++) {
			_mintToken(_msgSender());
		}
	}

	//in case tokens are not sold, admin can mint them for giveaways, airdrops etc
	function adminMint(uint256 _howMany) public onlyOwner {
		require(_howMany > 0, "minimum 1 token");
		require(
			_howMany <= totalTokenToMint - purchasedTokens,
			"amount is greater than the token available"
		);
		for (uint256 i = 0; i < _howMany; i++) {
			_mintToken(_msgSender());
		}
	}

	//internal mint function
	function _mintToken(address _to) private {
		purchasedTokens++;
		require(!_exists(purchasedTokens), "Mint: Token already exist.");
		_safeMint(_to, purchasedTokens);
	}

	//a custom action that supports anything.
	function action(
		uint256 _nftID,
		uint256 _actionID,
		string memory payload
	) external payable {
		require(ownerOf(_nftID) == msg.sender, "you must own this NFT");
		emit Action(_nftID, msg.value, _actionID, payload);
	}

	/*
	 * Non important functions
	 */
	function burn(uint256 tokenId) public virtual {
		require(_isApprovedOrOwner(_msgSender(), tokenId), "caller is not owner nor approved");
		_burn(tokenId);
	}

	function exists(uint256 _tokenId) external view returns (bool) {
		return _exists(_tokenId);
	}

	function isApprovedOrOwner(address _spender, uint256 _tokenId) external view returns (bool) {
		return _isApprovedOrOwner(_spender, _tokenId);
	}

	function stopSale() external onlyOwner {
		isSaleActive = false;
	}

	function startSale() external onlyOwner {
		isSaleActive = true;
	}

	function tokenURI(uint256 _tokenId) public view override returns (string memory) {
		require(_exists(_tokenId), "ERC721Metadata: URI query for nonexistent token");
		return string(abi.encodePacked(_baseTokenURI, _tokenId.toString()));
	}

	function setBaseURI(string memory newBaseURI) public onlyOwner {
		_baseTokenURI = newBaseURI;
	}

	function setContractURI(string memory newuri) public onlyOwner {
		_contractURI = newuri;
	}

	function contractURI() public view returns (string memory) {
		return _contractURI;
	}

	function withdraw() public onlyOwner {
		uint256 balance = address(this).balance;
		payable(msg.sender).transfer(balance);
	}

	function reclaimToken(IERC20 token) public onlyOwner {
		require(address(token) != address(0));
		uint256 balance = token.balanceOf(address(this));
		token.transfer(msg.sender, balance);
	}

	function uint2str(uint256 _i) internal pure returns (string memory _uintAsString) {
		if (_i == 0) {
			return "0";
		}
		uint256 j = _i;
		uint256 len;
		while (j != 0) {
			len++;
			j /= 10;
		}
		bytes memory bstr = new bytes(len);
		uint256 k = len;
		while (_i != 0) {
			k = k - 1;
			uint8 temp = (48 + uint8(_i - (_i / 10) * 10));
			bytes1 b1 = bytes1(temp);
			bstr[k] = b1;
			_i /= 10;
		}
		return string(bstr);
	}
}
