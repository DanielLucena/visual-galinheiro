import type { Story } from "@ladle/react";
import MultipleLineChart from "./MultipleLineChart";

export const MultipleLineChartStory: Story = () => {
  return (
    <>
      <MultipleLineChart
        title={"tete"}
        nos={[
          { noId: 1, valores: [1, 2] },
          { noId: 2, valores: [4, 6] },
          { noId: 3, valores: [5, 6] },
          { noId: 1, valores: [5, 2] },
        ]}
      />
    </>
  );
};
