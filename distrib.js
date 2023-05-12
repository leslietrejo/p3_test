fetch('project3t.csv')
  .then(response => response.text())
  .then(data => {
    const rows = data.split('\n');
    const columnA = rows.map(row => row.split(',')[0]);
    console.log(columnA); // outputs the data in Column A as an array
    const columnE = rows.map(row => row.split(',')[4]);
    console.log(columnE); // outputs the data in Column E as an array

    const mean = columnE.reduce((a, b) => a + parseFloat(b), 0) / columnE.length;
    const standardDeviation = Math.sqrt(columnE.reduce((sq, n) => sq + Math.pow(parseFloat(n) - mean, 2), 0) / columnE.length);

    // Generate data points for the bell curve
    const curveData = [];
    for (let i = 0; i <= 100; i++) {
      const x = i / 100;
      const y = (1 / (standardDeviation * Math.sqrt(2 * Math.PI))) * Math.exp(-Math.pow((x - mean) / standardDeviation, 2) / 2);
      curveData.push({ x, y });
    }

    // Prepare data for chart
    const chartData = {
      datasets: [
        {
          label: 'Bell Curve',
          data: curveData,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }
      ]
    };

    // Create chart
    const ctx = document.getElementById('bellCurveChart').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: chartData,
      options: {
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Column A'
            }
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Probability'
            }
          }
        }
      }
    });
  });