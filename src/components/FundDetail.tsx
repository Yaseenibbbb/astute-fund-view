
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { ChartContainer } from "@/components/ui/chart";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { funds } from "@/data/fundsData";
import { Fund } from "@/types/fund";
import { usdToAed, formatCurrency } from "@/utils/currencyUtils";
import InteractiveChart from "./InteractiveChart";

// Generate some mock historical data
const generateHistoricalData = (fund: Fund) => {
  const data = [];
  const timeframes: { [key: string]: number } = { 
    "1W": 7, 
    "1M": 30, 
    "3M": 90, 
    "6M": 180, 
    "1Y": 365, 
    "Max": 730 
  };
  
  const currentDate = new Date();
  const startPrice = fund.currentNAV - (fund.currentNAV * (fund.changes.yearly / 100));
  
  // Generate data points for MAX timeframe
  for (let i = timeframes["Max"]; i >= 0; i--) {
    const date = new Date();
    date.setDate(currentDate.getDate() - i);
    
    // Create some random fluctuation but with overall trend matching yearly change
    const progress = 1 - (i / timeframes["Max"]);
    const randomFactor = (Math.random() - 0.5) * 5; // Create some volatility
    const trendFactor = fund.changes.yearly / 100;
    
    const price = startPrice * (1 + (progress * trendFactor)) + randomFactor;
    
    data.push({
      date: date.toISOString().split('T')[0],
      price: price
    });
  }
  
  return data;
};

const FundDetail: React.FC = () => {
  const { fundId } = useParams<{ fundId: string }>();
  const navigate = useNavigate();
  const [timeframe, setTimeframe] = useState<string>("1M");
  const [activeTab, setActiveTab] = useState<string>("overview");
  
  const fund = funds.find(f => f.id === fundId);
  
  if (!fund) {
    return <div className="p-4">الصندوق غير موجود</div>;
  }
  
  const historicalData = generateHistoricalData(fund);
  
  // Filter data based on selected timeframe
  const timeframeMap: { [key: string]: number } = {
    "1W": 7,
    "1M": 30,
    "3M": 90,
    "6M": 180,
    "1Y": 365,
    "Max": historicalData.length
  };
  
  const filteredData = historicalData.slice(-timeframeMap[timeframe]);
  
  const currentValue = (fund.investment / fund.currentNAV) * fund.currentNAV * (1 + fund.changes.yearly / 100);
  const profit = currentValue - fund.investment;
  const profitPercentage = (profit / fund.investment) * 100;
  
  // Convert to AED
  const currentNAVAED = usdToAed(fund.currentNAV);
  const investmentAED = usdToAed(fund.investment);
  const currentValueAED = usdToAed(currentValue);
  const profitAED = usdToAed(profit);
  
  // Prepare data for pie charts
  const sectorData = fund.sectorAllocation;
  const geographicData = fund.geographicExposure;
  const COLORS = ['#7E69AB', '#10B981', '#F97316', '#0EA5E9', '#D946EF', '#8B5CF6'];
  
  return (
    <div className="pb-20 font-dubai">
      {/* Back button */}
      <div className="px-4 py-2 flex items-center">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center text-sm text-muted-foreground"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
            <path d="m15 18-6-6 6-6"/>
          </svg>
          رجوع
        </button>
      </div>
      
      {/* Fund header */}
      <div className="px-4 mb-4">
        <h1 className="text-xl font-semibold">{fund.name}</h1>
        <div className="text-sm text-muted-foreground">رقم ISIN: {fund.isin}</div>
      </div>
      
      {/* Quick stats */}
      <Card className="mx-4 mb-4">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <div className="text-sm text-muted-foreground">صافي قيمة الأصول الحالية</div>
              <div className="text-lg font-semibold">
                {formatCurrency(currentNAVAED)}
              </div>
            </div>
            <div className={`text-lg font-semibold px-3 py-1 rounded ${fund.changes.daily >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {fund.changes.daily >= 0 ? '+' : ''}{fund.changes.daily.toFixed(2)}%
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">الاستثمار</div>
              <div className="font-semibold">
                {formatCurrency(investmentAED)}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">القيمة الحالية</div>
              <div className="font-semibold">
                {formatCurrency(currentValueAED)}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">الربح/الخسارة</div>
              <div className={`font-semibold ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {profit >= 0 ? '+' : ''}{formatCurrency(profitAED)}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">العائد</div>
              <div className={`font-semibold ${profitPercentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {profitPercentage >= 0 ? '+' : ''}{profitPercentage.toFixed(2)}%
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Interactive Chart */}
      <InteractiveChart 
        data={filteredData}
        timeframe={timeframe}
        fund={fund}
        onTimeframeChange={setTimeframe}
      />
      
      {/* Tabs for fund details */}
      <div className="px-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="holdings">الاستثمارات</TabsTrigger>
            <TabsTrigger value="allocation">التوزيع</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-4">الأداء</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">التغير اليومي</div>
                    <div className={`font-semibold ${fund.changes.daily >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {fund.changes.daily >= 0 ? '+' : ''}{fund.changes.daily}%
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">التغير الأسبوعي</div>
                    <div className={`font-semibold ${fund.changes.weekly >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {fund.changes.weekly >= 0 ? '+' : ''}{fund.changes.weekly}%
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">التغير الشهري</div>
                    <div className={`font-semibold ${fund.changes.monthly >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {fund.changes.monthly >= 0 ? '+' : ''}{fund.changes.monthly}%
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">التغير السنوي</div>
                    <div className={`font-semibold ${fund.changes.yearly >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {fund.changes.yearly >= 0 ? '+' : ''}{fund.changes.yearly}%
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Holdings Tab */}
          <TabsContent value="holdings" className="mt-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-4">أكبر الاستثمارات</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>الاسم</TableHead>
                      <TableHead className="text-right">الوزن</TableHead>
                      <TableHead className="text-right">التغير</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {fund.topHoldings.map((holding, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{holding.name}</TableCell>
                        <TableCell className="text-right">{holding.weight}%</TableCell>
                        <TableCell className={`text-right ${holding.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {holding.change >= 0 ? '+' : ''}{holding.change}%
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Allocation Tab */}
          <TabsContent value="allocation" className="mt-4">
            <Card className="mb-4">
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-4">التوزيع القطاعي</h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sectorData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        fill="#8884d8"
                        paddingAngle={2}
                        dataKey="percentage"
                        nameKey="sector"
                        label={({ sector, percent }) => `${sector} ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {sectorData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-4">التوزيع الجغرافي</h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={geographicData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        fill="#8884d8"
                        paddingAngle={2}
                        dataKey="percentage"
                        nameKey="region"
                        label={({ region, percent }) => `${region} ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {geographicData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FundDetail;
