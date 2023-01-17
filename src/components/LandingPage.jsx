import Authenticated from "./Authenticated";
import AuthenticatedNavBar from "./AuthenticatedNavBar";
import Login from "./Login";
import NonAuthenticatedNavBar from "./NonAuthenticatedNavBar";
export default function LandingPage({ signIn, provider, session }) {
  return (
    <>
      {!session ? (
        <div>
        <NonAuthenticatedNavBar/>
        <Login session={session} signIn={signIn} provider={provider} />
        </div>
      ) : (
        <div>
          <AuthenticatedNavBar />
          <Authenticated email={session.user.email}/>
        </div>
      )}
    </>
  );
}
