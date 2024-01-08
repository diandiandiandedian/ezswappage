import nextConfig from "../next.config.js";

export const BASE_URL = {
  dev: "https://testapi.ezswap.io/",
  test: "https://testapi.ezswap.io/",
  prod: "https://api.ezswap.io/",
}[nextConfig.publicRuntimeConfig.env.API];

export const REDIRECT_URL = {
  dev: "https://test.ezswap.io/",
  test: "https://test.ezswap.io/",
  prod: "https://ezswap.io/",
}[nextConfig.publicRuntimeConfig.env.API];

export const PROTOCOL_FEE = 10000000000000000;
