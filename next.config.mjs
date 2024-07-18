// next.config.js

/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  reactStrictMode: false,
  experimental: {
    appDir: true,
    esmExternals: false,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [{ loader: "@svgr/webpack", options: { icon: true } }],
    });

    return config;
  },
  images: {
    domains: ["swiperjs.com"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
    ],
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;
