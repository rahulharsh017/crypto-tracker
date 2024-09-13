import React, { useEffect, useState } from "react";
import Header from "../components/Common/Header";
import SelectCoins from "../components/Compare/SelectCoins";
import SelectDays from "../components/Coin/SelectDays";
import { getCoinData } from "../functions/getCoinData";
import { setCoinObject } from "../functions/setCoinObject";
import { getCoinPrices } from "../functions/getCoinPrices";
import Loader from "../components/Common/Loader";
import List from "../components/Dashboard/List";
import CoinInfo from "../components/Coin/CoinInfo";
import { settingChartData } from "../functions/settingChartData";
import LineChart from "../components/Coin/LineChart";
import TogglePriceType from "../components/Coin/TogglePriceType";
import Footer from "../components/Common/Footer";

function ComparePage() {
  const [crypto1, setcrypto1] = useState("bitcoin");
  const [crypto2, setcrypto2] = useState("ethereum");
  const [days, setDays] = useState(30);
  const [crypto1Data, setCrypto1Data] = useState({});
  const [crypto2Data, setCrypto2Data] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [priceType, setPriceType] = useState("prices");
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    getData();
  }, [crypto1, crypto2, days, priceType]);

  async function getData() {
    setLoading(true);
    const data1 = await getCoinData(crypto1);
    if (data1) {
      const data2 = await getCoinData(crypto2);
      setCoinObject(data1, setCrypto1Data);
      if (data2) {
        setCoinObject(data2, setCrypto2Data);
        const prices1 = await getCoinPrices(crypto1, days, priceType);
        const prices2 = await getCoinPrices(crypto2, days, priceType);
        settingChartData(setChartData, prices1, prices2);
        console.log(prices1, prices2);
        setLoading(false);
      }
    }
  }

  async function handleDaysChange(event) {
    setLoading(true);
    setDays(event.target.value);
    const prices1 = await getCoinPrices(crypto1, days, priceType);
    const prices2 = await getCoinPrices(crypto2, days, priceType);
    setChartData(setChartData, prices1, prices2);
    setLoading(false);
  }
  const handleCoinChange = async (event, isCoin2) => {
    setLoading(true);
    if (isCoin2) {
      setcrypto2(event.target.value);
      const data = await getCoinData(event.target.value);
      setCoinObject(data, setCrypto2Data);
      const prices1 = await getCoinPrices(crypto1, days, priceType);
      const prices2 = await getCoinPrices(crypto2, days, priceType);
      if (prices1.length > 0 && prices2.length > 0) {
        console.log(prices1, prices2);
        setLoading(false);
      }
    } else {
      setcrypto1(event.target.value);
      const data = await getCoinData(event.target.value);
      setCoinObject(data, setCrypto1Data);
    }
  };

  const handlePriceTypeChange = async (event,newType) =>{
    setLoading(true);
    setPriceType(newType);
    const prices1 = await getCoinPrices(crypto1, days, newType);
    const prices2 = await getCoinPrices(crypto2, days, newType);
    settingChartData(setChartData,prices1,prices2);
    setLoading(false);
}

  return (
    <div>
      <Header />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="coin-days-flex">
            <SelectCoins
              crypto1={crypto1}
              crypto2={crypto2}
              handleCoinChange={handleCoinChange}
            />
            <SelectDays
              days={days}
              handleDaysChange={handleDaysChange}
              noPtag={true}
            />
          </div>
          <div className="grey-wrapper">
            <List coin={crypto1Data} />
          </div>
          <div className="grey-wrapper">
            <List coin={crypto2Data} />
          </div>
          <div className="grey-wrapper">
          <TogglePriceType
              priceType={priceType}
              handlePriceTypeChange={handlePriceTypeChange}
            />
            <LineChart
              chartData={chartData}
              priceType={priceType}
              multiAxis={true}
            />
          </div>
          <CoinInfo heading={crypto1Data.name} desc={crypto1Data.desc} />
          <CoinInfo heading={crypto2Data.name} desc={crypto2Data.desc} />
        </>
      )}
      <Footer />
    </div>
  );
}

export default ComparePage;
