import Login from "./Login";

export default function LandingPage({ signIn, provider, session }) {
  return (
    <>
      {!session ? (
        <div>
        not logged in
        <Login session={session} signIn={signIn} provider={provider} />
        </div>
      ) : (
        <div>
          logged in
          <button>log out </button>
        </div>
      )}
    </>
  );
}
