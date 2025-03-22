const { ethers } = require('ethers')

async function main () {

  // todo 弄白名单注意要修改阶段字段,0:whitemint,1.私募,数据库和合约统一了
  const step = 1
  const privateKey = ''

  const provider = ethers.getDefaultProvider('https://1rpc.io/matic')  //  https://1rpc.io/eth  https://1rpc.io/matic
  const signer = new ethers.Wallet(privateKey, provider)             // 0x7eE147715591cF47358d125D654EA14151Ae7053

  //ETH: seaDrop721 deploy address: 0x69Cf9d12ab24DeB2B99A602E59822d498D86ed83
  //ETH: seaDrop1155 deploy address:0xC54bbA2F407a039DE8C78AEe88FAee5fe9c503b8
  // ETH: seaDrop721 deploy address: 0x69Cf9d12ab24DeB2B99A602E59822d498D86ed83
  // ETH: seaDrop1155 deploy address:0xC54bbA2F407a039DE8C78AEe88FAee5fe9c503b8
  // polyhon seaDrop721 deploy address: 0xA4e0c0b135e7f1dB414ef3175Fa92bE31a2dCC70
  // polygon seaDrop1155 deploy address: 0x15F6e73D19CfFEc4Ae0f71c05A229C796F23Fb5A
  //0xeDD8Dbce783Ed8C1Bc6E949A3E8d1B013bE5EB25 1155
  //0x06CBA4e8FA00B0A732Ba52c00AB51990a497eE2e  721
  // arb g 721: 0x2F3ED1D8cfDeA5647Ee5792279E14edB9DF38A69
  // arb g 1155: 0x73695Eb79fb281778905F99366686F73dCb8d8d2
  // const seaDropAddress = "0x2F3ED1D8cfDeA5647Ee5792279E14edB9DF38A69";     // seadrop address
  // const tokenAddress = '0xC85BE5e34825642627908bF5751B53E715A4987B'        //  nft address
  // 0xe2Ea0e2F42f208c3827217AF254a472aac035f67 1155
  // 0xC1BE54AAC9403C8d8bbcA0DBEEB09066124c3a42  721
  //zks test 721 0xDa0E69A5Fc5468638B4D4DE62e369f2C9808C749
  //zks test 1155 0xA9dADE87F17ED50b23409B2886dE19D130eE1f93
  //zks era 721  0x43671ff30d712E5bB5bd72f7a33d801E0A892E76
  //zks era 1155 0x06147aDf17972E48B6674Fb6ab9bc7c313ddd373

  //eth正式721: 0x5C0Fe44391ee35856A5De861dFd340197D252624
  // manta test 0x3b328975b14c9aE3B4886b63dfbb92C1760Ad563
  // manta 主网
  // eos test 0x86E55cFD1eCFC94293A4144a33771d3F2be67fDB
  // eos main 0xb8b027A9f72A4A364449EaefdbE6BD0DB7beD502

  // arb 主网 1155  0x44444aeE2c51BeFA0ac20134b3205D9f44238058
  const seaDropAddress = '0x44444aeE2c51BeFA0ac20134b3205D9f44238058'     // seadrop address
  const tokenAddress = '0x8E51D0a7F2DD43B606b3DeCE8EF3D6b14D9A6e5d'        //  nft address

  let userAddresses = [
    '0xc9167A7a5D1beAfd692EA7777FafC27517174cb8'
  ]   // airdrop addresses

  let signatures = []

  await Promise.all(
    userAddresses.map(async (user) => {
      try {
        let message = [seaDropAddress, tokenAddress, user, step]
        let msgHash = ethers.utils.solidityKeccak256(
          ['address', 'address', 'address', 'uint8'],
          message
        )
        let msgHashBytes = ethers.utils.arrayify(msgHash)
        let signature = await signer.signMessage(msgHashBytes)
        signatures.push(signature)
        console.log(signature)
        // signatures.push(signature)
      } catch (e) {
        console.log(e)
      }
    })
  )
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})



