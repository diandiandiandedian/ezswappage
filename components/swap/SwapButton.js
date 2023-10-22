import React, {useEffect, useState} from 'react'
import {ethers} from 'ethers'

import {ConnectButton} from '@rainbow-me/rainbowkit'
import {useNetwork, useContractRead, useContractReads, useContractWrite, useAccount, erc20ABI, useWaitForTransaction} from 'wagmi'
import ERC721EnumABI from '../../pages/data/ABI/ERC721Enum.json'
import ERC1155ABI from '../../pages/data/ABI/ERC1155.json'
import styles from "./index.module.scss";
import RouterABI from '../../pages/data/ABI/Router.json'
import {Alert, AlertTitle, Box, CircularProgress, Snackbar} from "@mui/material";


const SwapButton = ({formikData, owner, reset123,addSwapSuccessCount}) => {

    const [nftApproval, setNftApproval] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")

    const {data: nftApprovalData} = useContractRead({
        address: formikData.collection.address,
        abi: ERC721EnumABI,
        functionName: 'isApprovedForAll',
        args: [owner, formikData.golbalParams.router],
        watch: true,
        onSuccess(data) {
            // console.log('SwapButton isApprovedForAll', data)
            // if (data) {
                setNftApproval(data)
            // }
        }
    })

    const {data: approveNFTData, isLoading: approveLoading, isSuccess: approveSuccess, write: approveNFT,status: approveStatus,error:approveError} = useContractWrite({
        address: formikData.collection.address,
        abi: ERC721EnumABI,
        functionName: 'setApprovalForAll',
        args: [formikData.golbalParams.router, true],
    })

    const {data: robustSwapNFTsForTokenData, isLoading, isSuccess, write: swapNFTToToken, status: swapStatus,error:swapError} = useContractWrite({
        address: formikData.golbalParams.router,
        abi: RouterABI,
        functionName: 'robustSwapNFTsForToken',
        args: [formikData.tupleEncode, owner, (Date.parse(new Date()) / 1000 + 60 * 3600)],
    })
    const {waitApproveData, waitApproveIsError, isLoading: waitApproveLoading} = useWaitForTransaction({
        hash: approveNFTData?.hash,
        confirmations: 1,
        onSuccess(data) {
            // console.log(robustSwapNFTsForTokenData?.hash, data)
            setMsgState({...{message: 'Approve Success', open: true}, open: true});
            doSwapNFTToToken()
        },
        onError(err) {
            console.log('approve tx error data ', robustSwapNFTsForTokenData?.hash, err);
            setMsgState({...{message: 'Approve Fail', open: true}, open: true});
        }
    })

    const {data, isError, isLoading: waitTrxLoading} = useWaitForTransaction({
        hash: robustSwapNFTsForTokenData?.hash,
        confirmations: 1,
        onSuccess(data) {
            console.log('swap success', robustSwapNFTsForTokenData?.hash, data)
            setMsgState({...{message: 'Swap Success', open: true}, open: true});
            reset123()
        },
        onError(err) {
            console.log('approve tx error data ', robustSwapNFTsForTokenData?.hash, err);
            setMsgState({...{message: 'Swap Fail', open: true}, open: true});
        }
    })

    function doApprove() {
        approveNFT()
        setMsgState({...{message: 'Approve Success', open: true}, open: true});
    }

    function doSwapNFTToToken() {
        // swapNFTToToken()
        // reset123()
        // addSwapSuccessCount()
        // console.log('formikData.swapSuccessCount', formikData.swapSuccessCount)
        // setMsgState({...{message: 'Swap Success', open: true}, open: true});
        setAlertText({
            className: 'alert-success',
            text: 'mint nft success',
            svg: svgSuccess,
        })
        setShowAlert(true);
    }

    useEffect(() => {
        if (approveStatus === 'error') {
            if (approveError.message.indexOf('token owner or approved') > -1) {
                setMsgState({...{message: 'caller is not token owner or approved', open: true}, open: true});
            }else if (approveError.message.indexOf('insufficient funds') > -1) {
                setMsgState({...{message: 'insufficient funds', open: true}, open: true});
            }else {
                setMsgState({...{message: 'approve error', open: true}, open: true});
            }
        }
    }, [approveStatus]);

    useEffect(() => {
        if (swapStatus === 'error') {
            if (swapError.message.indexOf('token owner or approved') > -1) {
                setMsgState({...{message: 'caller is not token owner or approved', open: true}, open: true});
            }else if (swapError.message.indexOf('insufficient funds') > -1) {
                setMsgState({...{message: 'insufficient funds', open: true}, open: true});
            }else {
                setMsgState({...{message: 'swap error', open: true}, open: true});
            }
        }
    }, [swapStatus]);

    //mui的snackbar
    const [msgState, setMsgState] = useState({
        open: false,
        message: 'Swap Success'
    });
    const {message, open} = msgState;

    const handleClose = () => {
        setMsgState({...msgState, open: false});
    };
    //mui的snackbar
    //新版
    const svgError = (<svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>)
    const svgSuccess = (<svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>)

    const [alertText, setAlertText] = useState({
        className: '',
        text: '',
        svg: '',
    })
    const [showAlert, setShowAlert] = useState(false);
    useEffect(() => {
        let timer;
        if (showAlert) {
            timer = setTimeout(() => {
                setShowAlert(false);
            }, 1500);
        }
        return () => {
            clearTimeout(timer);
        };
    }, [showAlert]);
    //新版


    const buttonText = () => {
        let text
        if (!formikData.collection.address) {
            text = 'Select a Collection'
            return (<div>{text}</div>)
        }
        if (!formikData.selectIds.length > 0) {
            text = 'Select a NFT'
            return (<div>{text}</div>)
        }

        if (!nftApproval) {
            text = 'Approve'
            return (<button onClick={() => doApprove()}>{approveLoading || waitApproveLoading ? <span class="loading loading-spinner loading-sm"></span> : text}</button>)
        }

        text = 'Swap'
        return (
            <div>
                <button onClick={() => doSwapNFTToToken()}>{isLoading || waitTrxLoading ? <span class="loading loading-spinner loading-sm"></span> : text}</button>
                <Snackbar
                    anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                    open={open}
                    onClose={handleClose}
                    message={message}
                    key={'topright'}
                />
            </div>
        )
    }

    if (!owner) return (
        <div className='mx-6 p-6'>
            <ConnectButton/>
        </div>
    )

    return (
        <div>
            <div className={'btn' + " " + 'mx-6' + " " + styles.swapButton}>
                {buttonText()}
            </div>
            <div>
                {errorMsg}
            </div>
        </div>
    )
}

export default SwapButton
