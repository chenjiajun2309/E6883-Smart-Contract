import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, ComposedChart } from 'recharts';

const NFTMarketAnalysis = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Monthly transaction data
  const monthlyData = [
    { month: '2023-04', transactions: 1202, volume: 28828, avgPrice: 23.98 },
    { month: '2023-05', transactions: 1124, volume: 28884, avgPrice: 25.70 },
    { month: '2023-06', transactions: 824, volume: 16195, avgPrice: 19.65 },
    { month: '2023-07', transactions: 556, volume: 12208, avgPrice: 21.96 },
    { month: '2023-08', transactions: 612, volume: 13045, avgPrice: 21.32 },
    { month: '2023-09', transactions: 1108, volume: 17408, avgPrice: 15.71 },
    { month: '2023-10', transactions: 388, volume: 515, avgPrice: 1.33 },
    { month: '2023-11', transactions: 279, volume: 63, avgPrice: 0.23 },
    { month: '2023-12', transactions: 127, volume: 106, avgPrice: 0.84 },
    { month: '2024-01', transactions: 143, volume: 93, avgPrice: 0.66 },
    { month: '2024-02', transactions: 82, volume: 49, avgPrice: 0.61 },
    { month: '2024-03', transactions: 72, volume: 92, avgPrice: 1.29 },
    { month: '2024-04', transactions: 221, volume: 25, avgPrice: 0.12 },
    { month: '2024-05', transactions: 64, volume: 50, avgPrice: 0.79 },
    { month: '2024-06', transactions: 43, volume: 3, avgPrice: 0.09 },
    { month: '2024-07', transactions: 43, volume: 5, avgPrice: 0.14 },
    { month: '2024-08', transactions: 32, volume: 6, avgPrice: 0.19 },
    { month: '2024-09', transactions: 12, volume: 4, avgPrice: 0.37 },
    { month: '2024-10', transactions: 19, volume: 5, avgPrice: 0.29 },
    { month: '2024-11', transactions: 11, volume: 3, avgPrice: 0.30 },
    { month: '2024-12', transactions: 22, volume: 14, avgPrice: 0.65 },
    { month: '2025-01', transactions: 13, volume: 10, avgPrice: 0.78 },
    { month: '2025-02', transactions: 13, volume: 5, avgPrice: 0.39 },
    { month: '2025-03', transactions: 11, volume: 5, avgPrice: 0.46 },
    { month: '2025-04', transactions: 3, volume: 0.5, avgPrice: 0.17 },
    { month: '2025-05', transactions: 2, volume: 2, avgPrice: 1.03 },
    { month: '2025-06', transactions: 6, volume: 0.85, avgPrice: 0.80 }
  ];

  // Price distribution data
  const priceDistributionData = [
    { name: 'Under 0.01 ETH', value: 212 },
    { name: '0.01-0.1 ETH', value: 1569 },
    { name: '0.1-1 ETH', value: 1320 },
    { name: '1-10 ETH', value: 264 },
    { name: '10-50 ETH', value: 3658 },
    { name: '50-100 ETH', value: 3 }
  ];

  const recentPriceDistributionData = [
    { name: '0.01-0.1 ETH', value: 47 },
    { name: '0.1-1 ETH', value: 31 },
    { name: '1-10 ETH', value: 22 }
  ];

  // Top collections data
  const topCollectionsData = [
    { name: 'Collection 1', value: 68617 },
    { name: 'Collection 2', value: 46900 },
    { name: 'BAYC', value: 656 },
    { name: 'Azuki', value: 161 },
    { name: 'MAYC', value: 91 }
  ];

  // Market concentration data
  const marketConcentrationData = [
    { month: '2024-12', uniqueCollections: 15, marketConcentration: 0.09 },
    { month: '2025-01', uniqueCollections: 7, marketConcentration: 0.16 },
    { month: '2025-02', uniqueCollections: 3, marketConcentration: 0.62 },
    { month: '2025-03', uniqueCollections: 4, marketConcentration: 0.37 },
    { month: '2025-04', uniqueCollections: 2, marketConcentration: 0.56 },
    { month: '2025-05', uniqueCollections: 2, marketConcentration: 0.50 },
    { month: '2025-06', uniqueCollections: 2, marketConcentration: 0.48 }
  ];

  // Transaction interval data
  const transactionIntervalData = [
    { month: '2024-12', avgHours: 33.72 },
    { month: '2025-01', avgHours: 52.78 },
    { month: '2025-02', avgHours: 43.20 },
    { month: '2025-03', avgHours: 80.58 },
    { month: '2025-04', avgHours: 47.41 },
    { month: '2025-05', avgHours: 417.49 },
    { month: '2025-06', avgHours: 181.83 }
  ];

  // COLORS
  const COLORS = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c', '#d0ed57', '#ffc658'];

  return (
    <div className="flex flex-col h-full p-4 bg-gray-50">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">LooksRare NFT Market Analysis</h1>
      
      <div className="mb-6 bg-white rounded-lg p-4 shadow">
        <h2 className="text-xl font-semibold mb-2">Next 30 Days Prediction Summary</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-blue-50 rounded border border-blue-200">
            <p className="font-medium">Volume Trend: <span className="text-red-500 font-bold">Downward</span></p>
            <p>Predicted Volume: <span className="font-bold">0.85 ETH</span></p>
          </div>
          <div className="p-3 bg-blue-50 rounded border border-blue-200">
            <p className="font-medium">Price Trend: <span className="text-green-500 font-bold">Upward</span></p>
            <p>Predicted Avg Price: <span className="font-bold">0.80 ETH</span></p>
          </div>
          <div className="p-3 bg-blue-50 rounded border border-blue-200">
            <p className="font-medium">Transaction Trend: <span className="text-red-500 font-bold">Downward</span></p>
            <p>Predicted Transactions: <span className="font-bold">6</span></p>
          </div>
          <div className="p-3 bg-blue-50 rounded border border-blue-200">
            <p className="font-medium">Market Volatility</p>
            <p>Predicted Coefficient: <span className="font-bold">1.31</span></p>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex border-b border-gray-200">
          <button 
            className={`px-4 py-2 ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-600 hover:text-gray-800'}`}
            onClick={() => setActiveTab('overview')}
          >
            Market Overview
          </button>
          <button 
            className={`px-4 py-2 ${activeTab === 'price' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-600 hover:text-gray-800'}`}
            onClick={() => setActiveTab('price')}
          >
            Price Analysis
          </button>
          <button 
            className={`px-4 py-2 ${activeTab === 'collections' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-600 hover:text-gray-800'}`}
            onClick={() => setActiveTab('collections')}
          >
            Collections
          </button>
        </div>
      </div>
      
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Monthly Transaction Volume</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" tickFormatter={(value) => value.substring(5)} />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="transactions" name="Transactions" fill="#8884d8" />
                  <Line yAxisId="right" type="monotone" dataKey="volume" name="Volume (ETH)" stroke="#ff7300" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-2 text-sm text-gray-600">The data shows a significant decline in both transaction count and volume since April 2023.</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Average Price Per Transaction</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" tickFormatter={(value) => value.substring(5)} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="avgPrice" name="Avg Price (ETH)" stroke="#82ca9d" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-2 text-sm text-gray-600">Average price per transaction has stabilized between 0.3-1.0 ETH in recent months.</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Transaction Frequency (Last 6 Months)</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={transactionIntervalData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" tickFormatter={(value) => value.substring(5)} />
                  <YAxis label={{ value: 'Hours Between Tx', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="avgHours" name="Hours Between Transactions" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-2 text-sm text-gray-600">Transaction frequency has decreased dramatically, with over 417 hours between transactions in May 2025.</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Market Health Indicators</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={marketConcentrationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" tickFormatter={(value) => value.substring(5)} />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" domain={[0, 1]} />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="uniqueCollections" name="Unique Collections" fill="#8884d8" />
                  <Line yAxisId="right" type="monotone" dataKey="marketConcentration" name="Market Concentration" stroke="#ff7300" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-2 text-sm text-gray-600">Increasing market concentration with fewer active collections indicates consolidation.</p>
          </div>
        </div>
      )}
      
      {activeTab === 'price' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Overall Price Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={priceDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {priceDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-2 text-sm text-gray-600">Historically, 10-50 ETH transactions dominated the market (52%), followed by 0.01-0.1 ETH (22%).</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Recent Price Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={recentPriceDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {recentPriceDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-2 text-sm text-gray-600">Recent transactions show a shift to lower price ranges, with 47% in 0.01-0.1 ETH range.</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow lg:col-span-2">
            <h3 className="text-lg font-semibold mb-2">Price Trends & Volatility (Last 12 Months)</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={monthlyData.slice(-13)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" tickFormatter={(value) => value.substring(5)} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="avgPrice" name="Avg Price (ETH)" fill="#8884d8" />
                  <Line type="monotone" dataKey="avgPrice" name="Trend Line" stroke="#ff7300" dot={false} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-2 text-sm text-gray-600">Price volatility remains high, but the overall trend shows stabilization with a slight upward trend predicted.</p>
          </div>
        </div>
      )}
      
      {activeTab === 'collections' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Top Collections by Volume</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical" data={topCollectionsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={80} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" name="Volume (ETH)" fill="#8884d8">
                    {topCollectionsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-2 text-sm text-gray-600">Two collections have dominated the total volume, accounting for over 115,000 ETH.</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Collection Diversity & Concentration</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={marketConcentrationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" tickFormatter={(value) => value.substring(5)} />
                  <YAxis domain={[0, 1]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="marketConcentration" name="Market Concentration" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-2 text-sm text-gray-600">Market concentration has increased significantly (indicating less diversity).</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow lg:col-span-2">
            <h3 className="text-lg font-semibold mb-2">Prediction and Recommendations</h3>
            <div className="p-4 bg-blue-50 rounded border border-blue-200">
              <h4 className="font-semibold mb-2">Market Predictions:</h4>
              <ul className="list-disc ml-4 mb-4">
                <li>Expected transaction volume: ~0.85 ETH</li>
                <li>Projected transaction count: 5-8 transactions</li>
                <li>Average price: ~0.80 ETH</li>
                <li>Market concentration: Remaining high at ~0.48</li>
                <li>Collection diversity: Continued low with 2-3 active collections</li>
              </ul>
              
              <h4 className="font-semibold mb-2">Strategic Recommendations:</h4>
              <ul className="list-disc ml-4">
                <li>Sellers: Focus on realistic pricing in the 0.01-1 ETH range</li>
                <li>Buyers: Take advantage of increased negotiating power in this low-liquidity market</li>
                <li>Investors: Evaluate collection-specific metrics rather than overall market trends</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NFTMarketAnalysis;