import React from "react";
import Sidebar from "../dashboardComponents/Sidebar";
import TopBar from "../dashboardComponents/TopBar";
import StatCard from "../dashboardComponents/StatCard";
import SurveyChart from "../dashboardComponents/SurveyChart";
import Calendar from "../dashboardComponents/Calendar";
import AdminCardList from "../dashboardComponents/AdminCardList";

import {
  Home,
  KeyRound,
  UserCircle,
  UsersRound,
  Wallet,
  MapPin,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen overflow-hidden bg-gray-200">
      {/* <Sidebar /> */}
      <div className="flex-1 flex flex-col">
        <TopBar />
        <main className="flex-1 p-8 bg-gray-50">
          {/* Top row */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6 h-[40%]">
            {/* Admin Cards Section */}
            <div className="lg:col-span-1 bg-white rounded-xl p-6 shadow flex flex-col justify-center items-start">
              <AdminCardList />
            </div>

            {/* Stat Cards */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-3 grid-rows-2 gap-4 h-full">
                <StatCard
                  title="Properties Listed"
                  value="124"
                  subtitle="14 new today"
                  Icon={Home}
                  iconBg="bg-sky-200"
                  iconColor="text-sky-800"
                />
                <StatCard
                  title="Rented This Month"
                  value="38"
                  subtitle="5 pending"
                  Icon={KeyRound}
                  iconBg="bg-emerald-200"
                  iconColor="text-emerald-800"
                />
                <StatCard
                  title="Admins"
                  value="4"
                  subtitle="1 added this week"
                  Icon={UserCircle}
                  iconBg="bg-orange-200"
                  iconColor="text-orange-800"
                />
                <StatCard
                  title="Tenants Registered"
                  value="182"
                  subtitle="12 joined this week"
                  Icon={UsersRound}
                  iconBg="bg-rose-200"
                  iconColor="text-rose-800"
                />
                <StatCard
                  title="Revenue"
                  value="FCFA 1.2M"
                  subtitle="From 4% commission"
                  Icon={Wallet}
                  iconBg="bg-lime-200"
                  iconColor="text-lime-800"
                />
                <StatCard
                  title="Areas Covered"
                  value="9"
                  subtitle="Molyko, Mile 16, Bonduma..."
                  Icon={MapPin}
                  iconBg="bg-teal-200"
                  iconColor="text-teal-800"
                />
              </div>
            </div>
          </div>

          {/* Bottom row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8 p-4 h-[50%]">
            <div className="lg:col-span-2">
              <SurveyChart />
            </div>
            <div className="bg-white rounded-xl shadow ">
              <Calendar />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
