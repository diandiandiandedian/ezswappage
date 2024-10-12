import { useCollectionInfo } from "@/contexts/CollectionInfoContext";
import React, { useEffect, useState, useRef, use } from "react";
import BuyNFTsSelectedRange from "@/components/collectioninfo/BuyNFTsSelectedRange";
import ERC721EnumABI from "../../pages/data/ABI/ERC721Enum.json";
import {
  SellPoolLiner,
  BuyPoolLiner,
  TradePoolLiner,
  BuyPoolExp,
  SellPoolExp,
  TradePoolExp,
} from "@/components/utils/calculate";
import { ethers } from "ethers";

import networkConfig from "../../pages/data/networkconfig.json";
import CollectionData from "../../pages/data/collection-data.json";
import multiSetFilterPairMode from "../swap/swapUtils/multiSetFilterPairMode";
import { useContractRead, useBalance, useNetwork, useAccount } from "wagmi";
import { useLanguage } from "@/contexts/LanguageContext";
import { max } from "lodash";
const erc404Name = ['M404', 'mtest', 'Mars']


const ContentBuy = ({ }) => {
  const { colInfo, nftTokenId2PriceMap: idPriceMap, selectedNftTokenIds: selectIds, updateSelectedNftToenIds,
    updateNftToenId2PriceMap: setIdPriceMap, updateSwapButtonFormikData, refreshNftListKey } =
    useCollectionInfo();
  const { languageModel } = useLanguage()
  const [isBanSelect, setIsBanSelect] = useState(false);
  const [golbalParams, setGolbalParams] = useState({})
  const [isLoading, setLoading] = useState(true)

  const [nftList, setNftList] = useState([]);
  const [pairs, setPairs] = useState([])
  const [max, setMax] = useState(0)

  const { chain } = useNetwork();
  const { address: owner } = useAccount();
  const [collectionName, setCollectionName] = useState(null)
  // const [nftNums, setNftNums] = useState([]);
  useEffect(() => {
    if (chain) {
      setGolbalParams(networkConfig[chain.id])
    }




  }, [chain, owner]);

  // if (colInfo.address) {
  // if sell nft, get user nft info
  const { refetch, data: tokenIds721 } = useContractRead({
    address: colInfo.address,
    abi: ERC721EnumABI,
    functionName: "tokensOfOwner",
    args: [owner],
    watch: false,
    enabled: false,
    onSuccess(data) {
      const num = data.map((item) => Number(item));
      setNftList(num);
    },
    onError(e) {
      // setLoading(false)
      console.log(e)
    }
  });

  useEffect(() => {
    setLoading(true)
    refetch();
    setCollectionName(CollectionData.find(item => item.address == colInfo.address))
  }, [refreshNftListKey, colInfo.address]);
  // }





  useEffect(() => {
    if (nftList.length > 0) {
      fetchData(colInfo.address)
    }
    return () => {
      setPairs([])
      updateSelectedNftToenIds([])
      setIdPriceMap({})
    }
  }, [colInfo.address, golbalParams, nftList]);




  const fetchData = async (contractAddress) => {
    if (
      golbalParams.networkName &&
      contractAddress && nftList.length > 0
    ) {
      const params = {
        contractAddress: contractAddress,
        network: golbalParams.networkName,
      };

      const response = await fetch("/api/proxy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });

      const data = await response.json();

      if (data.success) {
        const pairsList = data.data;
        let filteredData = pairsList.filter(
          (item) => item.type === "buy" || item.type === "trade"
        );
        if (colInfo.type == "ERC1155") {
          filteredData = filteredData.filter(
            (item) => item.nftId1155 === golbalParams.collection.tokenId1155
          );
        }


        let canTradeToken = [
          ...new Set(filteredData.map((item) => item.token)),
        ].map((token) => (token === null ? "ETH" : token));
        let permitTokens = golbalParams.recommendERC20.map(
          (item) => item.address.toLowerCase()
        );
        canTradeToken = canTradeToken.filter((token) =>
          permitTokens.includes(token.toLowerCase())
        );

        // setTokens(canTradeToken);

        const tokensNames = canTradeToken.map((address) => {
          const mappingObject = golbalParams.recommendERC20.find(
            (obj) => obj.address.toLowerCase() === address.toLowerCase()
          );
          return mappingObject ? mappingObject.name : null;
        });

        // setTokensName(tokensNames);

        if (canTradeToken.length) {
          let token;
          if (canTradeToken.includes("ETH")) {
            token = "ETH";
            // setToken(token);
            // setTokenName("ETH");
          } else {
            token = canTradeToken[0];
            // setToken(token);
            // setTokenName(tokensNames[0]);
          }
          // setToken(token)
          // setTokenName(tokensNames[0])



          multiSetFilterPairMode(
            'sell',
            { collection: { type: colInfo.type } },
            filteredData,
            owner,
            token,
            setFilterPairs,
            setSwapMode
          );
        } else {
          setFilterPairs([])
        }



        // multiSetFilterPairMode(
        //   'buy',
        //   { collection: { type: 'ERC721' } },
        //   filteredData,
        //   owner,
        //   'ETH',
        //   setFilterPairs,
        //   setSwapMode
        // );



        //

      } else {
        setLoading(false)
      }

    } else {
      // setLoading(false)
    }
  }

  const setFilterPairs = (filterPairs) => {
    console.log('filterPairs', filterPairs)
    setPairs(filterPairs);
    setLoading(false)

    let initSid = [0];
    let initpair = JSON.parse(JSON.stringify(filterPairs));
    initSid.forEach((id) => {
      update721SellToPairs(id, initpair);
    });

    let IdsPlusAmount = 0;
    initpair.forEach((pair) => {
      if (pair.tuple) {
        IdsPlusAmount += pair.tokenIds.length;
      }
    });
    if (IdsPlusAmount) {
      // 为什么加一我也不知道，修复bug
      setMax(IdsPlusAmount + 1)
    } else {
      setMax(0)
    }

    if (initSid.length > IdsPlusAmount) {
      setIsBanSelect(true);
    } else {
      setIsBanSelect(false);
    }


    // toggleSelected();
    // const ids = filterPairs?.map((item) => item.nftIds);
    // const prices = filterPairs?.map((item) => item.nftIdsPrice);
    // const idPriceMap = mapIdsToPrices(ids, prices);
    // setIdPriceMap(idPriceMap);
    // buildNftList(idPriceMap);
  }
  const setSwapMode = (filterPairs) => {
    console.log('filterPairs', filterPairs)
  }


  const rangeChange = (e) => {
    const number = e.target.value / 1;
    let newSids = [];
    if (number === 0) {
      updateSelectedNftToenIds(newSids)
      toggleSelected(newSids);
      return;
    }
    if (number < selectIds.length) {
      newSids = selectIds.slice(0, number);
      // updateSelectedNftToenIds(newSelectIds)
    } else {
      newSids = nftList.slice(0, number)
      // updateSelectedNftToenIds(nftList.slice(0, number))
    }
    toggleSelected(newSids);
    //重新计算价格
  }

  const radioRef = useRef(
    0
  );

  //从swap 里面复制过来的方法
  const update721SellToPairs = (tokenId, pairs) => {
    let protocolFee = 10000000000000000; // 0.5%  get from smartcontract
    let dec = 1e18;
    let maxPrice = 0;
    let maxPriceIndex = -1;

    // get pool buy price
    pairs.forEach((pair, index) => {
      let res;
      let params = [
        pair.spotPrice / dec,
        pair.delta / dec,
        pair.fee / dec,
        protocolFee / dec,
        pair.tokenIds.length + 1,
      ];

      if (pair.bondingCurve === "Linear" && pair.type === "buy") {
        res = BuyPoolLiner(...params);
      } else if (pair.bondingCurve === "Linear" && pair.type === "trade") {
        res = TradePoolLiner(...params);
      } else if (pair.bondingCurve === "Exponential" && pair.type === "buy") {
        res = BuyPoolExp(...params);
      } else if (pair.bondingCurve === "Exponential" && pair.type === "trade") {
        res = TradePoolExp(...params);
      } else {
        res;
      }

      if (res) {
        pair.userGetPrice = res.lastUserSellPrice;
        pair.ifUserAddGetPrice = res.userSellPrice;

        // get maxPrice pool
        if (pair.tokenBalance / dec * 0.999 >= res.poolBuyPrice) {
          const currentPrice = res.currentUintSellPrice;
          if (currentPrice > maxPrice) {
            maxPrice = currentPrice;
            maxPriceIndex = index;
          }
        }
      }
    });

    if (maxPriceIndex !== -1) {
      pairs[maxPriceIndex].tokenIds.push(tokenId);
      pairs[maxPriceIndex].userGetPrice =
        pairs[maxPriceIndex].ifUserAddGetPrice;
      pairs[maxPriceIndex].tuple = [
        [
          pairs[maxPriceIndex].id,
          pairs[maxPriceIndex].tokenIds,
          [pairs[maxPriceIndex].tokenIds.length],
        ],
        ethers.utils
          .parseEther(pairs[maxPriceIndex].userGetPrice.toString())
          .mul(ethers.BigNumber.from("995"))
          .div(ethers.BigNumber.from("1000")),
      ];
    } else {
      // console.log('nft execced amount')
    }
  };
  useEffect(() => {
    updateSwapInfo()
  }, [selectIds]);

  const updateSwapInfo = () => {

    ///////////////////////////////////////////////////////////////
    let tempPairs = JSON.parse(JSON.stringify(pairs));
    selectIds.forEach((id) => {
      update721SellToPairs(id, tempPairs);
    });

    let tupleEncode = [];
    let totalGet = 0;
    let IdsAmount = 0;
    tempPairs.forEach((pair) => {
      if (pair.tuple) {
        tupleEncode.push(pair.tuple);
        totalGet += pair.userGetPrice;
        IdsAmount += pair.tokenIds.length;
      }
    });

    totalGet = Number(totalGet.toFixed(10));
    console.log('totalGet', totalGet)

    updateSwapButtonFormikData({ swapType: 'sell', isExceeded: false, tupleEncode: tupleEncode, totalGet: totalGet, collection: { type: colInfo.type, address: colInfo.address }, golbalParams: { router: golbalParams.router }, selectIds: selectIds })



    let newSidsPlus = new Array(selectIds.length + 1).fill(0);
    let pairs2 = JSON.parse(JSON.stringify(pairs));
    newSidsPlus.forEach((id) => {
      update721SellToPairs(id, pairs2);
    });
    let IdsPlusAmount = 0;
    pairs2.forEach((pair) => {
      if (pair.tuple) {
        IdsPlusAmount += pair.tokenIds.length;
      }
    });

    if (newSidsPlus.length > IdsPlusAmount) {
      setIsBanSelect(true);
    } else {
      setIsBanSelect(false);
    }

    if (IdsAmount >= 1 && erc404Name.includes(collectionName)) {
      setIsBanSelect(true);
    }
  }
  const toggleSelected = (id) => {
    if (
      typeof id !== 'object' && !(selectIds.includes(id) ||
        !isBanSelect)
    ) {
      return
    }
    // add new id to formikdata
    let newSids = [];
    if (typeof id === 'object') {
      newSids = id;
    } else {
      if (id) {
        if (selectIds.includes(id)) {
          newSids = selectIds.filter((item) => item !== id);
        } else {
          newSids = [...selectIds, id];
        }
      }
    }
    updateSelectedNftToenIds(newSids);

  };

  // const buildNftList = (idPriceMap) => {
  //   const nftList = Object.keys(idPriceMap)
  //     .sort((a, b) => {
  //       const aSelected = selectIds.includes(a);
  //       const bSelected = selectIds.includes(b);
  //       if (aSelected === bSelected) {
  //         return parseFloat(idPriceMap[a]) - parseFloat(idPriceMap[b]);
  //       }
  //       return aSelected ? -1 : 1;
  //     }).map(item => item)
  //   setNftList(nftList)
  // }
  if (isLoading) {
    return (
      <div className="text-center mt-10"><p className="h-max loading loading-bars loading-lg"></p></div>
    )
  }
  if (nftList.length === 0) {
    return (
      <div className="text-center mt-10"><p>{languageModel.noData}</p></div >
    )
  }

  return (
    <>
      <section className="w-full h-[470px] overflow-scroll  border-[1px] border-solid border-[#496C6D] rounded-lg ">

        <BuyNFTsSelectedRange value={selectIds.length} radioRef={radioRef} min={0} max={max} handleRangeChange={(e) => rangeChange(e)} />

        <div className="flex flex-wrap  px-5 ">

          {
            nftList.map((square, index) => {
              return (<div
                data-tip="this collection has no liquidity"
                key={square} className={'  relative  border border-[#00D5DA] mr-3 flex flex-col items-center  justify-center mt-10 pb-5 rounded-xl  ' + ((selectIds.includes(square) ||
                  !isBanSelect) ? '' : ' filter grayscale  tooltip opacity-50 ')
                } onClick={() => toggleSelected(square)}>
                <img
                  src={colInfo.image}

                  // className={(!selectIds.includes(square) && isBanSelect) ? 'filter grayscale ' : ''}
                  style={{
                    width: `245px`,
                  }}
                />

                <div className="text-center "> #{square}</div>
                {
                  selectIds.includes(square) &&
                  (
                    <svg className="absolute top-5 right-5" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="14" cy="14" r="14" fill="#00D5DA" />
                      <path d="M7.30831 12.6058C7.69163 12.2083 8.32466 12.1967 8.72225 12.58L13.5447 17.2291C13.9423 17.6124 13.9538 18.2455 13.5705 18.6431L12.9563 19.2801C12.573 19.6777 11.94 19.6893 11.5424 19.306L6.71996 14.6569C6.32234 14.2735 6.31078 13.6404 6.69413 13.2428L7.30831 12.6058Z" fill="black" />
                      <path d="M19.0995 8.72037C19.481 8.32226 20.1128 8.30814 20.5118 8.6888L21.1517 9.29943C21.5521 9.68145 21.5661 10.316 21.1829 10.7153L12.9649 19.279C12.5827 19.6773 11.9501 19.6906 11.5515 19.3087L10.9184 18.702C10.5196 18.3198 10.5061 17.6868 10.8883 17.288L19.0995 8.72037Z" fill="black" />
                    </svg>
                  )
                }
              </div>)
            })
          }
        </div>


      </section >
    </>
  );
};

export default ContentBuy;
