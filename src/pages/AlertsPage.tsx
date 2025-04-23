
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@radix-ui/react-switch";
import { toast } from "@/components/ui/use-toast";

const AlertsPage: React.FC = () => {
  // Alert Settings
  const [priceAlerts, setPriceAlerts] = useState(true);
  const [newsAlerts, setNewsAlerts] = useState(true);
  const [reportAlerts, setReportAlerts] = useState(false);
  
  // Custom Alert Thresholds
  const [dailyChangeThreshold, setDailyChangeThreshold] = useState("5");
  
  const handleSaveSettings = () => {
    toast({
      title: "Alert settings saved",
      description: "Your notification preferences have been updated.",
    });
  };
  
  return (
    <div className="pb-20">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Alerts</h1>
        
        <Card className="mb-6">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-4">Notification Settings</h2>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Price Alerts</h3>
                  <p className="text-sm text-muted-foreground">Get notified about significant price changes</p>
                </div>
                <Switch 
                  id="price-alerts"
                  checked={priceAlerts}
                  onCheckedChange={setPriceAlerts}
                  className="data-[state=checked]:bg-primary"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">News Alerts</h3>
                  <p className="text-sm text-muted-foreground">Get notified about important news affecting your funds</p>
                </div>
                <Switch 
                  id="news-alerts"
                  checked={newsAlerts}
                  onCheckedChange={setNewsAlerts}
                  className="data-[state=checked]:bg-primary"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Financial Report Alerts</h3>
                  <p className="text-sm text-muted-foreground">Get notified when new fund reports are published</p>
                </div>
                <Switch 
                  id="report-alerts"
                  checked={reportAlerts}
                  onCheckedChange={setReportAlerts}
                  className="data-[state=checked]:bg-primary"
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="mb-6">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-4">Alert Thresholds</h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="daily-change" className="mb-1 block">Daily change threshold (%)</Label>
                <Input
                  id="daily-change"
                  type="number"
                  min="0.1"
                  max="20"
                  step="0.1"
                  value={dailyChangeThreshold}
                  onChange={(e) => setDailyChangeThreshold(e.target.value)}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  You will be notified when a fund moves more than {dailyChangeThreshold}% in a single day
                </p>
              </div>
            </div>
            
            <button 
              className="mt-6 w-full bg-primary text-primary-foreground hover:bg-primary/90 py-2 rounded-md"
              onClick={handleSaveSettings}
            >
              Save Settings
            </button>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-4">Recent Alerts</h2>
            
            <div className="text-center py-8 text-muted-foreground">
              <p>No recent alerts</p>
              <p className="text-sm mt-1">Alerts will appear here when they are triggered</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AlertsPage;
