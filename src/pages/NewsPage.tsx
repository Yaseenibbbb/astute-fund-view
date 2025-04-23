
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface NewsItem {
  id: string;
  title: string;
  source: string;
  date: string;
  sentiment: "positive" | "negative" | "neutral";
  impact: number; // -5 to +5 scale
  summary: string;
  relatedFunds: string[];
}

// Sample news data
const newsItems: NewsItem[] = [
  {
    id: "news1",
    title: "Gold prices surge as inflation concerns mount",
    source: "Financial Times",
    date: "2023-04-22",
    sentiment: "positive",
    impact: 3,
    summary: "Gold prices reached a six-month high as investors seek safe-haven assets amid rising inflation concerns.",
    relatedFunds: ["jupiter-gold-silver"]
  },
  {
    id: "news2",
    title: "Apple reports record quarterly revenue",
    source: "CNBC",
    date: "2023-04-21",
    sentiment: "positive",
    impact: 2,
    summary: "Apple Inc. announced record-breaking quarterly revenues, exceeding analyst expectations by 8%.",
    relatedFunds: ["allianz-income-growth", "franklin-technology", "franklin-us-opportunities"]
  },
  {
    id: "news3",
    title: "Microsoft cloud business growth slows",
    source: "Reuters",
    date: "2023-04-20",
    sentiment: "negative",
    impact: -1,
    summary: "Microsoft reported slower-than-expected growth in its cloud business division, causing concerns among investors.",
    relatedFunds: ["allianz-income-growth", "franklin-technology", "franklin-us-opportunities"]
  },
  {
    id: "news4",
    title: "Silver mining output decreases due to labor disputes",
    source: "Mining Weekly",
    date: "2023-04-19",
    sentiment: "positive",
    impact: 2,
    summary: "Global silver production declined by 3% in Q1 due to ongoing labor disputes in major mining regions, potentially driving prices higher.",
    relatedFunds: ["jupiter-gold-silver"]
  },
  {
    id: "news5",
    title: "Tech sector faces headwinds as interest rates rise",
    source: "Wall Street Journal",
    date: "2023-04-18",
    sentiment: "negative",
    impact: -2,
    summary: "Rising interest rates are putting pressure on technology company valuations, particularly affecting growth-oriented firms.",
    relatedFunds: ["franklin-technology", "franklin-us-opportunities"]
  }
];

const NewsPage: React.FC = () => {
  return (
    <div className="pb-20">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">News & Impact</h1>
        
        {newsItems.map((item) => (
          <Card key={item.id} className="mb-4">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h2 className="font-medium text-base">{item.title}</h2>
                <div 
                  className={`ml-2 px-2 py-0.5 text-xs rounded-full flex-shrink-0 ${
                    item.sentiment === "positive" ? "bg-green-100 text-green-800" : 
                    item.sentiment === "negative" ? "bg-red-100 text-red-800" : 
                    "bg-gray-100 text-gray-800"
                  }`}
                >
                  {item.sentiment === "positive" ? "+Impact" : 
                   item.sentiment === "negative" ? "-Impact" : 
                   "Neutral"}
                </div>
              </div>
              
              <div className="flex items-center text-xs text-muted-foreground mb-3">
                <span>{item.source}</span>
                <span className="mx-1">•</span>
                <span>{item.date}</span>
              </div>
              
              <p className="text-sm mb-3">{item.summary}</p>
              
              {item.relatedFunds.length > 0 && (
                <div>
                  <div className="text-xs font-medium mb-1">Affected Funds:</div>
                  <div className="flex flex-wrap gap-1">
                    {item.relatedFunds.map((fundId) => (
                      <div 
                        key={fundId} 
                        className="text-xs px-2 py-1 bg-muted rounded-full"
                      >
                        {fundId === "jupiter-gold-silver" ? "Jupiter Gold & Silver" :
                         fundId === "allianz-income-growth" ? "Allianz Income & Growth" :
                         fundId === "franklin-technology" ? "Franklin Technology" :
                         fundId === "franklin-us-opportunities" ? "Franklin US Opportunities" :
                         fundId}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="mt-2 pt-2 border-t border-border">
                <div className="flex items-center justify-between">
                  <div className="text-xs">
                    Estimated impact on holdings:
                  </div>
                  <div 
                    className={`text-xs font-medium ${
                      item.impact > 0 ? "text-green-600" :
                      item.impact < 0 ? "text-red-600" : 
                      "text-gray-500"
                    }`}
                  >
                    {item.impact > 0 ? "+" : ""}{item.impact.toFixed(1)} points
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NewsPage;
