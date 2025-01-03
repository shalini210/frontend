import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { getContacts } from '../api/contactApi';
import { getTasks } from '../api/taskApi';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [totalContacts, setTotalContacts] = useState(0);
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [leadCount, setLeadCount] = useState(0);
  const [contactCount, setContactCount] = useState(0);
  const [taskStatusCounts, setTaskStatusCounts] = useState({ pending: 0, inProgress: 0, completed: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contacts = await getContacts();
        setTotalContacts(contacts.length);

        const leads = contacts.filter(contact => contact.type === 'lead');
        const contactsCount = contacts.filter(contact => contact.type === 'contact');
        setLeadCount(leads.length);
        setContactCount(contactsCount.length);

        const tasks = await getTasks();
        const upcoming = tasks.filter(
          (task) => new Date(task.dueDate) > new Date()
        );
        setUpcomingTasks(upcoming.slice(0, 5));

        const statusCounts = tasks.reduce(
          (acc, task) => {
            if (task.status === 'Pending') acc.pending++;
            else if (task.status === 'In Progress') acc.inProgress++;
            else if (task.status === 'Completed') acc.completed++;
            return acc;
          },
          { pending: 0, inProgress: 0, completed: 0 }
        );
        setTaskStatusCounts(statusCounts);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const leadContactChartData = {
    labels: ['Leads', 'Contacts'],
    datasets: [
      {
        label: 'Leads vs Contacts',
        data: [leadCount, contactCount],
        backgroundColor: ['#4CAF50', '#FF5722'],
        borderColor: ['#388E3C', '#D32F2F'],
        borderWidth: 1,
      },
    ],
  };

  const taskStatusChartData = {
    labels: ['Pending', 'In Progress', 'Completed'],
    datasets: [
      {
        label: 'Task Status',
        data: [taskStatusCounts.pending, taskStatusCounts.inProgress, taskStatusCounts.completed],
        backgroundColor: ['#FF9800', '#2196F3', '#4CAF50'],
        borderColor: ['#F57C00', '#1976D2', '#388E3C'],
        borderWidth: 1,
      },
    ],
  };

  const leadContactChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      title: {
        display: true,
        text: `Leads (${leadCount}) vs Contacts (${contactCount})`,
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          display: true,
        },
      },
      y: {
        ticks: {
          display: false, // Hide y-axis ticks
        },
        grid: {
          display: false, // Hide y-axis gridlines
        },
      },
    },
  };

  const taskStatusChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      title: {
        display: true,
        text: 'Task Status Distribution',
      },
      legend: {
        position: 'right',
      },
    },
  };

  return (
    <div className="dashboard">
      <h1>Welcome to Your CRM Dashboard</h1>
      <div className="stats">
        <div className="stat">
          <h2>Total Contacts</h2>
          <p>Leads: {leadCount}</p>  {/* Displaying Leads count */}
          <p>Contacts: {contactCount}</p>  {/* Displaying Contacts count */}
        </div>
        <div className="stat">
          <h2>Upcoming Tasks</h2>
          <p>Pending: {taskStatusCounts.pending}</p>  {/* Displaying Pending task count */}
          <p>In Progress: {taskStatusCounts.inProgress}</p>  {/* Displaying In Progress task count */}
          <p>Completed: {taskStatusCounts.completed}</p>  {/* Displaying Completed task count */}
        </div>
      </div>

      <div className="charts" style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
        <div className="chart-container" style={{ width: '40%' }}>
          <Bar data={leadContactChartData} options={leadContactChartOptions} />
        </div>

        <div className="chart-container" style={{ width: '35%' }}>
          <Pie data={taskStatusChartData} options={taskStatusChartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
