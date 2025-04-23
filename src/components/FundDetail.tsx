
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
    return <div className="p-4">Fund not found</div>;
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
  
  // Prepare data for pie charts
  const sectorData = fund.sectorAllocation;
  const geographicData = fund.geographicExposure;
  const COLORS = ['#7E69AB', '#10B981', '#F97316', '#0EA5E9', '#D946EF', '#8B5CF6'];
  
  return (
    <div className="pb-20">
      {/* Back button */}
      <div className="px-4 py-2 flex items-center">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center text-sm text-muted-foreground"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
            <path d="m15 18-6-6 6-6"/>
          </svg>
          Back
        </button>
      </div>
      
      {/* Fund header */}
      <div className="px-4 mb-4">
        <h1 className="text-xl font-semibold">{fund.name}</h1>
        <div className="text-sm text-muted-foreground">ISIN: {fund.isin}</div>
      </div>
      
      {/* Quick stats */}
      <Card className="mx-4 mb-4">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <div className="text-sm text-muted-foreground">Current NAV</div>
              <div className="text-lg font-semibold">
                {fund.currency} {fund.currentNAV.toFixed(2)}
              </div>
            </div>
            <div className={`text-lg font-semibold px-3 py-1 rounded ${fund.changes.daily >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {fund.changes.daily >= 0 ? '+' : ''}{fund.changes.daily.toFixed(2)}%
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">Investment</div>
              <div className="font-semibold">
                {fund.currency} {fund.investment.toLocaleString()}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Current Value</div>
              <div className="font-semibold">
                {fund.currency} {currentValue.toFixed(2)}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Profit/Loss</div>
              <div className={`font-semibold ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {profit >= 0 ? '+' : ''}{profit.toFixed(2)} {fund.currency}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Return</div>
              <div className={`font-semibold ${profitPercentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {profitPercentage >= 0 ? '+' : ''}{profitPercentage.toFixed(2)}%
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Chart */}
      <Card className="mx-4 mb-4">
        <CardContent className="pt-4 px-0 pb-0">
          <div className="px-4">
            <h2 className="text-lg font-semibold mb-2">Performance</h2>
          </div>
          
          <div className="h-64">
            <ChartContainer 
              className="h-full"
              config={{
                line: {
                  label: "Price",
                  color: "#8B5CF6"
                },
                area: {
                  label: "Value",
                  color: "#8B5CF6"
                }
              }}
            >
              <AreaChart
                data={filteredData}
                margin={{
                  top: 10,
                  right: 10,
                  bottom: 0,
                  left: 0,
                }}
              >
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 10 }}
                  tickFormatter={(value) => {
                    if (timeframe === "1W") return value.slice(-2); // Day
                    if (timeframe === "1M") return value.slice(-5); // MM-DD
                    return value.slice(-5); // MM-DD for other timeframes
                  }}
                  stroke="#888"
                />
                <YAxis 
                  domain={['auto', 'auto']} 
                  tick={{ fontSize: 10 }} 
                  stroke="#888"
                  hide={true}
                />
                <Tooltip 
                  formatter={(value: number) => [`${fund.currency} ${value.toFixed(2)}`, "Price"]}
                  labelFormatter={(label) => `Date: ${label}`}
                />
                <Area 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#8B5CF6" 
                  strokeWidth={2}
                  fill="url(#colorPrice)"
                  animationDuration={500}
                />
              </AreaChart>
            </ChartContainer>
          </div>
          
          {/* Time frame selector */}
          <div className="border-t border-border mt-2">
            <div className="grid grid-cols-6 divide-x divide-border">
              {Object.keys(timeframeMap).map((key) => (
                <button
                  key={key}
                  className={`py-3 text-sm font-medium ${timeframe === key ? 'text-primary' : 'text-muted-foreground'}`}
                  onClick={() => setTimeframe(key)}
                >
                  {key}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Tabs for fund details */}
      <div className="px-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="holdings">Holdings</TabsTrigger>
            <TabsTrigger value="allocation">Allocation</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-4">Performance</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Daily Change</div>
                    <div className={`font-semibold ${fund.changes.daily >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {fund.changes.daily >= 0 ? '+' : ''}{fund.changes.daily}%
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Weekly Change</div>
                    <div className={`font-semibold ${fund.changes.weekly >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {fund.changes.weekly >= 0 ? '+' : ''}{fund.changes.weekly}%
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Monthly Change</div>
                    <div className={`font-semibold ${fund.changes.monthly >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {fund.changes.monthly >= 0 ? '+' : ''}{fund.changes.monthly}%
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Yearly Change</div>
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
                <h3 className="text-lg font-semibold mb-4">Top Holdings</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead className="text-right">Weight</TableHead>
                      <TableHead className="text-right">Change</TableHead>
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
                <h3 className="text-lg font-semibold mb-4">Sector Allocation</h3>
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
                <h3 className="text-lg font-semibold mb-4">Geographic Exposure</h3>
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
