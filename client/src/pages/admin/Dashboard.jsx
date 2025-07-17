import {
  ChartLineIcon,
  CircleDollarSignIcon,
  PlayCircleIcon,
  StarIcon,
  UserIcon,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { dummyDashboardData } from '../../assets/assets';
import Loading from '../../components/Loading';
import Title from '../../components/admin/Title';
import BlurCircle from '../../components/BlurCircle';
import { dateFormat } from '../../lib/dateFormat';

const Dashboard = () => {
  const currency = import.meta.env.VITE_CURRENCY;

  const [dashboardData, setDashboardData] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    activeShows: [],
    totalUser: 0,
  });

  const [loading, setLoading] = useState(true);

  const dashboardCards = [
    {
      title: 'Total Bookings',
      value: dashboardData.totalBookings || '0',
      icon: ChartLineIcon,
    },
    {
      title: 'Total Revenue',
      value: currency + dashboardData.totalRevenue || '0',
      icon: CircleDollarSignIcon,
    },
    {
      title: 'Active Shows',
      value: dashboardData.activeShows.length || '0',
      icon: PlayCircleIcon,
    },
    {
      title: 'Total Users',
      value: dashboardData.totalUser || '0',
      icon: UserIcon,
    },
  ];

  const fetchDashboardData = async () => {
    setDashboardData(dummyDashboardData);
    setLoading(false);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return !loading ? (
    <>
      <Title text1="Admin" text2="Dashboard" />

      {/* Dashboard Cards */}
      <div className="relative flex flex-wrap gap-4 mt-6">
        <BlurCircle top="-100px" left="0" />
        <div className="flex flex-wrap gap-4 w-full">
          {dashboardCards.map((card, index) => (
            <div
              key={index}
              className="flex items-center justify-between px-4 py-3 bg-primary/10 border border-primary/20 rounded-md max-w-50 w-full"
            >
              <div>
                <h1 className="text-sm">{card.title}</h1>
                <p className="text-xl font-medium mt-1">{card.value}</p>
              </div>
              <card.icon className="w-6 h-6" />
            </div>
          ))}
        </div>
      </div>

      {/* Active Shows Section */}
      <p className="mt-10 text-lg font-medium">Active Shows</p>
      <div className="relative flex flex-wrap gap-6 mt-4 max-w-6xl">
        <BlurCircle top="100px" left="-10%" />
        {dashboardData.activeShows.map((show) => (
          <div
            key={show._id}
            className="w-60 rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-md hover:shadow-lg transition-transform hover:-translate-y-1"
          >
            <img
              src={show.movie.poster_path}
              alt={show.movie.title}
              className="w-full h-80 object-cover"
            />
            <div className="p-3 flex flex-col gap-1">
              <h2 className="font-semibold text-base truncate">
                {show.movie.title}
              </h2>

              <div className="flex justify-between items-center text-sm text-gray-400">
                <span className="text-white font-medium">
                  {currency} {show.showPrice}
                </span>
                <span className="flex items-center gap-1">
                  <StarIcon className="w-4 h-4 text-primary fill-primary" />
                  {show.movie.vote_average.toFixed(1)}
                </span>
              </div>

              <p className="text-xs text-gray-500 mt-1">
                {dateFormat(show.DateTime)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Dashboard;
