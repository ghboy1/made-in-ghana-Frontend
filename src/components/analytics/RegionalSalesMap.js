import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';
import './Analytics.css';

// Ghana region coordinates (simplified for demonstration)
const ghanaRegions = [
  { name: 'Ashanti', x: 50, y: 45, value: 32 },
  { name: 'Greater Accra', x: 65, y: 65, value: 28 },
  { name: 'Northern', x: 50, y: 20, value: 15 },
  { name: 'Eastern', x: 70, y: 55, value: 10 },
  { name: 'Western', x: 25, y: 70, value: 8 },
  { name: 'Volta', x: 75, y: 65, value: 5 },
  { name: 'Central', x: 50, y: 75, value: 2 }
];

const RegionalSalesMap = ({ regionData }) => {
  const canvasRef = useRef(null);
  const chartInstance = useRef(null);
  
  useEffect(() => {
    if (canvasRef.current) {
      // Clean up previous chart if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      
      const ctx = canvasRef.current.getContext('2d');
      
      // Create a bubble chart acting as a map
      chartInstance.current = new Chart(ctx, {
        type: 'bubble',
        data: {
          datasets: [{
            label: 'Regional Sales Distribution',
            data: ghanaRegions.map(region => ({
              x: region.x,
              y: region.y,
              r: region.value / 2 + 5, // Scale bubble size based on value
              value: region.value,
              name: region.name
            })),
            backgroundColor: context => {
              const value = context.raw.value;
              // Color gradient based on sales value
              if (value > 25) return 'rgba(206, 17, 38, 0.7)'; // High - red
              if (value > 15) return 'rgba(252, 209, 22, 0.7)'; // Medium - gold
              return 'rgba(0, 107, 63, 0.7)'; // Low - green
            },
            borderColor: 'rgba(0, 0, 0, 0.2)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          aspectRatio: 1.2,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  return `${context.raw.name}: ${context.raw.value}% of sales`;
                }
              }
            },
            title: {
              display: true,
              text: 'Ghana Regional Sales Distribution',
              font: { size: 16 }
            }
          },
          scales: {
            x: {
              min: 0,
              max: 100,
              display: false
            },
            y: {
              min: 0,
              max: 100,
              display: false
            }
          },
          // Add Ghana map as background image
          backgroundImage: {
            url: '/images/ghana-map-outline.png',
            width: '100%',
            height: '100%'
          }
        }
      });
      
      // Optional: Add map background
      const addMapBackground = () => {
        const chart = chartInstance.current;
        const ctx = chart.ctx;
        const chartArea = chart.chartArea;
        
        if (chartArea) {
          // Draw country outline or regions here
          // For a real implementation, you'd use an actual map of Ghana
          ctx.save();
          ctx.globalCompositeOperation = 'destination-over';
          ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
          ctx.lineWidth = 1;
          
          // Draw a simple outline for demo purposes
          ctx.beginPath();
          ctx.moveTo(chartArea.left + chartArea.width * 0.3, chartArea.top + chartArea.height * 0.2);
          ctx.lineTo(chartArea.left + chartArea.width * 0.7, chartArea.top + chartArea.height * 0.3);
          ctx.lineTo(chartArea.left + chartArea.width * 0.8, chartArea.top + chartArea.height * 0.7);
          ctx.lineTo(chartArea.left + chartArea.width * 0.5, chartArea.top + chartArea.height * 0.9);
          ctx.lineTo(chartArea.left + chartArea.width * 0.2, chartArea.top + chartArea.height * 0.8);
          ctx.closePath();
          ctx.stroke();
          
          ctx.restore();
        }
      };
      
      // Add the background after render
      chartInstance.current.afterDraw = addMapBackground;
    }
    
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [regionData]);

  return (
    <div className="analytics-container regional-map-container">
      <h2 className="section-title">Regional Sales Distribution</h2>
      <div className="map-wrapper">
        <canvas ref={canvasRef} />
        <div className="map-legend">
          <div className="legend-item">
            <div className="legend-color" style={{backgroundColor: 'rgba(206, 17, 38, 0.7)'}}></div>
            <span>High sales ({'>'}25%)</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{backgroundColor: 'rgba(252, 209, 22, 0.7)'}}></div>
            <span>Medium sales (15-25%)</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{backgroundColor: 'rgba(0, 107, 63, 0.7)'}}></div>
            <span>Lower sales (&lt;15%)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegionalSalesMap;