import { CTABanner, Button } from "@primer/react-brand";
import { Link } from "@primer/react";
import { getUserHandleByEmail } from "../pages/api/dataRetrieval";
import { isUserEligible } from "../pages/api/checkRequirements";
import { inviteUser } from "../pages/api/repoActions";
import { useState, useEffect } from "react";


export default function Authenticated({ email }) {
  const [handle, setHandle] = useState("");
  const [loading, setLoading] = useState(false);
  const [eligible, setEligibility] = useState("not checked");
  const owner = "galaxy-bytes";
  const repo = "maintainers";

  useEffect(() => {
    const getUsername = async (email) => {
      const handle = await getUserHandleByEmail(email);
      setHandle(handle);
    };
    getUsername(email);
  }, [email]);

  const isEligible = async (e) => {
    e.preventDefault();
    setLoading(true);
    const shouldSendInvite = await isUserEligible(handle);
    if (shouldSendInvite) {
      setEligibility("eligible");
      await inviteUser(handle, owner, repo);
    } else {
      setEligibility("not eligible");
    }
  };

  const showSelectedOption = () => {
    switch (eligible) {
      case "not checked":
        return (
          <div>
            <CTABanner hasShadow={false} align="center" hasBackground={false}>
              <CTABanner.Heading>Hi, {handle}</CTABanner.Heading>
              <CTABanner.Description>
                To join the maintainers repository, you must be a maintainer of
                an active repository.
                <Link href="https://github.com/logout" underline>
                  Not you? Sign out of GitHub and try again
                </Link>
              </CTABanner.Description>
              <CTABanner.ButtonGroup>
                <Button
                  disabled={loading}
                  onClick={(e) => {
                    isEligible(e);
                  }}
                >
                  {loading ? "Loading.." : "Apply to join"}
                </Button>
              </CTABanner.ButtonGroup>
            </CTABanner>
          </div>
        );
      case "eligible":
        return (
          <div>
            <CTABanner hasShadow={false} align="center" hasBackground={false}>
              <CTABanner.Heading>
                You&apos;ve been invited
              </CTABanner.Heading>
              <CTABanner.Description>
                Check your inbox for an invitation to the community/maintainers
                repository or click the button below! You&apos;ll have 7 days to
                accept the invitation and join the Maintainer Community.
              </CTABanner.Description>
            </CTABanner>
          </div>
        );
    }
  };
  return <>{showSelectedOption()}</>;
}
