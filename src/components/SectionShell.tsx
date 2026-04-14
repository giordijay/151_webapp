import { Box, Container, Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";

type SectionShellProps = {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  children: ReactNode;
};

function SectionShell({
  id,
  eyebrow,
  title,
  subtitle,
  children,
}: SectionShellProps) {
  return (
    <Box
      component="section"
      id={id}
      sx={{
        scrollMarginTop: { xs: 88, md: 104 },
        py: { xs: 8, md: 12 },
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={1.5} sx={{ mb: 5 }}>
          <Typography
            variant="overline"
            sx={{
              color: "primary.main",
              fontWeight: 800,
              letterSpacing: "0.18em",
            }}
          >
            {eyebrow}
          </Typography>
          <Typography
            variant="h2"
            sx={{ maxWidth: 680, fontSize: { xs: "2.5rem", md: "4rem" } }}
          >
            {title}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: 720, fontSize: "1.05rem" }}
          >
            {subtitle}
          </Typography>
        </Stack>
        {children}
      </Container>
    </Box>
  );
}

export default SectionShell;
