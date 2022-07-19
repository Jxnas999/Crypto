import { onAuthStateChanged } from 'firebase/auth'
import React from 'react'
import { auth } from '../firebase'
export default function Watchlist() {
    console.log(auth)
    onAuthStateChanged(auth, user => {
        if(user) {
            const uid = user.uid
            console.log(uid)
        }
        
    })
    return (
    <div>

    </div>
  )
}
