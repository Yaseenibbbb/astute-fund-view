
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Fund } from '@/types/fund';
import { usdToAed, formatCurrency } from '@/utils/currencyUtils';

interface InteractiveChartProps {
  data: any[];
  timeframe: string;
  fund: Fund;
  onTimeframeChange: (timeframe: string) => void;
}

const InteractiveChart: React.FC<InteractiveChartProps> = ({
  data,
  timeframe,
  fund,
  onTimeframeChange,
}) => {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  // Convert prices to AED
  const aedData = data.map(item => ({
    ...item,
    price: usdToAed(item.price)
  }));

  // Calculate moving averages
  const calculateMA = (days: number) => {
    const result = [];
    for (let i = 0; i < aedData.length; i++) {
      if (i < days - 1) {
        result.push({ date: aedData[i].date, price: null });
        continue;
      }

      let sum = 0;
      for (let j = 0; j < days; j++) {
        sum += aedData[i - j].price;
      }
      result.push({
        date: aedData[i].date,
        [`ma${days}`]: sum / days,
      });
    }
    return result;
  };

  const ma50 = calculateMA(50);

  // Handle mouse move on chart
  const handleMouseMove = (e: any) => {
    if (e && e.activeTooltipIndex !== undefined) {
      setHoveredPoint(e.activeTooltipIndex);
    }
  };

  // Handle mouse leave
  const handleMouseLeave = () => {
    setHoveredPoint(null);
  };

  // Get min and max prices for Y axis domain
  const prices = aedData.map(d => d.price);
  const minPrice = Math.min(...prices) * 0.98; // 2% margin
  const maxPrice = Math.max(...prices) * 1.02; // 2% margin

  return (
    <Card className="mb-4">
      <CardContent className="pt-4 px-0 pb-0">
        <div className="px-4">
          <h2 className="text-lg font-semibold mb-2">تحليل الأداء</h2>
        </div>
        
        <div className="h-64">
          <ChartContainer 
            className="h-full"
            config={{
              line: {
                label: "السعر",
                color: "#8B5CF6"
              },
              area: {
                label: "القيمة",
                color: "#8B5CF6"
              },
              ma50: {
                label: "المتوسط المتحرك 50",
                color: "#F59E0B"
              }
            }}
          >
            <AreaChart
              data={aedData}
              margin={{
                top: 10,
                right: 10,
                bottom: 0,
                left: 0,
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
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
                domain={[minPrice, maxPrice]} 
                tick={{ fontSize: 10 }} 
                stroke="#888"
                tickFormatter={(value) => `${Math.round(value)}`}
              />
              <Tooltip 
                formatter={(value: number) => [formatCurrency(value), "السعر"]}
                labelFormatter={(label) => `التاريخ: ${label}`}
              />
              <Area 
                type="monotone" 
                dataKey="price" 
                stroke="#8B5CF6" 
                strokeWidth={2}
                fill="url(#colorPrice)"
                animationDuration={500}
              />
              <ReferenceLine
                y={aedData[aedData.length - 1].price}
                stroke="#10B981"
                strokeDasharray="3 3"
                label={{
                  value: formatCurrency(aedData[aedData.length - 1].price),
                  position: 'right',
                  fill: '#10B981',
                  fontSize: 12,
                }}
              />
              {ma50.map((entry, index) => {
                if (entry.ma50) {
                  return (
                    <ReferenceLine
                      key={`ma-${index}`}
                      x={entry.date}
                      y={entry.ma50}
                      ifOverflow="extendDomain"
                      stroke="#F59E0B"
                      strokeWidth={2}
                      strokeOpacity={0}
                    />
                  );
                }
                return null;
              })}
              <Area
                type="monotone"
                dataKey="ma50"
                data={ma50}
                stroke="#F59E0B"
                fill="none"
                strokeWidth={2}
                dot={false}
              />
            </AreaChart>
          </ChartContainer>
        </div>
        
        {/* Time frame selector */}
        <div className="border-t border-border mt-2">
          <div className="grid grid-cols-6 divide-x divide-border">
            {['1W', '1M', '3M', '6M', '1Y', 'Max'].map((key) => (
              <button
                key={key}
                className={`py-3 text-sm font-medium ${timeframe === key ? 'text-primary' : 'text-muted-foreground'}`}
                onClick={() => onTimeframeChange(key)}
              >
                {key === '1W' ? 'أسبوع' : 
                 key === '1M' ? 'شهر' : 
                 key === '3M' ? '3 أشهر' : 
                 key === '6M' ? '6 أشهر' : 
                 key === '1Y' ? 'سنة' : 
                 'الكل'}
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InteractiveChart;
