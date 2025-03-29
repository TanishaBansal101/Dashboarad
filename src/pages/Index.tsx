
import React from 'react';
import { Button } from '@/components/ui/button';
import { Database, GitBranch, Globe, Plus, BarChart2 } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import StatCard from '@/components/StatCard';
import ActivityTabs from '@/components/ActivityTabs';
import DataModelVisualization from '@/components/DataModelVisualization';

const Index = () => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        
        <div className="flex-1 overflow-auto p-4 md:p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground">Monitor your data collection and model building activities.</p>
            </div>
            <Button className="gap-2">
              <Plus size={16} />
              New Project
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard 
              title="Active Data Sources" 
              value="14" 
              trend={{ value: 5, direction: 'up' }} 
              subText="From 6 domains"
              icon={<Database size={20} />}
            />
            <StatCard 
              title="Scraping Jobs" 
              value="8" 
              trend={{ value: 12, direction: 'up' }} 
              subText="3 running"
              icon={<Globe size={20} />}
            />
            <StatCard 
              title="Dataset Size" 
              value="1.2 GB" 
              trend={{ value: 7, direction: 'up' }} 
              subText="74,325 records"
              icon={<BarChart2 size={20} />}
            />
            <StatCard 
              title="Active Models" 
              value="3" 
              subText="2 training"
              icon={<GitBranch size={20} />}
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ActivityTabs />
            <DataModelVisualization />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
