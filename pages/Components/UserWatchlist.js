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
  const [coins, setCoins] = useState(undefined);

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
        UserWatchlist.forEach((item) => {
          const url = `https://api.coingecko.com/api/v3/coins/${item}?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=true`;
          axios
            .get(url)
            .then(async function (response) {
              tempCoins.push(response.data);
            })
            .catch(function (err) {
              console.log(err);
            });
        });
        setCoins(tempCoins);
      }
    };
    fetchDatabse();
  }, []);

  console.log(coins);
  return (
    <>
      <Navbar />
      <div className='pt-5 font-poppins md:max-w-[70%]  mx-auto h-auto'>
        <div className='flex justify-center mt-8 mb-8 text-2xl sm:text-4xl md:text-5xl font-poppins'>
          <h1>My Coins</h1>
        </div>

        <div className='h-auto overflow-x-auto rounded-div'>
          <table className='text-center table-auto md:min-w-full'>
            <thead className='pt-5 text-lg text-white bg-black border-b shadow-xl sm:text-xl md:text-2xl'>
              <tr className='mb-4'>
                <th className='p-4'>Name</th>
                <th className='p-4 whitespace-nowrap'></th>

                <th className='p-4 whitespace-nowrap'>Price in €</th>
                <th className='p-4 whitespace-nowrap'>Change 24h</th>
                <th className='p-4 whitespace-nowrap'>Market Cap 24h</th>
                <th className='p-4 whitespace-nowrap'>Chart 7 Days</th>
              </tr>
            </thead>
            <tbody className='mt-4'>
              {coins &&
                coins.map((item) => {
                  console.log(item);
                  return <td>{item.name}</td>;
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
