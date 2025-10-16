import { ChartBar } from "@/components/barChart";
import { ChartPieWithLabels } from "@/components/pieChart";

export default function Dashboard() {
  return (
    <div className="w-full mt-20 px-4 py-3 flex justify-center">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 place-items-center">
        <div className="w-full max-w-[500px]">
          <ChartPieWithLabels />
        </div>

        <div className="w-full max-w-[500px]">
          <ChartBar />
        </div>
      </div>
    </div>
  );
}

