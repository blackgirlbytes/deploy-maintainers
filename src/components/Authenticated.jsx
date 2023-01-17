import { CTABanner, Button } from "@primer/react-brand";
import { Link } from "@primer/react";
import { getUserHandleByEmail } from "../pages/api/dataRetrieval";
import { isUserEligible } from "../pages/api/checkRequirements";
import { useState, useEffect } from "react";
import ApplicationForm from "./ApplicationForm";

export default function Authenticated({ email }) {
  const [handle, setHandle] = useState("");
  const [loading, setLoading] = useState(false);
  const [navigating, setNavigating] = useState(false);
  const [eligible, setEligibility] = useState("not checked");

  const ownerForIssueRepo = "rizel-test-user"
  const issueRepo = "test"

  
  useEffect(() => {
    const getUsername = async (email) => {
      const handle = await getUserHandleByEmail(email);
      setHandle(handle);
    };
    getUsername(email);
  }, [email]);

  const inviteUser = async (handle) => {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: handle })
  };
  const response = await fetch('/api/inviteUser', requestOptions);
  const data = await response.json();
}

  const isEligible = async (e) => {
    e.preventDefault();
    setLoading(true);
    const shouldSendInvite = await isUserEligible(handle);
    if (shouldSendInvite) {
      setEligibility("eligible");
      await inviteUser(handle);
    } else {
      setEligibility("not eligible");
    }
  };

  const sendToMaintainerRepo = async () => {
    setNavigating(true);
    return location.href = "https://github.com/community/maintainers";
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
                <br />
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
              <CTABanner.ButtonGroup>
                <Button
                  disabled={navigating}
                  onClick={(e) => {
                    sendToMaintainerRepo(e);
                  }}
                >
                  {navigating ? "Navigating..." : "Maintainer Repo"}
                </Button>
              </CTABanner.ButtonGroup>
            </CTABanner>
          </div>
        );
        case "not eligible":
            return (
              <div>
                <ApplicationForm username={handle} />{" "}
              </div>
            );
    }
  };
  return <>{showSelectedOption()}</>;
}
