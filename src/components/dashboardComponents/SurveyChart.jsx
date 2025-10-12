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
  <div className="bg-white rounded-xl px-2 sm:px-6 py-4 sm:py-6 shadow w-full outline-none">
    <h2 className="text-base sm:text-lg font-semibold text-gray-700 mb-4 sm:mb-8">
      Rental Survey
    </h2>

    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={surveyData}
        margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
      >
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        {/* Purple and black bars */}
        <Bar dataKey="general" fill="#8B5CF6" name="General Rentals" />
        <Bar dataKey="opd" fill="#111111" name="Direct Contacts" />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default SurveyChart;
