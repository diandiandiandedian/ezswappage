import React, { useState } from 'react'
import styles from "./index.module.scss";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import {Box, Chip, OutlinedInput} from "@mui/material";
import { erc20ABI } from 'wagmi'
import { useContractRead } from 'wagmi'

const TokenSearch = ({ formikData, owner, reset23, setToken, setTokenName, setFilterPairs, setSwapMode }) => {

    console.log('formikData', formikData)
    const handleTokenClick = (token) => {
        reset23()
        setToken(token)


        // filter pool
        let filteredData = formikData.pairs.filter(item => item.owner.toLowerCase() !== owner.toLowerCase());
        if (token === 'ETH') {
            filteredData = filteredData.filter(item => item.token === null);
        } else {
            filteredData = filteredData.filter(item => item.token === token);
        }

        // rebuild pair info
        filteredData = filteredData.map(item => {
            return {
                ...item,
                tokenBalance: item.ethBalance === null ? item.tokenBalance : item.ethBalance,   // this pool token balance, vaild or not
                tokenIds: [],  // user sell tokenId in this pool
                userGetPrice: '', // user can get the price from this pool
            }
        })
        setFilterPairs(filteredData)

        console.log(filteredData)


        if (formikData.collection.type === 'ERC721' && token === 'ETH') {
            setSwapMode('ERC721-ETH')
        } else if (formikData.collection.type === 'ERC721' && token !== 'ETH') {
            setSwapMode('ERC721-ERC20')
        } else if (formikData.collection.type === 'ERC1155' && token === 'ETH') {
            setSwapMode('ERC1155-ETH')
        } else if (formikData.collection.type === 'ERC1155' && token !== 'ETH') {
            setSwapMode('ERC1155-ERC20')
        } else {
            setSwapMode('ERROR-SWAPMODE')
        }
    }
    const [age, setAge] = useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };


    const displayDialog = () => {

        if (!formikData.collection.address) {
            return <div>select nft first</div>
        }

        if (formikData.collection.address && formikData.pairs === '') {
            return <div>Loading...</div>
        }

        if (formikData.collection.address && !formikData.pairs.length) {
            return <div>this collection dont have pool to swap</div>
        }

        return (
            formikData.tokens.map((token, index) => (
                <button
                    key={index}
                    className="btn justify-start"
                    onClick={() => handleTokenClick(token)}>
                    {token}
                </button>
            ))

        )

    }


    const { data: erc20Name } = useContractRead({
        address: (formikData.token !== '' ? (formikData.token === "ETH" ? '' : formikData.token) : ''),
        abi: erc20ABI,
        functionName: 'name',
        args: [],
        watch: false,
        onSuccess(data) {
            setTokenName(data)
        }
    })


    return (
        <div className="form-control">
            {/*<span className="label-text">Token</span>*/}
            <FormControl sx={{ m: 1, minWidth: 400 }} className={styles.selectItem}>
                <Select
                    value={age}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    className={styles.selectItem}
                    sx={{color:'white',background: '#06080F'}}
                    renderValue={(selected) => {
                        if (selected.length === 0) {
                            return <em>Select Items</em>;
                        }
                        return   <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip key={value} label={value} />
                                ))}
                            </Box>
                        // return selected;
                    }}
                >
                    <MenuItem disabled value="">
                        <em>Select Items</em>
                    </MenuItem>
                    {/*formikData != undefined && formikData.tokens != undefined ?*/}
                    {/*    {formikData.tokens.map((nft, index) => (*/}
                    {/*        <MenuItem value={nft.address} className={styles.selectItem}><img className={styles.logoStyle} src="/logo.svg" alt=""/>{nft.name}</MenuItem>*/}
                    {/*    ))}: null*/}

                </Select>
            </FormControl>
            {/*{formikData}*/}


            <button className="btn" onClick={() => document.getElementById('token_search_sell').showModal()}>
                {formikData.token ? (formikData.token === 'ETH' ? 'ETH' : formikData.tokenName) : 'token name'}
                <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.97168 1L6.20532 6L11.439 1" stroke="#AEAEAE"></path></svg>
            </button>

            {/*<FormControl sx={{ m: 1, width: 300 }}>*/}
            {/*    <Select*/}
            {/*        labelId="demo-multiple-chip-label"*/}
            {/*        id="demo-multiple-chip"*/}
            {/*        multiple*/}
            {/*        value={personName}*/}
            {/*        onChange={handleChange}*/}
            {/*        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}*/}
            {/*        renderValue={(selected) => (*/}
            {/*            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>*/}
            {/*                {selected.map((value) => (*/}
            {/*                    <Chip key={value} label={value} />*/}
            {/*                ))}*/}
            {/*            </Box>*/}
            {/*        )}*/}
            {/*        // MenuProps={MenuProps}*/}
            {/*    >*/}
            {/*        /!*{formikData.map((item) => (*!/*/}
            {/*        /!*    <MenuItem*!/*/}
            {/*        /!*        key={item.tokenId}*!/*/}
            {/*        /!*        value={item.tokenName}*!/*/}
            {/*        /!*    >*!/*/}
            {/*        /!*        {item.name}*!/*/}
            {/*        /!*    </MenuItem>*!/*/}
            {/*        /!*))}*!/*/}
            {/*    </Select>*/}
            {/*</FormControl>*/}

            {/*<button className="btn" onClick={() => document.getElementById('token_search_sell').showModal()}>*/}
            {/*    {formikData.token ? formikData.token : "Select Items"}*/}
            {/*    <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.97168 1L6.20532 6L11.439 1" stroke="#AEAEAE"></path></svg>*/}
            {/*</button>*/}

            {/*<dialog id="token_search_sell" className="modal">*/}
            {/*    <div className="modal-box">*/}
            {/*        <h3 className="font-bold text-lg">Can Trade Token:</h3>*/}


            {/*        <form method="dialog" className='flex flex-col space-y-2'>*/}
            {/*            {displayDialog()}*/}
            {/*        </form>*/}


            {/*        <form method="dialog">*/}
            {/*            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>*/}
            {/*        </form>*/}
            {/*    </div>*/}


            {/*    <form method="dialog" className="modal-backdrop">*/}
            {/*        <button>close</button>*/}
            {/*    </form>*/}


            {/*</dialog>*/}


        </div>
    )
}

export default TokenSearch
