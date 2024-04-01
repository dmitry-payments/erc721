module.exports = async ({
    ethers, deployments : {deploy}
}) => {
    let deployer = (await ethers.getSigners())[0];
    const MyNft = await deploy("MyNft", {
        from: deployer.address,
        contract: "MyNft",
        args: ["MyNft", "MN"],
        log: true
    })
};

module.exports.tags = ["MyNft"]