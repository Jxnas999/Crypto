import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import CircularProgress from "@mui/material/CircularProgress";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { auth, firebase_db } from "../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { UserContext } from "../Helper/UserContext";
import { ListItemSecondaryAction } from "@mui/material";
import Watchlist from "./Watchlist";
export default function Display() {
  const [coins, setCoin] = useState(undefined);
  const [search, setSearch] = useState();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(2);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const url =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=10&page=1&sparkline=true&price_change_percentage=7d";
    axios
      .get(url)
      .then(async function (response) {
        setCoin(response.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, [user]);
  function updatePage() {
    setPage(page + 1);
  }
  async function handleButton() {
    setLoading(true);
    updatePage();
    //https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=20&page=4&sparkline=true&price_change_percentage=7d
    let url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=10&page=${page}&sparkline=true&price_change_percentage=7d`;
    await axios
      .get(url)
      .then(async function (response) {
        const newItem = response.data;
        const newCoins = [...coins];
        newCoins.push(...newItem);
        await setCoin(newCoins);
        setLoading(false);
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  return (
    <div id='maindisplay' className='h-auto pt-5 mx-auto font-poppins'>
      <div className='flex justify-center mb-4 md:justify-end md:max-w-[85%] '>
        <input
          autoComplete='off'
          className='h-12 text-lg text-black border-2 sm:px-5 sm:pr-8 rounded-3xl border-primary bg-red focus:outline-none '
          name='search'
          placeholder='Search'
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>
      <div className='flex flex-col justify-center h-auto overflow-x-auto rounded-div'>
        <table className='text-center table-auto mx-auto  min-w-[70%]'>
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
                    <td>
                      <Watchlist item={item} user={user} />
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
                        {item.market_cap_change_percentage_24h.toPrecision(3)}%
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
              })}
            {loading ? (
              <tr>
                <td colSpan={100}>
                  <CircularProgress className='mt-4 ' />
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
        <div className='flex items-center justify-center'>
          <button
            className='py-2 mb-4 px-10 hover:px-12 hover:bg-[#222223] duration-200 mt-4  text-lg w-100 sm:text-xl md:text-2xl rounded bg-black shadow-black shadow-2xl text-white'
            onClick={handleButton}
          >
            More
          </button>
        </div>
      </div>
    </div>
  );
}
