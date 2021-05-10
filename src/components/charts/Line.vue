<script>
import { Line, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  data: () => ({
    options: {
      maintainAspectRatio: false,
      legend: {
        labels: {
          // fontSize: 14,
          color: "#fff",
        },
      },
    },
  }),
  extends: Line,
  mixins: [reactiveProp],
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
};
</script>
