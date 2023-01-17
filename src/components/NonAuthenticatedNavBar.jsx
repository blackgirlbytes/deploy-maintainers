import { SubdomainNavBar } from "@primer/react-brand";
import { Box } from "@primer/react";

export default function NonAuthenticatedNavBar({}) {
  return (
    <Box sx={{ position: "relative", overflowX: "scroll" }}>
      <SubdomainNavBar title="Maintainers Community" fixed={false} />
    </Box>
  );
}
