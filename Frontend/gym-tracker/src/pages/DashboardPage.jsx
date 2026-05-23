import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, PieChart, Pie, Legend, LabelList, ResponsiveContainer} from "recharts";

const DashboardPage = () => {
    const [stats, setStats] = useState(null);

    const navigate = useNavigate();

    const exerciseRepTotals = (stats?.exerciseRepTotals || []);

    const totalOverallReps = exerciseRepTotals.reduce((sum, ex) => sum + ex.totalReps, 0);

    const calculateMinutes = Math.floor((stats?.totalWorkoutTime || 0) / 60);

    const pieChartData = exerciseRepTotals.map(ex => ({
      name: ex.exerciseName,
      value: totalOverallReps ? Math.round((ex.totalReps / totalOverallReps) * 100) : 0
    }));

    const weeklyTimeData = stats?.workoutTimeDaily.map(item => ({
      date: item._id,
      duration: Math.floor(item.totalDuration / 60)
    }));

    const mostDoneExercise = exerciseRepTotals.reduce((max, item) =>
    item.totalReps > (max?.totalReps || 0) ? item : max, null);

    const formatAverageTime = (seconds) => {
      seconds = Math.floor(seconds);
      const hour = Math.floor(seconds / 3600);
      const minute = Math.floor((seconds % 3600) / 60);
      const second = seconds % 60;
      return `${hour}:${minute.toString().padStart(2, "0")}:${second.toString().padStart(2, "0")}`;
    };

    useEffect(() => {
        const token = sessionStorage.getItem("token");

        if (!token) {
            navigate("/login");
        }
    }, []);

  useEffect(() => {
    const fetchStats = async () => {
        const token = sessionStorage.getItem("token");

        const res = await fetch(`http://localhost:5001/api/workouts/stats`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await res.json();
        console.log(data);
        setStats(data);
    };

      fetchStats();
    }, []);


  return (
    <div className="min-h-screen flex items-top-center justify-center p-10">

      <div className="w-full bg-[#0a0a0a] p-8 rounded-2xl shadow-lg font-inter">
      <h1 className="text-4xl font-bold mb-6 text-center text-white underline">Dashboard</h1>

      <div className="grid grid-cols-2 gap-4 mt-6">

        <div className="bg-zinc-900 p-4 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-2 text-center text-gray-300">Top Exercise</h2>
              <p className="text-xl font-bold mb-2 text-gray-100">{mostDoneExercise?.exerciseName}</p>
              <p className="text-xl font-bold mb-2 text-gray-100">{mostDoneExercise?.totalReps} reps</p>
        </div>

        <div className="bg-zinc-900 p-4 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-2 text-center text-gray-300">Overall Total Time Spent Exercising</h2>
          <p className="text-xl font-bold mb-2 text-gray-100">{calculateMinutes} mins</p>
        </div>

        <div className="bg-zinc-900 p-4 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-2 text-center text-gray-300">Total Workouts Completed</h2>
          <p className="text-xl font-bold mb-2 text-gray-100">{stats?.totalWorkouts} Workouts</p>
        </div>

        <div className="bg-zinc-900 p-4 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-2 text-center text-gray-300">Average Workout Duration</h2>
          <p className="text-xl font-bold mb-2 text-gray-100">{formatAverageTime(stats?.averageWorkoutTime)}</p>
        </div>

        <div className="bg-zinc-900 p-4 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-2 text-center text-gray-300">Overall Reps Completed Per Exercise</h2>
          <ResponsiveContainer width="100%" height={300}>
          <BarChart width={350} height={300} data={exerciseRepTotals}>
            <XAxis dataKey="exerciseName"/>
            <YAxis />
            <Tooltip />
            <Bar dataKey="totalReps" name="Total Reps" fill="#8884d8"/>
          </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-zinc-900 p-4 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-2 text-center text-gray-300">Average of Reps Completed Per Day</h2>
          <ResponsiveContainer width="100%" height={300}>
          <LineChart width={600} height={300} data={stats?.exerciseRepTotalsDaily}>
            <XAxis dataKey="date"/>
            <YAxis />
            <Tooltip />
            <Line dataKey="totalReps" name="Reps" fill="#8884d8"/>
          </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-zinc-900 p-4 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-2 text-center text-gray-300">Average of Reps for all Exercises</h2>
          <ResponsiveContainer width="100%" height={300}>
          <PieChart width={400} height={300}>
            <Pie data={pieChartData} dataKey="value" nameKey="name" outerRadius={100} fill="#fafb9a" label/>
            <Tooltip formatter={(value) => `${value}%`}/>
            <Legend />
          </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-zinc-900 p-4 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-2 text-center text-gray-300">Average Time Spent Exercising Daily</h2>
          <ResponsiveContainer width="100%" height={300}>
          <BarChart width={400} height={300} data={weeklyTimeData}>
            <XAxis dataKey="date"/>
            <YAxis />
            <Tooltip formatter={(value) => `${value} min`}/>
            <Bar dataKey="duration" name="Duration" fill="#0101010"/>
          </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
      </div>
    </div>
  ); 
};

export default DashboardPage;