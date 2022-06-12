import React, { useEffect, useState } from "react";
import axios from "axios";
import { Sparklines, SparklinesLine } from "react-sparklines";
export default function Display() {
  const [coins, setCoin] = useState([{}]);

  useEffect(() => {
    const url =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=10&page=1&sparkline=true&price_change_percentage=7d";
    axios
      .get(url)
      .then(async function (response) {
        await setCoin(response.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);
  return (
    <div className='pt-5 font-poppins md:max-w-[70%] mx-auto h-screen'>
      <input
        className='w-full h-12 px-5 pr-16 text-lg text-black transition border-2 rounded-md border-primary bg-red focus:outline-none '
        type='search'
        name='search'
        placeholder='Search'
      />
      <button type='submit' class='absolute right-2 top-3 mr-4'></button>
      <div className='overflow-x-scroll rounded-div '>
        <table className='text-center table-auto md:min-w-full'>
          <thead className='text-[#151B54] pt-5 text-lg  shadow-xl border-b sm:text-xl md:text-2xl'>
            <tr className='mb-4'>
              <th className='p-4'>Name</th>
              <th className='p-4 whitespace-nowrap'>Price in €</th>
              <th className='p-4 whitespace-nowrap'>Change 24h</th>
              <th className='p-4 whitespace-nowrap'>Market Cap 24h</th>
              <th className='p-4 whitespace-nowrap'>Chart 7 Days</th>
            </tr>
          </thead>
          <tbody className='mt-4'>
            {coins.length > 2
              ? coins.map((item) => {
                  return (
                    <tr
                      className='text-[#151B54] font-bold text-base text-center shadow-md sm:text-base md:text-lg'
                      key={item.id}
                    >
                      <td className='py-2 ml-4 '>
                        <img
                          src={item.image}
                          alt='Chart'
                          className='w-[30px] h-[30px] mx-auto'
                        />
                        <p className='ml-3 font-semibold text-center'>
                          {item.name}
                        </p>
                      </td>
                      <td className='py-2 mt-4'>{item.current_price}€</td>
                      <td
                        className={
                          item.price_change_percentage_24h > 0
                            ? "mt-4 text-green-400 py-2"
                            : "mt-4 text-red-400 py-2"
                        }
                      >
                        <p className=''>
                          {item.price_change_percentage_24h.toPrecision(3)}%{" "}
                        </p>
                      </td>
                      <td
                        className={
                          item.market_cap_change_percentage_24h > 0
                            ? "mt-4 text-green-400 py-2"
                            : "mt-4 text-red-400 py-2"
                        }
                      >
                        <p>
                          {item.market_cap_change_percentage_24h.toPrecision(3)}
                          %
                        </p>
                      </td>
                      <td className='py-2 w-[150px] h-[100px]'>
                        <Sparklines
                          className='mx-auto '
                          data={item.sparkline_in_7d.price}
                        >
                          <SparklinesLine
                            color={
                              item.price_change_percentage_7d_in_currency > 0
                                ? "green"
                                : "red"
                            }
                          />
                        </Sparklines>
                      </td>
                    </tr>
                  );
                })
              : console.log("loading")}
          </tbody>
        </table>
      </div>
    </div>
  );
}
//'#2916F5'
