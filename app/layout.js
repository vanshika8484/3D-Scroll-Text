import '../app/globals.css';
// import LiquidHover from './components/LiquidHover'
export const metadata = {
  title: "3D Text Scroll Animation in Framer by Framer University",
  description: "3D Text Scroll Animation Demo for Framer. Created by Framer University.",
  openGraph: {
    type: "website",
    title: "3D Text Scroll Animation in Framer by Framer University",
    description: "3D Text Scroll Animation Demo for Framer. Created by Framer University.",
    url: "https://3d-text.learnframer.site/",
    images: [
      {
        url: "https://framerusercontent.com/images/mm8q2P9kY8roYbdBOFRmYR6Rlc.jpg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "3D Text Scroll Animation in Framer by Framer University",
    description: "3D Text Scroll Animation Demo for Framer. Created by Framer University.",
    images: ["https://framerusercontent.com/images/mm8q2P9kY8roYbdBOFRmYR6Rlc.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-US">
      <body>
        {/* <LiquidHover /> */}
        {children}
        </body>
    </html>
  );
}