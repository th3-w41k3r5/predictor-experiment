document.getElementById("percentileForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const score = parseFloat(document.getElementById("score").value);
  const examShift = document.getElementById("examShift").value;
  const resultDiv = document.getElementById("result");
  const spinner = document.getElementById("spinner");
  const message = document.getElementById("message");

  // Show spinner and message when calculating
  resultDiv.classList.remove("hidden");
  message.textContent = "Calculating...";
  message.className = "text-blue-400";

  try {
      const response = await fetch(`https://cors-proxy.novadrone16.workers.dev?url=${encodeURIComponent("https://percentile-predictor.iitjeepritam.workers.dev/api/calculatePercentile")}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ score, examShift }),
      });

      if (!response.ok) throw new Error("Error calculating percentile.");

      const data = await response.json();
      // Update result message on success
      message.textContent = `Your estimated percentile is: ${data.percentile.toFixed(2)}%`;
      message.className = "text-green-400";
  } catch (error) {
      console.error(error);
      // Update result message on error
      message.textContent = "Error calculating percentile. Please try again.";
      message.className = "text-red-400";
  } finally {
      // Hide spinner after calculation completes
      spinner.classList.add("hidden");
  }
});
