import { QRCode } from "react-qr-svg";
import { useSelector } from 'react-redux'
import { selectResQRCode } from '../slices/sliderSlice';

const ScanQR = () => {

    const resQRCode = useSelector(selectResQRCode);

    return (
        <div className='flex flex-col justify-center items-center'>
            {(!resQRCode || resQRCode === 'fetching') && <div className="">
                <p className="text-black font-thin text-sm">מכין קוד QR במיוחד עבורך</p>
                <div className="svg-loader m-5">
                    <svg className="svg-container" height="100" width="100" viewBox="0 0 100 100">
                        <circle className="loader-svg bg" cx="50" cy="50" r="45"></circle>
                        <circle className="loader-svg animate" cx="50" cy="50" r="45"></circle>
                    </svg>
                </div>
            </div>}
            {resQRCode && resQRCode != 'fetching' && <div className="flex flex-col justify-center items-center">
                <div className="m-2">
                    <p className="text-red-500 font-bold text-sm text-center">לתשומת ליבך! מיד לאחר סריקת הקוד, ההודעות יתחילו להישלח אל רשימת אנשי הקשר.</p>
                    <p className="text-red-500 font-bold text-sm text-center">לא ניתן יהיה לעצור את תהליך שליחת ההודעות עד לסיומו.</p>
                </div>
                <div className="bg-[#55cd6c] p-5 shadow-md rounded-3xl">
                    <QRCode bgColor="#FFFFFF" fgColor="#000000" level="Q" style={{ width: 256, borderRadius: '10px' }} value={resQRCode} />
                </div>
            </div>}
        </div>
    )
}

export default ScanQR