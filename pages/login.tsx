import type { GetStaticProps, NextPage } from "next";
import Image from "next/image";
import { BuiltInProviderType } from "next-auth/providers";
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
  signIn,
} from "next-auth/react";

interface props {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
}
const Login: NextPage<props> = ({ providers }) => {
  return (
    <div className="flex items-center flex-col bg-black min-h-screen w-full justify-center space-y-9">
      <Image
        src="/images/logoSpotigy.png"
        alt={"spotify Logo"}
        height={200}
        width={200}
      />
      {providers !== null &&
        Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button
              className="bg-[#18D860] text-white p-5 rounded-full"
              onClick={() => {
                signIn(provider.id, {
                  callbackUrl: "/",
                });
              }}
            >
              Login with {provider.name}
            </button>
          </div>
        ))}
    </div>
  );
};

export default Login;

export const getStaticProps: GetStaticProps = async (context) => {
  const providers = await getProviders(); // get the current proviedes
  return {
    props: {
      providers,
    },
  };
};
