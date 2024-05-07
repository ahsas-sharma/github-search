const CONFIG = {
  GITHUB_USERNAME: import.meta.env.VITE_GITHUB_USERNAME,
  GITHUB_PASSWORD: import.meta.env.VITE_GITHUB_PASSWORD,
};
console.log("In config.js", CONFIG);
export default CONFIG;
