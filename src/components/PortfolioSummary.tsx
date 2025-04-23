
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  calculateTotalInvestment, 
  calculateTotalCurrentValue,
  calculateTotalProfit,
  calculateTotalProfitPercentage
} from "@/data/fundsData";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Legend
} from "recharts";
import { funds } from "@/data/fundsData";
import { usdToAed, formatCurrency } from "@/utils/currencyUtils";

const PortfolioSummary: React.FC = () => {
  // Calculate summary data
  const totalInvestment = calculateTotalInvestment();
  const totalCurrentValue = calculateTotalCurrentValue();
  const totalProfit = calculateTotalProfit();
  const totalProfitPercentage = calculateTotalProfitPercentage();
  
  // Convert to AED
  const totalInvestmentAED = usdToAed(totalInvestment);
  const totalCurrentValueAED = usdToAed(totalCurrentValue);
  const totalProfitAED = usdToAed(totalProfit);
  
  // Prepare data for pie chart
  const pieData = funds.map(fund => ({
    name: fund.name.split(' ').slice(0, 2).join(' '), // Shortened name for display
    value: fund.investment
  }));
  
  const COLORS = ['#7E69AB', '#10B981', '#F97316', '#0EA5E9'];

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold mb-4">ملخص المحفظة</h2>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <div className="text-sm text-muted-foreground">إجمالي الاستثمار</div>
            <div className="font-semibold text-lg">
              {formatCurrency(totalInvestmentAED)}
            </div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">القيمة الحالية</div>
            <div className="font-semibold text-lg">
              {formatCurrency(totalCurrentValueAED)}
            </div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">الربح / الخسارة الكلية</div>
            <div className={`font-semibold text-lg ${totalProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {totalProfit >= 0 ? '+' : ''}{formatCurrency(totalProfitAED)}
            </div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">العائد</div>
            <div className={`font-semibold text-lg ${totalProfitPercentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {totalProfitPercentage >= 0 ? '+' : ''}{totalProfitPercentage.toFixed(2)}%
            </div>
          </div>
        </div>
        
        <div className="h-72">
          <h3 className="text-sm font-medium mb-2">توزيع الصناديق</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                fill="#8884d8"
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend layout="vertical" verticalAlign="bottom" align="center" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PortfolioSummary;
