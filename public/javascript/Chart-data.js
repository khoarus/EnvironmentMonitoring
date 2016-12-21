var ctx = document.getElementById("myChart");

// The original draw function for the line chart. This will be applied after we have drawn our highlight range (as a rectangle behind the line chart).
var originalLineDraw = Chart.controllers.line.prototype.draw;
// Extend the line chart, in order to override the draw function.
Chart.helpers.extend(Chart.controllers.line.prototype, {
  draw : function() {
    var chart = this.chart;
    // Get the object that determines the region to highlight.
    var yHighlightRange = chart.config.data.yHighlightRange;

    // If the object exists.
    if (yHighlightRange !== undefined) {
      var ctx = chart.chart.ctx;

      var yRangeBegin = yHighlightRange.begin;
      var yRangeEnd = yHighlightRange.end;

      var xaxis = chart.scales['x-axis-0'];
      var yaxis = chart.scales['y-axis-0'];

      var yRangeBeginPixel = yaxis.getPixelForValue(yRangeBegin);
      var yRangeEndPixel = yaxis.getPixelForValue(yRangeEnd);

      ctx.save();

      // The fill style of the rectangle we are about to fill.
      ctx.fillStyle = 'rgba(0, 255, 0, 0.3)';
      // Fill the rectangle that represents the highlight region. The parameters are the closest-to-starting-point pixel's x-coordinate,
      // the closest-to-starting-point pixel's y-coordinate, the width of the rectangle in pixels, and the height of the rectangle in pixels, respectively.
      ctx.fillRect(xaxis.left, Math.min(yRangeBeginPixel, yRangeEndPixel), xaxis.right - xaxis.left, Math.max(yRangeBeginPixel, yRangeEndPixel) - Math.min(yRangeBeginPixel, yRangeEndPixel));

      ctx.restore();
    }

    // Apply the original draw function for the line chart.
    originalLineDraw.apply(this, arguments);
  }
});

var myChart = new Chart(ctx, {
  type: 'line',
  data: {
    
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [{
            label: "My First dataset",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 95, 56, 55, 40, 67, 45, 12, 44, 2],
            spanGaps: false,
    }],
    // This, if it exists at all, defines the highlight region.
    yHighlightRange : {
      begin: 80,
      end: 10,
    }
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero:true
        }
      }]
    }
  }
});