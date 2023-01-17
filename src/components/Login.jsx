import { signIn } from "next-auth/react";
import { CTABanner, Button } from "@primer/react-brand";

export default function Login({ provider }) {
  const [loading, setLoading] = useState(false);
  const oauthFlow = (e) => {
    e.preventDefault();
    setLoading(true);
    signIn(provider.id);
  };
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
          <Button disabled={loading} onClick={(e) => oauthFlow(e)}>
            {loading ? "Loading..." : "Login with GitHub"}
          </Button>
        </CTABanner.ButtonGroup>
      </CTABanner>
    </>
  );
}
