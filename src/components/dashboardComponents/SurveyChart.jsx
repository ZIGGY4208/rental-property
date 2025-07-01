import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import surveyData from "../data/surveyData";

const SurveyChart = () => (
  <div className="bg-white rounded-xl px-6 py-6 shadow min-h-[500px]">
    {/* Increased bottom margin from mb-4 to mb-8 */}
    <h2 className="text-lg font-semibold text-gray-700 mb-28">Rental Survey</h2>

    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={surveyData}
        margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="general" fill="#4ade80" name="General Rentals" />
        <Bar dataKey="opd" fill="#facc15" name="Direct Contacts" />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default SurveyChart;
