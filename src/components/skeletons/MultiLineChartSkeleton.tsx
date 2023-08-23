import { Skeleton } from "@mui/material";
import { Stack } from "@mui/material";

export default function MultiLineChartSkeleton() {
  return (
    <Stack className="stack">
      <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
    </Stack>
  );
}
