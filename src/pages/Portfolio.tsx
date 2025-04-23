
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import FundCard from "@/components/FundCard";
import PortfolioSummary from "@/components/PortfolioSummary";
import { funds } from "@/data/fundsData";

const Portfolio: React.FC = () => {
  return (
    <div className="pb-20">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Portfolio</h1>
        
        <PortfolioSummary />
        
        <h2 className="text-lg font-semibold mb-3">Your Funds</h2>
        
        {funds.map((fund) => (
          <FundCard key={fund.id} fund={fund} />
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
