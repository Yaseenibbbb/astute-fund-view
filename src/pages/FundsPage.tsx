
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { funds } from "@/data/fundsData";

const FundsPage: React.FC = () => {
  const navigate = useNavigate();
  
  const handleRowClick = (fundId: string) => {
    navigate(`/funds/${fundId}`);
  };
  
  return (
    <div className="pb-20">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Funds</h1>
        
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fund</TableHead>
                  <TableHead className="text-right">NAV</TableHead>
                  <TableHead className="text-right">Daily Chg</TableHead>
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
                      {fund.currency} {fund.currentNAV.toFixed(2)}
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
