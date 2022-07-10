import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getFunctionName } from "@mui/utils/getDisplayName";
export default function CryptoPage() {
  const [coin, setCoin] = useState();
  const router = useRouter();
  let { id } = router.query;

  useEffect(() => {
    if (id) {
      const url = `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=true`;
      axios
        .get(url)
        .then((res) => {
          setCoin(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      id = router.query;
    }
  }, []);

  function test() {
    if (coin) {
      // html string
      const htmlStr = coin?.description.en;

      // make a new parser
      const parser = new DOMParser();

      // convert html string into DOM
      const document = parser.parseFromString(htmlStr, "text/html");
      console.log(document.body.innerHTML);
      return document.body.innerHTML;
    }
  }
  test();

  //coin?.description.en
  return (
    <div>
      <div className='flex justify-center mb-4'>
        <img
          src={coin?.image.large}
          alt='Cryptocurrency Image'
          className='w-[50px] md:w-[100px]'
        />
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: test() }}
        className='flex max-w-sm text-lg md:max-w-screen-md innerHTML font-poppins md:text-xl'
      />
      <div className='flex flex-col justify-center'>
        <h1>Market Data</h1>
        <table className='w-screen table-auto max-w-[1200px]'>
          <thead>
            <tr>
              <th>Price</th>
              <th>24h</th>
              <th>7d</th>
              <th>1 Year</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='text-center'>
                {coin?.market_data.current_price.eur}€
              </td>
              <td className='text-center'>
                {coin?.market_data.price_change_24h_in_currency.eur.toPrecision(
                  5
                )}
                €
              </td>
              <td className='text-center'>
                {coin?.market_data.price_change_percentage_7d_in_currency.eur}€
              </td>
              <td className='text-center'>
                {coin?.market_data.price_change_percentage_1y_in_currency.eur}€
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <h1>Social</h1>
        <p>
          <a href={coin?.links.homepage[0]}>Homepage</a>
        </p>
      </div>
    </div>
  );
}
