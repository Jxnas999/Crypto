import { onAuthStateChanged } from "firebase/auth";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { UserContext } from "../Helper/UserContext";
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

export default function Watchlist(item) {
  const { user } = useContext(UserContext);
  const [watchlistItems, setWatchlistItems] = useState(undefined);
  useEffect(() => {
    const fetchDatabse = async () => {
      if (user != "Profile") {
        const q = query(
          collection(firebase_db, user.uid),
          where("liked", "==", true)
        );

        const querySnapshot = await getDocs(q);
        let allLikedItems = [];
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          allLikedItems.push(doc.data());
        });
        setWatchlistItems(allLikedItems);
      }
    };
    fetchDatabse();
  }, []);

  async function handleWatchlist(item) {
    if (user.uid) {
      try {
        const docRef = doc(firebase_db, user.uid, item.item.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const like = !docSnap.data().liked;

          //Update Database
          await updateDoc(docRef, {
            liked: like,
          });
        } else {
          await setDoc(doc(firebase_db, user.uid, item.id), {
            user: user.uid,
            coin: item.id,
            liked: true,
          });
        }
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  }
  return (
    <div>
      {user.uid &&
      watchlistItems?.find((element) => element.coin == item.item.id) ? (
        <AiFillHeart onClick={(e) => handleWatchlist(item)} />
      ) : (
        <AiOutlineHeart onClick={(e) => handleWatchlist(item)} />
      )}
    </div>
  );
}
