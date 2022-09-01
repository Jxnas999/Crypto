import { onAuthStateChanged } from "firebase/auth";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { UserContext } from "../../lib/UserContext";
import { auth, firebase_db } from "../../lib/firebase";
import {
  collection,
  deleteDoc,
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
  const [isWatchlisted, setIsWatchlisted] = useState();
  const [open, setOpen] = useState();
  useEffect(() => {
    const fetchDatabse = async () => {
      if (user.uid) {
        const docRef = doc(firebase_db, user.uid, item.item.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setIsWatchlisted(true);
        } else {
          // doc.data() will be undefined in this case
        }
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
          //Update Database
          await deleteDoc(doc(firebase_db, user.uid, item.item.id));
          setIsWatchlisted(false);
        } else {
          await setDoc(doc(firebase_db, user.uid, item.item.id), {
            user: user.uid,
            coin: item.item.id,
            liked: true,
          });
          setIsWatchlisted(true);
        }
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    } else {
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 3000);
      console.log("test");
    }
  }
  return (
    <div>
      {user.uid && isWatchlisted ? (
        <AiFillHeart onClick={(e) => handleWatchlist(item)} />
      ) : (
        <AiOutlineHeart onClick={(e) => handleWatchlist(item)} />
      )}
      {open && (
        <div class='ease-in duration-500 '>
          <div
            class=' fixed w-[200px] lg:w-[400px] right-5 top-5 shadow-lg font-bold bg-[#02bcff] rounded-lg p-4 mb-4 text-sm text-ellipsis'
            role='alert'
          >
            <div>
              <span class='font-medium'></span> You need to be logged in
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
