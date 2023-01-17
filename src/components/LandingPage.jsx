import Login from "./Login";
import Logout from "./Logout";
export default function LandingPage({ signIn, provider, session }) {
  return (
    <>
      {!session ? (
        <div>
        <Login session={session} signIn={signIn} provider={provider} />
        </div>
      ) : (
        <div>
          <Logout>log out </Logout>
        </div>
      )}
    </>
  );
}
