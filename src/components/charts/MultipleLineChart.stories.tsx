import type { Story } from "@ladle/react";
import MultipleLineChart from "./MultipleLineChart";
import { RegistrosUmaVariavel } from "../../utils/resgistroTypes";

export const MultipleLineChartStory: Story = () => {
  const nos = [];
  nos.push({ label: "1", data: [2, 2] });
  nos.push({ label: "2", data: [4, 6] });
  nos.push({ label: "3", data: [5, 6] });
  nos.push({ label: "4", data: [5, 2] });
  return (
    <>
      <MultipleLineChart title={"tete"} nos={nos} />
    </>
  );
};
