
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Fund } from "@/types/fund";
import { usdToAed, formatCurrency } from "@/utils/currencyUtils";

interface FundCardProps {
  fund: Fund;
}

const FundCard: React.FC<FundCardProps> = ({ fund }) => {
  const navigate = useNavigate();
  const currentValue = (fund.investment / fund.currentNAV) * fund.currentNAV * (1 + fund.changes.yearly / 100);
  const profit = currentValue - fund.investment;
  const profitPercentage = (profit / fund.investment) * 100;

  // Convert USD to AED
  const investmentAED = usdToAed(fund.investment);
  const currentValueAED = usdToAed(currentValue);
  const profitAED = usdToAed(profit);
  const currentNAVAED = usdToAed(fund.currentNAV);

  const handleCardClick = () => {
    navigate(`/funds/${fund.id}`);
  };

  return (
    <Card 
      className="mb-4 hover:shadow-md transition-shadow cursor-pointer"
      onClick={handleCardClick}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-sm line-clamp-2">{fund.name}</h3>
          <div className={`text-sm font-semibold px-2 py-0.5 rounded ${fund.changes.daily >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {fund.changes.daily >= 0 ? '+' : ''}{fund.changes.daily.toFixed(2)}%
          </div>
        </div>
        
        <div className="text-xs text-muted-foreground mb-3">
          رقم ISIN: {fund.isin}
        </div>
        
        <div className="flex justify-between items-center mb-3">
          <div>
            <div className="text-xs text-muted-foreground">صافي قيمة الأصول الحالية</div>
            <div className="font-medium">
              {formatCurrency(currentNAVAED)}
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-muted-foreground">الاستثمار</div>
            <div className="font-medium">
              {formatCurrency(investmentAED)}
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            <div className="text-xs text-muted-foreground">الربح/الخسارة</div>
            <div className={`font-medium ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {profit >= 0 ? '+' : ''}{formatCurrency(profitAED)}
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-muted-foreground">العائد</div>
            <div className={`font-medium ${profitPercentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {profitPercentage >= 0 ? '+' : ''}{profitPercentage.toFixed(2)}%
            </div>
          </div>
        </div>
        
        <div className="mt-3 pt-3 border-t border-border">
          <div className="grid grid-cols-4 gap-1 text-center">
            <div>
              <div className="text-[10px] text-muted-foreground">يوم</div>
              <div className={`text-xs font-medium ${fund.changes.daily >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {fund.changes.daily >= 0 ? '+' : ''}{fund.changes.daily}%
              </div>
            </div>
            <div>
              <div className="text-[10px] text-muted-foreground">أسبوع</div>
              <div className={`text-xs font-medium ${fund.changes.weekly >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {fund.changes.weekly >= 0 ? '+' : ''}{fund.changes.weekly}%
              </div>
            </div>
            <div>
              <div className="text-[10px] text-muted-foreground">شهر</div>
              <div className={`text-xs font-medium ${fund.changes.monthly >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {fund.changes.monthly >= 0 ? '+' : ''}{fund.changes.monthly}%
              </div>
            </div>
            <div>
              <div className="text-[10px] text-muted-foreground">سنة</div>
              <div className={`text-xs font-medium ${fund.changes.yearly >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {fund.changes.yearly >= 0 ? '+' : ''}{fund.changes.yearly}%
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FundCard;
