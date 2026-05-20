import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Legend, LabelList} from "recharts";

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
    <div className="min-h-screen bg-gray-100 flex items-top-center justify-center p-10">

      <div className="w-full max-w-7xl bg-white p-8 rounded-2xl shadow-lg">
      <h1 className="text-4xl font-bold mb-6 text-center underline">Dashboard</h1>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-2 underline text-center">Top Exercise</h2>
              <p className="text-xl font-bold mb-2">{mostDoneExercise?.exerciseName}</p>
              <p className="text-xl font-bold mb-2">{mostDoneExercise?.totalReps} reps</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-2 underline text-center">Overall Total Time Spent Exercising</h2>
          <p className="text-xl font-bold mb-2">{calculateMinutes} mins</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-2 underline text-center">Total Workouts Completed</h2>
          <p className="text-xl font-bold mb-2">{stats?.totalWorkouts} Workouts</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-2 underline text-center">Average Workout Duration</h2>
          <p className="text-xl font-bold mb-2">{formatAverageTime(stats?.averageWorkoutTime)}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-2 underline text-center">Overall Reps Completed Per Exercise</h2>
          <BarChart width={350} height={300} data={exerciseRepTotals}>
            <XAxis dataKey="exerciseName"/>
            <YAxis />
            <Tooltip />
            <Bar dataKey="totalReps" name="Total Reps" fill="#8884d8"/>
          </BarChart>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-2 underline text-center">Average of Reps Completed Per Day</h2>
          <BarChart width={600} height={300} data={stats?.exerciseRepTotalsDaily}>
            <XAxis dataKey="date"/>
            <YAxis />
            <Tooltip />
            <Bar dataKey="totalReps" name="Reps" fill="#8884d8"/>
          </BarChart>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-2 underline text-center">Average of Reps Completed Per Day</h2>
          <PieChart width={400} height={300}>
            <Pie data={pieChartData} dataKey="value" nameKey="name" outerRadius={100} fill="#000000" label/>
            <Tooltip formatter={(value) => `${value}%`}/>
            <Legend />
          </PieChart>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-2 underline text-center">Average Time Spent Exercising Daily</h2>
          <BarChart width={400} height={300} data={weeklyTimeData}>
            <XAxis dataKey="date"/>
            <YAxis />
            <Tooltip formatter={(value) => `${value} min`}/>
            <Bar dataKey="duration" name="Duration" fill="#11111"/>
          </BarChart>
        </div>

      </div>
      </div>
    </div>
  ); 
};

export default DashboardPage;