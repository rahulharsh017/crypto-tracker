import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Common/Header";
import Loader from "../components/Common/Loader";
import axios from "axios";
import { settingCoinObject } from "../functions/setCoinObject";
import List from "../components/Dashboard/List";
import CoinInfo from "../components/CoinInfo";

function CoinPage() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [coinData, setCoinData] = useState();
  const [days,setDays] = useState(30)
  useEffect(() => {
    if (id) {
      axios
        .get(`https://api.coingecko.com/api/v3/coins/${id}`)
        .then((response) => {
          // console.log(response);
          settingCoinObject(response.data, setCoinData);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });

        axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily&precision=2`)
        .then((response) => {
          console.log(response.data.prices);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  }, [id]);

  return (
    <div>
      <Header />
      {isLoading ? (<Loader />) : (<>
      <div className="grey-wrapper">
      <List coin={coinData} />
      </div>
      <CoinInfo heading={coinData.name} desc={coinData.desc} />
      </>)}
    </div>
  );
}

export default CoinPage;
