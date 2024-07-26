"use client";
import { useEffect } from "react";
import { Poppins } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store } from "@/redux/store";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

const RootLayout = ({ children }) => {
  useEffect(() => {
    // Initialize Google Tag Manager
    const gtagScript = document.createElement("script");
    gtagScript.src = "https://www.googletagmanager.com/gtag/js?id=G-1L9YDVPFYH";
    gtagScript.async = true;
    document.head.appendChild(gtagScript);

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag("js", new Date());
    gtag("config", "G-1L9YDVPFYH");

    // Initialize Facebook Pixel
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments) };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s)
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '887480903063391');
    fbq('track', 'PageView');
  }, []);

  return (
    <Provider store={store}>
      <html>
        <head>
          <title>
            Enjoy the latest and finest Private Jets in the market, Top-tier concierge services and exclusive empty legs deal.
          </title>
        </head>

        <body>

          <div className={poppins.className}>

            {children}
          </div>

          {/* Facebook Pixel Noscript */}
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              src="https://www.facebook.com/tr?id=887480903063391&ev=PageView&noscript=1"
            />
          </noscript>
        </body>
        <script>
          
        </script>
      </html>
      
    </Provider>
  );
};

export default RootLayout;
