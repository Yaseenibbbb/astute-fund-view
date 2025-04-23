
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { funds } from "@/data/fundsData";
import { usdToAed, formatCurrency } from "@/utils/currencyUtils";

const FundsPage: React.FC = () => {
  const navigate = useNavigate();
  
  const handleRowClick = (fundId: string) => {
    navigate(`/funds/${fundId}`);
  };
  
  return (
    <div className="pb-20 font-dubai">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">الصناديق</h1>
        
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>الصندوق</TableHead>
                  <TableHead className="text-right">صافي قيمة الأصول</TableHead>
                  <TableHead className="text-right">التغير اليومي</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {funds.map((fund) => (
                  <TableRow 
                    key={fund.id} 
                    className="cursor-pointer hover:bg-muted/60"
                    onClick={() => handleRowClick(fund.id)}
                  >
                    <TableCell>
                      <div className="font-medium line-clamp-2">{fund.name}</div>
                      <div className="text-xs text-muted-foreground">{fund.isin}</div>
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(usdToAed(fund.currentNAV))}
                    </TableCell>
                    <TableCell className={`text-right ${fund.changes.daily >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {fund.changes.daily >= 0 ? '+' : ''}{fund.changes.daily}%
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FundsPage;
