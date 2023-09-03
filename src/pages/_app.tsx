import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import Navbar from "~/components/navbar";
import { CustomCartContext } from "~/context/CartContext";
import "~/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <CustomCartContext>
        <Component {...pageProps} />
      </CustomCartContext>          
    </SessionProvider>
  );
};

export default MyApp;
