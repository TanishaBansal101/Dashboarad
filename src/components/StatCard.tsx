
import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  trend?: {
    value: number;
    direction: 'up' | 'down' | 'neutral';
  };
  subText?: string;
  icon?: React.ReactNode;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  trend,
  subText,
  icon,
  className,
}) => {
  return (
    <div className={cn("stat-card", className)}>
      <div className="flex justify-between items-center">
        <h3 className="stat-card-title">{title}</h3>
        {icon && <div className="text-primary">{icon}</div>}
      </div>
      <div className="stat-card-value">{value}</div>
      {trend && (
        <div 
          className={cn(
            "stat-card-trend", 
            trend.direction === 'up' ? "trend-up" : trend.direction === 'down' ? "trend-down" : ""
          )}
        >
          {trend.direction === 'up' && <ArrowUp size={16} className="mr-1" />}
          {trend.direction === 'down' && <ArrowDown size={16} className="mr-1" />}
          {trend.value}%
          {subText && <span className="text-gray-500 ml-2">{subText}</span>}
        </div>
      )}
      {!trend && subText && <div className="text-sm text-gray-500">{subText}</div>}
    </div>
  );
};

export default StatCard;
