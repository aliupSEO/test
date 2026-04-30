import { BarChart3, Users, Activity } from 'lucide-react';

export function Dashboard() {
  const metrics = [
    { title: 'Total Users', value: '1,234', icon: Users, trend: '+12%' },
    { title: 'Active Sessions', value: '423', icon: Activity, trend: '+5%' },
    { title: 'Revenue', value: '$12,450', icon: BarChart3, trend: '+18%' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.title} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-gray-50 rounded-lg">
                  <Icon className="text-secondary" size={24} />
                </div>
                <span className="text-green-500 text-sm font-medium">{metric.trend}</span>
              </div>
              <h3 className="text-gray-500 text-sm font-medium">{metric.title}</h3>
              <p className="text-2xl font-serif font-semibold mt-1">{metric.value}</p>
            </div>
          );
        })}
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 min-h-[400px]">
        <h2 className="font-serif text-lg font-semibold mb-4">System Overview</h2>
        <div className="flex items-center justify-center h-64 text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
          Chart Placeholder
        </div>
      </div>
    </div>
  );
}
