import React, { useEffect, useState } from "react";
import Header from "../components/Common/Header";
import TabComponent from "../components/Dashboard/TabsComponent";
import SearchComponent from "../components/Dashboard/SearchComponent";
import PaginationComponent from "../components/Dashboard/Pagination";
import Loader from "../components/Common/Loader";
import BackToTop from "../components/Common/BackToTop";
import { get100Coins } from "../functions/get100Coins";
import Footer from "../components/Common/Footer";

function DashBoard() {
  const [coins, setCoins] = useState([]);
  const [paginatedCoins, setPaginatedCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const onSearchChange = (e) => {
    console.log(e.target.value);
    setSearch(e.target.value);
  };

  let filltercoins = coins.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.symbol.toLowerCase().includes(search.toLowerCase())
  );

  const handlePageChange = (event, value) => {
    setPage(value);
    let initialCount = (value - 1) * 10;
    setPaginatedCoins(coins.slice(initialCount, initialCount + 10));
  };

  useEffect(() => {
    getData();
  },[]);

  const getData = async () =>{
    const myCoins = await get100Coins();
    if(myCoins){
      setCoins(myCoins);
      setPaginatedCoins(myCoins.slice(0,10));
      setIsLoading(false);
    }
  };
  return (
    <>
      <Header />
      <BackToTop />
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <SearchComponent search={search} onSearchChange={onSearchChange} />
          <TabComponent coins={search ? filltercoins : paginatedCoins} />
          {!search && (
            <PaginationComponent
              page={page}
              handlePageChange={handlePageChange}
            />
          )}
        </div>
      )}
      <Footer />
    </>
  );
}

export default DashBoard;
