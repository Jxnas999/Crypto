import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { firebase_db } from "../firebase";
import axios from "axios";
import { UserContext } from "../Helper/UserContext";
import Navbar from "./Navbar";
import { Sparklines, SparklinesLine } from "react-sparklines";

export default function UserWatchlist() {
  const { user } = useContext(UserContext);
  const [watchlist, setWatchlist] = useState("");
  const [coins, setCoins] = useState();

  useEffect(() => {
    const fetchDatabse = async () => {
      let UserWatchlist = [];
      if (user.uid) {
        const querySnapshot = await getDocs(collection(firebase_db, user.uid));
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          UserWatchlist.push(doc.data().coin);
        });
        setWatchlist(UserWatchlist);
        //https://api.coingecko.com/api/v3/coins/binancecoin?localization=false
        let tempCoins = [];
        await UserWatchlist.forEach((item) => {
          const url = `https://api.coingecko.com/api/v3/coins/${item}?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=true`;
          axios
            .get(url)
            .then(async function (response) {
              tempCoins.push(response.data);
              await setCoins(tempCoins);
            })
            .catch(function (err) {
              console.log(err);
            });
        });
      }
    };
    fetchDatabse();
  }, []);
  console.log(coins);

  return (
    <>
      <Navbar />
      <div className='pt-5 font-poppins lg:max-w-[70%]  mx-auto h-auto'>
        <div className='h-auto overflow-x-auto rounded-div'>
          <table className='text-center table-auto md:min-w-full'>
            <thead className='pt-5 text-lg text-white bg-black border-b shadow-xl sm:text-xl md:text-2xl'>
              <tr className='mb-4'>
                <th className='p-4'>Name</th>
                <th className='p-4 whitespace-nowrap'>Price in €</th>
                <th className='p-4 whitespace-nowrap'>Change 24h</th>
                <th className='p-4 whitespace-nowrap'>Market Cap 24h</th>
                <th className='p-4 whitespace-nowrap'>Chart 7 Days</th>
              </tr>
            </thead>
            <tbody className='mt-4'>
              {coins &&
                coins.map((item) => {
                  return (
                    <tr className='text-[#151B54] font-bold text-base text-center shadow-md sm:text-base md:text-lg'>
                      <td>{item.name}</td>
                      <td>{item.market_data.current_price.eur}</td>
                      <td>
                        {item.market_data.price_change_percentage_24h.toPrecision(
                          4
                        )}
                        %
                      </td>
                      <td>
                        {item.market_data.market_cap_change_percentage_24h}%
                      </td>
                      <td className='py-2 w-[150px] h-[100px]'>
                        <Sparklines
                          className='mx-auto '
                          data={item.market_data.sparkline_7d.price}
                        >
                          <SparklinesLine
                            color={
                              item.market_data.price_change_percentage_7d > 0
                                ? "green"
                                : "red"
                            }
                          />
                        </Sparklines>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

{
}
