<script>
import { Bar, mixins } from "vue-chartjs";

export default {
  data: () => ({
    options: {
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            stacked: true,
          },
        ],
      },
      legend: {
        display: false,
      },
    },
  }),
  extends: Bar,
  mixins: [mixins.reactiveProp],
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
};
</script>
