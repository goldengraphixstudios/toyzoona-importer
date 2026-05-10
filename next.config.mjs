/** @type {import('next').NextConfig} */
const isGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isGitHubPages ? "/toyzoona-importer" : "",
  assetPrefix: isGitHubPages ? "/toyzoona-importer/" : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
