import { useSession, signIn, signOut } from "next-auth/react"
import { CTABanner, Button } from "@primer/react-brand";

export default function Login() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )

//   return (
//     <>
//       <CTABanner hasShadow={false} align="center" hasBackground={false}>
//         <CTABanner.Heading>
//           Join GitHub’s Maintainer Community!
//         </CTABanner.Heading>
//         <CTABanner.Description>
//           The Maintainer Community is a private space for maintainers to connect
//           with peers, preview GitHub features, and help us support the open
//           source community.
//         </CTABanner.Description>
//         <CTABanner.ButtonGroup>
//           <Button onClick={() => console.log("Clicked!")}>
//             {"Login with GitHub"}
//           </Button>
//         </CTABanner.ButtonGroup>
//       </CTABanner>
//     </>
//  );
}
