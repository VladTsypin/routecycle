const isGitHubPages = process.env.GITHUB_ACTIONS === "true";

const nextConfig = {
  output: "export",
  basePath: isGitHubPages ? "/routecycle" : "",
  trailingSlash: true,
};

export default nextConfig;
