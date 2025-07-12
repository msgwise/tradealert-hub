import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-gray-800 p-4 hidden md:block">
      <h2 className="text-lg font-semibold">Filters</h2>
      <ul>
        <li>Stocks</li>
        <li>Forex</li>
        <li>Crypto</li>
      </ul>
      <h2 className="text-lg font-semibold mt-4">Watchlist</h2>
      {/* Add tickers here */}
    </aside>
  );
};

export default Sidebar;

Update for Firebase
