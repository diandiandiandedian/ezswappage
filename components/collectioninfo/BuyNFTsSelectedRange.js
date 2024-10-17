import { useCollectionInfo } from "@/contexts/CollectionInfoContext";
import { useEffect, useState } from "react";

const NFTsSelectedRange = ({ radioRef, styleClass, min = 0, max, handleRangeChange, value }) => {
  const {
    selectedNfts
  } = useCollectionInfo();
  const [showRange, setShowRange] = useState(false)
  // const [numVal, setNumVal] = useState(0);

  // useEffect(() => {
  //   console.log('aaaa', selectedNFTs.length,selected1155NFTAmount,NFTList.length)
  //   if (selectedNFTs.length > NFTList.length || selected1155NFTAmount > NFTList.length){
  //     setNumVal(NFTList.length)
  //   }else {
  //     setNumVal(tokenId1155 ? isNaN(selected1155NFTAmount)?0 :selected1155NFTAmount : selectedNFTs.length);
  //   }
  // }, [radioRef, selectedNFTs.length,selected1155NFTAmount]);

  //increase or decrease NFTs checkbox when the radio bar in being dragged
  // function handleRangeChange(e) {
  //   console.log(e)
  //   // const numOfNFTByRange = parseInt(
  //   //   e.target.value === ""
  //   //     ? 0
  //   //     : e.target.value > NFTList.length
  //   //       ? NFTList.length
  //   //       : e.target.value
  //   // );
  //   // changeRangeValue(numOfNFTByRange);
  // }
  // border border-[#496C6D] border-solid w-full max-w-[400px] rounded-md

  return (
    <div className={`flex  items-center  mt-10 ml-6  py-1  ` + (max == 0 ? " filter grayscale" : "")}>

      {!showRange &&
        <div className="flex   border-[#00D5DA] border-solid border-[1px] rounded-md pr-8 pl-5 py-2 cursor-pointer" onClick={() => setShowRange(() => {
          if (max === 0) {
            return showRange;
          } else {
            return !showRange
          }
        })}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.0731 16.6649C13.4843 18.0783 13.0899 19.565 12.901 21.0845L12.7925 22L9.35016 20.1662V19.5486L9.41879 19.4196C9.42772 19.4008 9.43552 19.3816 9.44212 19.3619L8.89036 20.1086L8.37016 19.7558C7.65246 19.2661 6.95203 18.7516 6.27015 18.2131C5.88363 17.9138 5.52024 17.5857 5.18308 17.2317L4.86465 16.879L5.13367 16.4878C5.25308 16.3135 5.41916 16.0499 5.61956 15.7192L4.25386 16.2243L3.96014 15.9401C3.35347 15.3527 2.20327 14.0515 1.80934 13.3858L1.57052 12.9782L1.91366 12.6474C1.93179 12.6298 1.95009 12.6124 1.96856 12.5952H1.40993L0.0195312 10.0368V9.2709L0.532867 9.17208C1.93135 8.90608 3.31239 8.55543 4.66838 8.12207C5.95446 7.69795 6.99074 7.23403 7.67427 6.7454L7.84447 6.62461H8.54859L15.2233 13.088C15.27 13.1346 15.27 13.1346 15.3441 13.239C15.4298 13.3696 15.4707 13.5245 15.4608 13.6805C15.4509 13.8364 15.3907 13.9849 15.2892 14.1037C15.0627 14.5401 14.3916 15.8839 14.0731 16.6649ZM12.8831 16.2133C13.1988 15.4378 13.811 14.2039 14.0649 13.7125L8.11486 7.9505C7.33388 8.44188 6.30583 8.88384 5.08151 9.28737C4.17449 9.58256 3.2549 9.83764 2.32542 10.0519C2.03444 10.1205 1.79425 10.1727 1.56366 10.2221L2.18405 11.364H5.48505L4.09327 12.4566C3.91759 12.5939 3.65131 12.808 3.38504 13.0262L3.33013 13.0715L3.19974 13.1813C3.57033 13.6727 4.15092 14.3315 4.58328 14.7845L8.44839 13.3584L7.61113 14.8297C7.36395 15.2645 7.11184 15.6964 6.85486 16.1254L6.78897 16.2352C6.67368 16.4233 6.56937 16.5949 6.47329 16.7458C6.64486 16.9009 6.85211 17.0752 7.09094 17.2674C7.58122 17.6546 8.08145 18.0289 8.59114 18.3902L8.78055 18.1321C9.13055 17.6421 9.35702 17.3566 9.51761 17.2015C9.59707 17.1175 9.69282 17.0506 9.79901 17.0048C9.90521 16.959 10.0196 16.9353 10.1353 16.9352C10.5072 16.8501 10.8078 17.089 10.9149 17.3882C10.9561 17.5021 10.9698 17.6174 10.9739 17.7588C10.9794 17.9509 10.9602 18.2049 10.9231 18.4904C10.8809 18.8291 10.8167 19.1647 10.731 19.4951L11.7631 20.0441C11.9923 18.7264 12.3766 17.4541 12.8831 16.2147V16.2133ZM16.8553 12.2548L16.6741 12.436H16.0537L9.45997 5.80657V5.18892L9.6384 5.00774C11.0068 3.63244 12.8749 3.42107 14.6318 4.27754L18.2924 0.59635C19.0816 -0.196987 20.4583 -0.19836 21.2447 0.593605C22.0312 1.38282 22.0298 2.76224 21.2434 3.55283L17.5786 7.23814C18.431 9.00325 18.2237 10.8795 16.8553 12.2548ZM16.3269 7.50168L16.2459 7.3603V6.83324L20.3718 2.68675C20.6806 2.37518 20.6806 1.77126 20.3718 1.46106C20.0657 1.15361 19.4714 1.15361 19.1639 1.46243L15.038 5.61167H14.5096L14.3668 5.52931C13.1453 4.82931 11.9059 4.81558 10.9176 5.52657L16.3337 10.9729C17.0378 9.97777 17.0255 8.73148 16.3269 7.5003V7.50168Z" fill="#00D5DA" />
          </svg>
          <span className="text-[#00D5DA] ml-3 font-bold">SWEEP</span>
        </div>
      }

      {
        showRange &&
        <div className="flex  items-center">
          <div className=" flex   border-[#00D5DA] ">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.0731 16.6649C13.4843 18.0783 13.0899 19.565 12.901 21.0845L12.7925 22L9.35016 20.1662V19.5486L9.41879 19.4196C9.42772 19.4008 9.43552 19.3816 9.44212 19.3619L8.89036 20.1086L8.37016 19.7558C7.65246 19.2661 6.95203 18.7516 6.27015 18.2131C5.88363 17.9138 5.52024 17.5857 5.18308 17.2317L4.86465 16.879L5.13367 16.4878C5.25308 16.3135 5.41916 16.0499 5.61956 15.7192L4.25386 16.2243L3.96014 15.9401C3.35347 15.3527 2.20327 14.0515 1.80934 13.3858L1.57052 12.9782L1.91366 12.6474C1.93179 12.6298 1.95009 12.6124 1.96856 12.5952H1.40993L0.0195312 10.0368V9.2709L0.532867 9.17208C1.93135 8.90608 3.31239 8.55543 4.66838 8.12207C5.95446 7.69795 6.99074 7.23403 7.67427 6.7454L7.84447 6.62461H8.54859L15.2233 13.088C15.27 13.1346 15.27 13.1346 15.3441 13.239C15.4298 13.3696 15.4707 13.5245 15.4608 13.6805C15.4509 13.8364 15.3907 13.9849 15.2892 14.1037C15.0627 14.5401 14.3916 15.8839 14.0731 16.6649ZM12.8831 16.2133C13.1988 15.4378 13.811 14.2039 14.0649 13.7125L8.11486 7.9505C7.33388 8.44188 6.30583 8.88384 5.08151 9.28737C4.17449 9.58256 3.2549 9.83764 2.32542 10.0519C2.03444 10.1205 1.79425 10.1727 1.56366 10.2221L2.18405 11.364H5.48505L4.09327 12.4566C3.91759 12.5939 3.65131 12.808 3.38504 13.0262L3.33013 13.0715L3.19974 13.1813C3.57033 13.6727 4.15092 14.3315 4.58328 14.7845L8.44839 13.3584L7.61113 14.8297C7.36395 15.2645 7.11184 15.6964 6.85486 16.1254L6.78897 16.2352C6.67368 16.4233 6.56937 16.5949 6.47329 16.7458C6.64486 16.9009 6.85211 17.0752 7.09094 17.2674C7.58122 17.6546 8.08145 18.0289 8.59114 18.3902L8.78055 18.1321C9.13055 17.6421 9.35702 17.3566 9.51761 17.2015C9.59707 17.1175 9.69282 17.0506 9.79901 17.0048C9.90521 16.959 10.0196 16.9353 10.1353 16.9352C10.5072 16.8501 10.8078 17.089 10.9149 17.3882C10.9561 17.5021 10.9698 17.6174 10.9739 17.7588C10.9794 17.9509 10.9602 18.2049 10.9231 18.4904C10.8809 18.8291 10.8167 19.1647 10.731 19.4951L11.7631 20.0441C11.9923 18.7264 12.3766 17.4541 12.8831 16.2147V16.2133ZM16.8553 12.2548L16.6741 12.436H16.0537L9.45997 5.80657V5.18892L9.6384 5.00774C11.0068 3.63244 12.8749 3.42107 14.6318 4.27754L18.2924 0.59635C19.0816 -0.196987 20.4583 -0.19836 21.2447 0.593605C22.0312 1.38282 22.0298 2.76224 21.2434 3.55283L17.5786 7.23814C18.431 9.00325 18.2237 10.8795 16.8553 12.2548ZM16.3269 7.50168L16.2459 7.3603V6.83324L20.3718 2.68675C20.6806 2.37518 20.6806 1.77126 20.3718 1.46106C20.0657 1.15361 19.4714 1.15361 19.1639 1.46243L15.038 5.61167H14.5096L14.3668 5.52931C13.1453 4.82931 11.9059 4.81558 10.9176 5.52657L16.3337 10.9729C17.0378 9.97777 17.0255 8.73148 16.3269 7.5003V7.50168Z" fill="#00D5DA" />
            </svg>
            <span className="text-[#00D5DA] ml-2 font-bold">SWEEP</span>
          </div>
          <div className="ml-5 border border-[#496C6D] border-solid w-full max-w-[400px] rounded-md flex  items-center h-[16px] overflow-hidden">
            {/* <input
              type="range"
              ref={radioRef}
              onChange={handleRangeChange}
              className="range range-primary range-xs"
            /> */}
            {/* <input type="range" min="0" max="10" class="range range-primary range-xs"></input> */}
            <input
              type="range"
              min={min}
              max={max ? max : 0}
              ref={radioRef}
              value={value}
              onChange={(e) => {
                if (handleRangeChange) {
                  handleRangeChange(e)
                }
              }}
              className="range range-primary range-xs flex-1"
            />
            <input
              type="text"
              min={min}
              max={max ? max : 0}
              value={value || 0}
              onChange={(e) => {
                if (handleRangeChange) {
                  handleRangeChange(e)
                }
              }}
              className="mr-1 text-base text-center bg-black border-l-2 outline-none w-11 sm:text-base lg:text-base border-l-solid"
            >

            </input>
          </div>
        </div>
      }


    </div>
  );
};

export default NFTsSelectedRange;
