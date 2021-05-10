<script>
import { Doughnut, mixins } from "vue-chartjs";

export default {
  data: () => ({
    options: {
      maintainAspectRatio: false,
    },
  }),
  extends: Doughnut,
  mixins: [mixins.reactiveProp],
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
};
</script>
