import React from 'react'
import "./style.css"
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import { Tooltip } from '@mui/material';
import { convertNumber } from '../../../functions/convertNumber';
import { Link } from 'react-router-dom';
function List({coin}) {
  return (
    <Link to= {`/coin/${coin.id}`}>
   <tr className='list-row'>
    <Tooltip title="Coin Logo">
    <td className="td-image">
        <img src={coin.image} className="coin-logo coin-image-td" />
        </td>
        </Tooltip>
        <Tooltip title="Coin Name">
        <td className='td-info'>
        <div className="name-col">
          <p className="coin-symbol td-p">{coin.symbol}</p>
          <p className="coin-name tp-p">{coin.name}</p>
        </div>
      </td>
      </Tooltip>
    <Tooltip title="Price Change in 24Hrs">
      {coin.price_change_percentage_24h > 0 ? (
        <td className="chip-flex">
          <div className="price-chip td-price-chip">
            {coin.price_change_percentage_24h.toFixed(2)}%
          </div>
          <div className="chip-icon td-icon">
            <TrendingUpRoundedIcon />
          </div>
        </td>
      ) : (
        <td className="chip-flex">
          <div className="price-chip chip-red">
            {coin.price_change_percentage_24h.toFixed(2)}%
          </div>
          <div className="chip-icon chip-red td-icon">
            <TrendingDownRoundedIcon />
          </div>
        </td>
      )}
      </Tooltip>
      <Tooltip title="Current Price">
  <td>
  <h3
          className="coin-price td-center-align"
          style={{
            color:
              coin.price_change_percentage_24h < 0
                ? "var(--red)"
                : "var(--green)",
          }}
        >
          ${coin.current_price.toLocaleString()}
        </h3>
  </td>
  </Tooltip>
        <td>
        <p className="total_volume td-right-align td-total_volume">
          Total Volume : ${coin.total_volume.toLocaleString()}
        </p>
        <p className="total_volume td-right-align desktop-mrkt">
          Market Cap : ${coin.market_cap.toLocaleString()}
        </p>
        <p className="total_volume td-right-align mobile-mrkt">
          Market Cap : ${convertNumber(coin.market_cap)}
        </p>
        </td>
   </tr>
   </Link>
  )
}

export default List