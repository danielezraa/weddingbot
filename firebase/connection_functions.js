import { ref, onValue, get } from "firebase/database";

export async function createListenersOnConnection(db, dispatch, setResQRCode, sessionId) {
    console.log(`connections/${(new Date()).toISOString().split('T')[0]}/${sessionId}`)
    const firstSnapshot = await get(ref(db, `connections/${(new Date()).toISOString().split('T')[0]}/${sessionId}`));
    console.log("saving firstSnapshot", firstSnapshot.val()?.QR)
    dispatch(setResQRCode(firstSnapshot.val()?.QR));

    onValue(ref(db, `connections/${(new Date()).toISOString().split('T')[0]}/${sessionId}`), (snapshot) => {
        console.log("onValue updating QR!", snapshot.val()?.QR)
        dispatch(setResQRCode(snapshot.val()?.QR));
    })
}