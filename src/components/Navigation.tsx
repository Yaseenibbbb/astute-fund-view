
import React from "react";
import { useLocation, Link } from "react-router-dom";

const Navigation: React.FC = () => {
  const location = useLocation();
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border h-16 flex items-center justify-around z-50">
      <Link 
        to="/" 
        className={`flex flex-col items-center justify-center w-1/4 h-full ${
          location.pathname === "/" ? "text-primary" : "text-muted-foreground"
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"></path>
          <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9"></path>
          <path d="M12 3v6"></path>
        </svg>
        <span className="text-xs mt-1">Portfolio</span>
      </Link>
      
      <Link 
        to="/funds" 
        className={`flex flex-col items-center justify-center w-1/4 h-full ${
          location.pathname.startsWith("/funds") ? "text-primary" : "text-muted-foreground"
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
          <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
          <line x1="6" y1="6" x2="6.01" y2="6"></line>
          <line x1="6" y1="18" x2="6.01" y2="18"></line>
        </svg>
        <span className="text-xs mt-1">Funds</span>
      </Link>
      
      <Link 
        to="/news" 
        className={`flex flex-col items-center justify-center w-1/4 h-full ${
          location.pathname === "/news" ? "text-primary" : "text-muted-foreground"
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2Z"></path>
          <path d="M4 2v20"></path>
          <path d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"></path>
          <path d="m7 17 10-10"></path>
          <path d="M8 7h.01"></path>
          <path d="M17 17h.01"></path>
        </svg>
        <span className="text-xs mt-1">News</span>
      </Link>
      
      <Link 
        to="/alerts" 
        className={`flex flex-col items-center justify-center w-1/4 h-full ${
          location.pathname === "/alerts" ? "text-primary" : "text-muted-foreground"
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
          <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
        </svg>
        <span className="text-xs mt-1">Alerts</span>
      </Link>
    </div>
  );
};

export default Navigation;
