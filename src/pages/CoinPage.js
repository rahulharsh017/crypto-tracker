import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Common/Header";
import Loader from "../components/Common/Loader";
import LineChart from "../components/Coin/LineChart";
import { settingCoinObject } from "../functions/setCoinObject";
import List from "../components/Dashboard/List";
import CoinInfo from "../components/Coin/CoinInfo";
import { getCoinData } from "../functions/getCoinData";
import { getCoinPrices } from "../functions/getCoinPrices";
import SelectDays from "../components/Coin/SelectDays";
import { settingChartData } from "../functions/settingChartData";
import TogglePriceType from "../components/Coin/TogglePriceType";


function CoinPage() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [coinData, setCoinData] = useState();
  const [days,setDays] = useState(30);
  const [charData,setChartData] = useState({});
  const [priceType,setPriceType] = useState("prices");

  useEffect(() => {
    if (id) {
        getData();
    }
  }, [id]);

  async function getData(){
    const data = await getCoinData(id);
    if(data){
      settingCoinObject(data,setCoinData);
      const prices = await getCoinPrices(id,days,priceType);
      if(prices.length > 0){
        console.log(prices);
        settingChartData(setChartData,prices);
        setIsLoading(false);
      }
    } 
  }

  const handleDaysChange = async (event) => {
    setIsLoading(true);
    setDays(event.target.value);
    const prices = await getCoinPrices(id,event.target.value,priceType);
    if(prices.length > 0){
      console.log(prices);
      settingChartData(setChartData,prices);
      setIsLoading(false);
    }
  };

  const handlePriceTypeChange = async (event,newType) =>{
      setIsLoading(true);
      setPriceType(newType);
      const prices = await getCoinPrices(id,days,newType);
    if(prices.length > 0){
      console.log(prices);
      settingChartData(setChartData,prices);
      setIsLoading(false);
    }
  }

  return (
    <div>
      <Header />
      {isLoading ? (<Loader />) : (<>
      <div className="grey-wrapper">
      <List coin={coinData} />
      </div>
      <div className="grey-wrapper">
      <SelectDays days={days} handleDaysChange={handleDaysChange} />
      <TogglePriceType priceType={priceType} handlePriceTypeChange={handlePriceTypeChange}/>
       <LineChart chartData={charData} priceType={priceType} />
      </div>
      <CoinInfo heading={coinData.name} desc={coinData.desc} />
      </>)}
    </div>
  );
}

export default CoinPage;
