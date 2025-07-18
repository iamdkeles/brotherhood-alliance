import React from "react";
import { Card, CardContent } from "./Card";
import type { LucideIcon } from "lucide-react"; // Optional but useful if using Lucide

type StatCardProps = {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  className?: string;
};

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  iconColor = "text-red-600",
  iconBg = "bg-red-100",
  className = "",
}) => {
  return (
    <Card className={className}>
      <CardContent>
        <div className="flex items-center">
          <div className={`p-2 ${iconBg} rounded-lg`}>
            <Icon className={`h-6 w-6 ${iconColor}`} />
          </div>
          <div className="ml-4">
            <p className="text-sm text-slate-600">{title}</p>
            <p className="text-2xl font-bold text-slate-900">{value}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
