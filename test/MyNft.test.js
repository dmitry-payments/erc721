const {
    network,
    ethers: {
      BigNumber,
      getContract,
      getContractAt,
      getNamedSigners,
      provider,
    },
    deployments: { fixture },  ethers
  } = require("hardhat");
  const {
    expect
  } = require ("chai")
  
  describe("MyNft", function () {
    let myNft, signer, signer1, signer2
    before("beforeAll", async function() {
        await fixture("MyNft")
        signer = (await ethers.getSigners())[0]
        signer1 = (await ethers.getSigners())[1]
        signer2 = (await ethers.getSigners())[2]
        myNft = await getContract("MyNft")
        console.log("name", await myNft.name());
    })

    describe("Deployment", function () {
        
      it("Check balanceOf", async function () {
            expect (await myNft.balanceOf(signer.address)).to.equal(0)
            await myNft.mint(signer.address, 1)
            expect (await myNft.balanceOf(signer.address)).to.equal(1)
            expect (await myNft.ownerOf(1)).to.equal(signer.address)
      });

      it("Check ownerOf", async function () {
        expect (await myNft.ownerOf(1)).to.equal(signer.address)
      });

      it("Check baseURI", async function () {
        expect (await myNft.tokenURI(1)).to.equal("https://api.animo.art/v1/m/1")
      });

      it("Check approve", async function () {
        (await myNft.approve(signer1.address, 1))
        expect (await myNft.getApproved(1)).to.equal(signer1.address)
      });

      it("Check transferFrom", async function () {
        (await myNft.connect(signer1).transferFrom(signer.address, signer2.address, 1))
        expect (await myNft.balanceOf(signer2.address)).to.equal(1)
      });

      it("Check setApprovalForAll", async function () {
        await myNft.mint(signer.address, 2)
        await myNft.setApprovalForAll(signer1.address, true)
        expect (await myNft.isApprovedForAll(signer.address, signer1.address)).to.equal(true)
      });

    });
    
  });