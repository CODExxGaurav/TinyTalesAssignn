import React, { useState } from "react";
import Plot from "react-plotly.js";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    setLoading(true);
    fetch("https://www.terriblytinytales.com/test.txt")
      .then((response) => response.text())
      .then((text) => {
        const words = text
          .toLowerCase()
          .replace(/[^\w\s]/g, "")
          .split(/\s+/)
          .filter((word) => word.length > 0);

        const frequencies = words.reduce((freq, word) => {
          freq[word] = (freq[word] || 0) + 1;
          return freq;
        }, {});

        const sortedFrequencies = Object.entries(frequencies).sort(
          (a, b) => b[1] - a[1]
        );

        const topWords = sortedFrequencies.slice(0, 20);
        setData(topWords);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  const handleExport = () => {
    const csvData = "data:text/csv;charset=utf-8," + 
      data.map(([word, frequency]) => `${word},${frequency}`).join('\n');
    const encodedUri = encodeURI(csvData);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "histogram.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div>
      <button onClick={fetchData} disabled={loading}>
        {loading ? "Loading..." : "Submit"}
      </button>
      {data.length > 0 && (
        <div>
          <Plot
            data={[
              {
                x: data.map(([word]) => word),
                y: data.map(([_, frequency]) => frequency),
                type: "bar",
              },
            ]}
            layout={{ width: 800, height: 600, title: "Histogram" }}
          />
          <button onClick={handleExport}>Export</button>
        </div>
      )}
    </div>
  );
}

export default App;
