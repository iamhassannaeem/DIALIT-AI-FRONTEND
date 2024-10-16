import CallLog from "./CallLog";
import MonthlyUsageLimit from "./MonthlyUsageLimit";

export default function Billing() {
  return (
    <>
      <div className="flex flex-col md:flex-row gap-3 justify-between">
        <div className="flex-1">
          <MonthlyUsageLimit />
        </div>
        <div className="flex-1">
          <CallLog />
        </div>
      </div>
    </>
  );
}
