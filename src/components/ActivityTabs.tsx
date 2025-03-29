
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import ProgressBar from './ProgressBar';

interface JobItem {
  id: string;
  title: string;
  description: string;
  status: 'running' | 'completed' | 'active' | 'pending';
}

interface ProgressItem {
  id: string;
  title: string;
  progress: number;
}

const ActivityTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'recent' | 'performance'>('recent');
  
  const jobs: JobItem[] = [
    {
      id: 'job1',
      title: 'Twitter Finance Data',
      description: 'Collecting financial tweets with sentiment analysis',
      status: 'running',
    },
    {
      id: 'job2',
      title: 'News Article Scraper',
      description: 'Financial news from major publishers',
      status: 'completed',
    },
    {
      id: 'job3',
      title: 'GitHub Repository Analysis',
      description: 'Parsing code repositories for ML applications',
      status: 'active',
    },
    {
      id: 'job4',
      title: 'Research Paper Collector',
      description: 'Gathering ML papers from arXiv',
      status: 'pending',
    },
  ];

  const progressItems: ProgressItem[] = [
    { id: 'prog1', title: 'Twitter Data Collection', progress: 72 },
    { id: 'prog2', title: 'Financial News Processing', progress: 100 },
    { id: 'prog3', title: 'GitHub Repo Analysis', progress: 45 },
    { id: 'prog4', title: 'Research Papers', progress: 18 },
  ];

  const getStatusBadge = (status: JobItem['status']) => {
    const statusClasses = {
      running: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      active: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
    };
    
    return (
      <span className={cn('px-2 py-1 rounded-full text-xs font-medium', statusClasses[status])}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="flex border-b">
        <button
          className={cn(
            'px-4 py-3 text-sm font-medium transition-colors',
            activeTab === 'recent'
              ? 'border-b-2 border-primary text-primary'
              : 'text-gray-500 hover:text-gray-700'
          )}
          onClick={() => setActiveTab('recent')}
        >
          Recent Activity
        </button>
        <button
          className={cn(
            'px-4 py-3 text-sm font-medium transition-colors',
            activeTab === 'performance'
              ? 'border-b-2 border-primary text-primary'
              : 'text-gray-500 hover:text-gray-700'
          )}
          onClick={() => setActiveTab('performance')}
        >
          Performance
        </button>
      </div>
      
      <div className="p-4">
        {activeTab === 'recent' && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Recent Jobs</h3>
            <p className="text-gray-500 text-sm mb-4">Your recent data collection jobs</p>
            <div className="space-y-6">
              {jobs.map((job) => (
                <div key={job.id} className="border-b pb-5 last:border-b-0 last:pb-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{job.title}</h4>
                      <p className="text-gray-500 text-sm mt-1">{job.description}</p>
                    </div>
                    {getStatusBadge(job.status)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'performance' && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Data Collection Progress</h3>
            <p className="text-gray-500 text-sm mb-4">Status of your current data gathering operations</p>
            <div className="space-y-6">
              {progressItems.map((item) => (
                <div key={item.id} className="mb-4 last:mb-0">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">{item.title}</h4>
                    <span className="text-sm text-gray-600">{item.progress}%</span>
                  </div>
                  <ProgressBar value={item.progress} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityTabs;
