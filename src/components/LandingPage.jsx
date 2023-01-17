import Login from "./Login";

export default function LandingPage({ signIn, provider, session }) {
  return (
    <>
      {!session ? (
        <>
        not logged in
        <Login session={session} signIn={signIn} provider={provider} />
        </>
      ) : (
        <>
          logged in
          <button>log out </button>
        </>
      )}
    </>
  );
}
