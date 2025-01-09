<template>
  <div>
    <apexchart type="bar" :options="chartOptions" :series="series" width="500" height="500" />
  </div>
</template>

<script>
import utils from "@/utils/utils";
import VueApexCharts from "vue3-apexcharts";

export default {
  components: {
    apexchart: VueApexCharts,
  },
  props: {
    series: { required: true },
    // yaxis: { required: false },
  },
  data() {
    return {
      chartOptions: {
        chart: {
          type: "bar",
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            horizontal: true,
            barHeight: "90%",
            borderRadius: 5,
            distributed: true,
          },
        },
        colors: ["#4D9BF5", "#F55A8A", "#4FD07D", "#F5C25A", "#8A5AF5"],
        dataLabels: {
          enabled: true,
          style: {
            fontSize: "14px",
            colors: ["#FFFFFF"],
          },
          formatter: (value) => `${utils.numb(Number(value))}`,
        },
        xaxis: {
          // categories: this.yaxis,
          labels: {
            formatter: (value) => `${value / 1000}K`,
          },
        },
        legend: {
          show: false, // Nonaktifkan legend
        },
        grid: {
          row: {
            show: false
          },
          column: {
            show: true,
            borderColor: '#f8f8f8',
            colors: ['#f8f8f8', 'transparent'],
          },
          yaxis: {
            lines: {
              show: true
            }
          },
          xaxis: {
            lines: {
              show: false
            }
          }
        },
        tooltip: {
          enabled: false,
        }
      },
    };
  },
};
</script>

<style scoped>
/* Tambahkan styling jika diperlukan */
</style>
