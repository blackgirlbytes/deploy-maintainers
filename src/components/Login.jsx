import { useSession, signIn, signOut } from "next-auth/react"
import { CTABanner, Button } from "@primer/react-brand";

export default function Login({provider}) {
    const oauthFlow = (e) => {
        e.preventDefault() 
        signIn(provider.id)
      }
  return (
    <>
      <CTABanner hasShadow={false} align="center" hasBackground={false}>
        <CTABanner.Heading>
          Join GitHub’s Maintainer Community!
        </CTABanner.Heading>
        <CTABanner.Description>
          The Maintainer Community is a private space for maintainers to connect
          with peers, preview GitHub features, and help us support the open
          source community.
        </CTABanner.Description>
        <CTABanner.ButtonGroup>
          <Button onClick={(e) => oauthFlow(e)}>
            {"Login with GitHub"}
          </Button>
        </CTABanner.ButtonGroup>
      </CTABanner>
    </>
  );
}
