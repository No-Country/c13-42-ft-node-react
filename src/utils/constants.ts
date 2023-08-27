import { env } from "~/env.mjs";


const production = {
    url: ''
  };
const development = {
    url: 'http://localhost:3000'
  };
  
export const baseUrl = env.NEXT_PUBLIC_ENV === 'development' ? development.url : production.url;