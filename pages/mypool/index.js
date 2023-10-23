import React, { useState, useEffect } from 'react'

import networkConfig from '../data/networkconfig.json'
import { useNetwork, useContractWrite, useWaitForTransaction, useAccount } from 'wagmi'
import { useFormik } from 'formik';

import { BuyPoolLiner, TradePoolLiner, BuyPoolExp, TradePoolExp } from '../../components/utils/calculate'
import PoolCard from '@/components/mypool/PoolCard';



const MyPool = () => {

    const [isMounted, setIsMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const { chain } = useNetwork();
    const { address: owner } = useAccount()

    const formik = useFormik({
        initialValues: {
            golbalParams: '',
            pairs: [],
            filterPairs: [],
        }
    });


    useEffect(() => {
        setIsMounted(true)
        if (chain) {
            if (chain.id in networkConfig) {
                formik.setFieldValue('golbalParams', networkConfig[chain.id])
            }
        }
    }, [chain])


    useEffect(() => {

        const fetchData = async () => {

            // setIsLoading(true);

            if (formik.values.golbalParams.networkName) {
                const params = {
                    userAddress: owner?.toLowerCase(),
                    mode: formik.values.golbalParams.networkName,
                };

                const response = await fetch('/api/queryMypool', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(params),
                });

                const data = await response.json();

                if (data.success) {
                    let pairsList = data.data

                    formik.setFieldValue('pairs', pairsList)

                    pairsList = pairsList.map(item => {

                        let tokenName, NFTName, poolTypeName, BondingCurveName
                        if (item.token === null) {
                            tokenName = 'ETH'
                        } else {
                            let tokenNameRes = formik.values.golbalParams.recommendERC20?.find(obj => obj.address?.toLowerCase() === item.token?.toLowerCase())
                            if (typeof tokenNameRes === 'undefined') {
                                tokenName = 'UnlistedERC20'
                            } else {
                                tokenName = tokenNameRes.name
                            }
                        }


                        let NFTNameRes = formik.values.golbalParams.recommendNFT?.find(obj => obj.address?.toLowerCase() === item.collection?.toLowerCase())
                        if (typeof NFTNameRes === 'undefined') {
                            if (item.collectionName) {
                                NFTName = item.collectionName
                            } else {
                                NFTName = 'UnlistedERC1155'
                            }
                        } else {
                            NFTName = NFTNameRes.name
                        }

                        if (formik.values.golbalParams.linear.toLowerCase() === item.bondingCurve.toLowerCase()) {
                            BondingCurveName = 'Linear'
                        } else if (formik.values.golbalParams.exponential.toLowerCase() === item.bondingCurve.toLowerCase()) {
                            BondingCurveName = 'Exponential'
                        } else {
                            BondingCurveName = 'Unknown'
                        }

                        if (item.type === '0') {
                            poolTypeName = 'buy'
                        } else if (item.type === '1') {
                            poolTypeName = 'sell'
                        } else if (item.type === '2') {
                            poolTypeName = 'trade'
                        } else {
                            poolTypeName = '???'
                        }

                        //  calculate currentprice
                        let protocolFee = 1e16   // 1%  get from smartcontract
                        let dec = 1e18
                        let res
                        let params = [item.spotPrice / dec, item.delta / dec, item.fee / dec, protocolFee / dec, 1]

                        if (BondingCurveName === 'Linear' && poolTypeName === 'buy') {
                            res = BuyPoolLiner(...params)
                        } else if (BondingCurveName === 'Linear' && poolTypeName === 'trade') {
                            res = TradePoolLiner(...params)
                        } else if (BondingCurveName === 'Exponential' && poolTypeName === 'buy') {
                            res = BuyPoolExp(...params)
                        } else if (BondingCurveName === 'Exponential' && poolTypeName === 'trade') {
                            res = TradePoolExp(...params)
                        } else {
                            res
                        }

                        return {
                            ...item,
                            tokenBalance: ((item.ethBalance === null ? item.tokenBalance : item.ethBalance) / 1e18).toFixed(3),   // this pool token balance, vaild or not
                            tokenName: tokenName,
                            NFTName: NFTName,
                            currentPrice: res?.userSellPrice,
                            BondingCurveName: BondingCurveName,
                            poolTypeName: poolTypeName,
                            deltaText: BondingCurveName === 'Linear' ? ((item.delta) / 1e18).toFixed(2) : (((item.delta) / 1e18).toFixed(2).toString() + '%')
                        }
                    })

                    formik.setFieldValue('filterPairs', pairsList)

                    setIsLoading(false);
                }
            }
        }
        fetchData()


    }, [owner, formik.values.golbalParams])


    if (!isMounted) {
        return null; //  <Loading /> ??
    }
    if (isLoading) {
        return <div className='flex flex-col min-h-screen bg-base-200 items-center mt-32'>Loading...</div>;
    }
    return (
        <div className='flex flex-col min-h-screen bg-base-200 items-center mt-32'>
            <div className="mt-6 w-2/3">
                {formik.values.filterPairs?.map(item => <PoolCard key={item.id} item={item} />)}
            </div>
        </div>
    )
}

export default MyPool