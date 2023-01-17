import { CTABanner,Button } from "@primer/react-brand";

export default function Login() {
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
          <Button onClick={()=>console.log("Clicked!")} >
            {"Login with GitHub"}
          </Button>
        </CTABanner.ButtonGroup>
      </CTABanner>
    </>
  );
}
