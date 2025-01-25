document.getElementById("percentileForm").addEventListener("submit", async function (e) {
    e.preventDefault();
  
    const score = parseFloat(document.getElementById("score").value);
    const examShift = document.getElementById("examShift").value;
    const resultDiv = document.getElementById("result");
  
    resultDiv.textContent = "Calculating...";
    resultDiv.className = "text-blue-400";
  
    try {
        const response = await fetch(`https://cors-proxy.novadrone16.workers.dev?url=${encodeURIComponent("https://percentile-predictor.iitjeepritam.workers.dev/api/calculatePercentile")}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ score, examShift }),
      });
  
      if (!response.ok) throw new Error("Error calculating percentile.");
  
      const data = await response.json();
      resultDiv.textContent = `Your estimated percentile is: ${data.percentile.toFixed(2)}%`;
      resultDiv.className = "text-green-400";
    } catch (error) {
      console.error(error);
      resultDiv.textContent = "Error calculating percentile. Please try again.";
      resultDiv.className = "text-red-400";
    }
  });
  