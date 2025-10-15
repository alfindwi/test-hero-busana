import { ChartBar } from "@/components/barChart";
import { ChartPieWithLabels } from "@/components/pieChart";

export default function Dashboard() {
  return (
    <div className="w-full mt-10 max-w-6xl mx-auto px-4 py-3 flex justify-center items-start flex-col md:flex-row gap-8">
      <div className="flex-1 max-w-[400px]">
        <ChartPieWithLabels />
      </div>

      <div className="flex-1 max-w-[400px]">
        <ChartBar />
      </div>
    </div>
  );
}
