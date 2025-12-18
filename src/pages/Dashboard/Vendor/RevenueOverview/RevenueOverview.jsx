import React, { useEffect, useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { FaDollarSign, FaTicketAlt, FaBus } from 'react-icons/fa';
import useFetch from '@/hooks/useFetch';
import useAuth from '@/hooks/useAuth';
import useTitle from '@/hooks/useTitle';

const RevenueOverview = () => {
  useTitle('Revenue Overview');
  const { user, loading: authLoading } = useAuth();
  const [stats, setStats] = useState(null);

  const {
    data: responseData,
    isLoading,
    error,
  } = useFetch(
    ['vendor-stats', user?.email],
    `/stats/${user?.email}`,
    !!user?.email
  );

  const COLORS = ['#36D399', '#FBBD23', '#F87272'];

  useEffect(() => {
    if (responseData) {
      setStats(responseData);
    }
  }, [responseData]);

  if (authLoading || isLoading || !stats) {
    return <div className="text-center mt-20">Loading dashboard...</div>;
  }

  const totalRevenue = stats?.totalRevenue || 0;
  const newSold = stats?.ticketStats;
  const totalSold = newSold.find(item => item.status === 'paid');
  const totalAdded = stats?.stats?.totalAdded || 0;
  const revenueData = stats?.revenueData || [];
  const pieData = stats?.ticketStats || [];

  const ticketStatusData = [
    { name: 'Sold (Paid)', value: 145 },
    { name: 'Pending', value: 40 },
    { name: 'Rejected', value: 10 },
  ];
  return (
    <div className="w-full p-6 space-y-8">
      <div>
        <h2 className="text-3xl font-bold">Revenue Overview</h2>
        <p className="text-base-content/60">
          Visual insights into your earnings and ticket sales.
        </p>
      </div>

      <div className="stats shadow w-full bg-base-100 border border-base-200 mb-8 flex flex-col md:flex-row">
        <div className="stat place-items-center">
          <div className="stat-figure text-primary">
            <FaDollarSign className="text-3xl" />
          </div>
          <div className="stat-title">Total Revenue</div>
          <div className="stat-value text-primary">
            ${totalRevenue.toLocaleString()}
          </div>
          <div className="stat-desc text-success">Lifetime Earnings</div>
        </div>

        <div className="stat place-items-center">
          <div className="stat-figure text-secondary">
            <FaTicketAlt className="text-3xl" />
          </div>
          <div className="stat-title">Total Tickets Sold</div>
          <div className="stat-value text-secondary">{totalSold.count}</div>
          <div className="stat-desc">Confirmed bookings</div>
        </div>

        <div className="stat place-items-center">
          <div className="stat-figure text-accent">
            <FaBus className="text-3xl" />
          </div>
          <div className="stat-title">Tickets Added</div>
          <div className="stat-value text-accent">{stats.totalTickets}</div>
          <div className="stat-desc">Active routes listing</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card bg-base-100 shadow-xl border border-base-200">
          <div className="card-body">
            <h3 className="card-title text-base-content/70 mb-4">
              Weekly Revenue Trend
            </h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient
                      id="colorRevenue"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#570DF8" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#570DF8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      borderRadius: '10px',
                    }}
                    itemStyle={{ color: '#570DF8' }}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#570DF8"
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                    name="Revenue"
                  />
                  <Area
                    type="monotone"
                    dataKey="sales"
                    stroke="#36D399"
                    fillOpacity={0.3}
                    fill="#36D399"
                    name="Tickets Sold"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="card bg-base-100 shadow-xl border border-base-200">
          <div className="card-body">
            <h3 className="card-title text-base-content/70 mb-4">
              Booking Status Distribution
            </h3>
            <div className="h-[300px] w-full flex justify-center items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="count"
                    nameKey="status"
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueOverview;
