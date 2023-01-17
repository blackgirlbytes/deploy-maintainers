import { useSession, signIn, signOut } from "next-auth/react"
import { CTABanner, Button } from "@primer/react-brand";

export default function Logout({provider}) {
    const oauthFlow = (e) => {
        e.preventDefault() 
        signOut()
      }
  return (
    <>
      <CTABanner hasShadow={false} align="center" hasBackground={false}>
        <CTABanner.Heading>
          Logout
        </CTABanner.Heading>
        <CTABanner.Description>
          logging out
        </CTABanner.Description>
        <CTABanner.ButtonGroup>
          <Button onClick={(e) => oauthFlow(e)}>
            {"Logout with GitHub"}
          </Button>
        </CTABanner.ButtonGroup>
      </CTABanner>
    </>
  );
}
