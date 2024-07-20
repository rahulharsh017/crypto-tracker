import React,{useEffect, useState} from 'react'
import Header from '../components/Common/Header'
import TabComponent from '../components/Dashboard/TabsComponent'
import axios from 'axios'

function DashBoard() {
  const [coins, setCoins] = useState([])

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1')
    .then((response) => {
      console.log(response)
      setCoins(response.data)
    })
    .catch((error) => {
      console.log(error);
    })
  },)
  return (
    <div>
        <Header />
        <TabComponent coins={coins} />
    </div>
  )
}

export default DashBoard