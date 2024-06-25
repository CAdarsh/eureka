
import localFont from 'next/font/local' 
import { Libre_Franklin } from "next/font/google";

const PlaywriteUSModern = localFont({ src: '../app/PlaywriteUSModern.ttf' })
const L_Franklin = Libre_Franklin({ subsets: ["latin"] });

const fonts = { PlaywriteUSModern: PlaywriteUSModern.className, L_Franklin: L_Franklin.className };

export default fonts;