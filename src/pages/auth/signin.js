import {
    signIn,
    getProviders,
    useSession,
  } from 'next-auth/react';
  import Login from '../../components/Login';
  import Head from 'next/head'
  const Signin = ({ providers }) => {
    const { data: session } = useSession();
    return (
      <div style={{ overflow: "hidden", position: "relative" }}>
      <Head>
        <title>Maintainers Community</title>
      </Head>
        {providers &&
          Object.values(providers).map((provider) => (
            <div key={provider.name} style={{ marginBottom: 0 }}>
              <Login
                session={session}
                signIn={signIn}
                provider={provider}
              />
            </div>
          ))}
      </div>
    );
  };
  
  export default Signin;
  
  export async function getServerSideProps(context) {
    const providers = await getProviders();
    return {
      props: {
        providers,
      },
    };
  }
  