"use client";
import { useEffect } from "react";
import localFont from "next/font/local";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { ToastContainer } from "react-toastify";
import { usePathname, useRouter } from "next/navigation";

const poppins = localFont({
  src: [
    {
      path: "../public/fonts/Poppins/Poppins-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Poppins/Poppins-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Poppins/Poppins-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/fonts/Poppins/Poppins-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/Poppins/Poppins-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Poppins/Poppins-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/Poppins/Poppins-Thin.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/fonts/Poppins/Poppins-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  display: "swap",
});

const RootLayout = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
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
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod
          ? n.callMethod.apply(n, arguments)
          : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = "2.0";
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(
      window,
      document,
      "script",
      "https://connect.facebook.net/en_US/fbevents.js"
    );
    fbq("init", "887480903063391");
    fbq("track", "PageView");
  }, []);

  // Logout user login expiry
  useEffect(() => {
    const checkExpiry = () => {
      const expiry = sessionStorage.getItem("loginExpiry");
      if (expiry && Date.now() > Number(expiry)) {
        sessionStorage.clear();
        window.location.href = "/";
      }
    };

    // Check immediately
    checkExpiry();

    // Set interval to check every 5 seconds
    const interval = setInterval(checkExpiry, 5000);

    // Also set a timeout for exact expiry if available
    const expiry = sessionStorage.getItem("loginExpiry");
    if (expiry) {
      const timeout = Number(expiry) - Date.now();
      if (timeout > 0) {
        const timer = setTimeout(() => {
          sessionStorage.clear();
          window.location.href = "/sign-in";
        }, timeout);
        return () => {
          clearInterval(interval);
          clearTimeout(timer);
        };
      }
    }

    return () => clearInterval(interval);
  }, []);

  return (
    <Provider store={store}>
      <html>
        <head>
          <title>
            Best Private Jet Charter in Nigeria | Private Jet Fastest Flights |
            On Demand Private Jets Africa
          </title>
          <meta
            name="google-site-verification"
            content="DTMaKYVmj2GFgTUwq63iVoDfAEWOIEM-MvGhViEQebo"
          />
          <meta
            name="description"
            content="Enjoy the latest and finest Private Jet Charter in the market, Top-tier concierge services and exclusive empty legs deal."
          />
        </head>

        <body>
          <ToastContainer />
          <div className={poppins.className}>{children}</div>

          {/* Facebook Pixel Noscript */}
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src="https://www.facebook.com/tr?id=887480903063391&ev=PageView&noscript=1"
            />
          </noscript>
        </body>
        <script></script>
      </html>
    </Provider>
  );
};

export default RootLayout;
