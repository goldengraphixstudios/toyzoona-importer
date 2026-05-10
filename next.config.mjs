/** @type {import('next').NextConfig} */
const isGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig = {
  output: "export",
  basePath: isGitHubPages ? "/toyzoona-importer-nextjs" : "",
  assetPrefix: isGitHubPages ? "/toyzoona-importer-nextjs/" : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
