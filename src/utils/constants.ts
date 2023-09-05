import { env } from "~/env.mjs";


const production = {
    url: 'https://c13-42-ft-node-react.vercel.app'
  };
const development = {
    url: 'http://localhost:3000'
  };
  
export const baseUrl = env.NEXT_PUBLIC_ENV === 'development' ? development.url : production.url;