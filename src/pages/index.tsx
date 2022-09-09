import type { NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import GroupSelect from "../components/GroupSelect";

const Home: NextPage = () => {
  const { data, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!data) {
    router.push("/api/auth/signin");
    return <></>;
  }

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav>
        <button onClick={() => signOut()}>Log Out</button>
      </nav>
      <main className="container flex flex-col items-center justify-center min-h-screen p-4 mx-auto">
        <GroupSelect session={data} />
      </main>
    </>
  );
};

export default Home;
