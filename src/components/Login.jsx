import { signIn } from "next-auth/react";
import { CTABanner, Button } from "@primer/react-brand";
import React, {useState} from "react";

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
          Invite to Galaxy Bytes!
        </CTABanner.Heading>
        <CTABanner.Description>
          A demo repository to learn how to use GitHub Copilot.
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
