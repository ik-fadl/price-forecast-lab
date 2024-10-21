<template>
  <div class="relative w-full h-full">
    <template v-if="series.length > 0">
      <VueApexCharts :height="height" type="line" :options="options" :series="series"></VueApexCharts>
    </template>
  </div>
</template>

<script setup>
import utils from "@/utils/utils";
import VueApexCharts from "vue3-apexcharts";
</script>

<script>
export default {
  props: {
    height: { required: false },
    series: { required: true },
  },
  data() {
    return {
      options: {
        chart: {
          type: 'line',
          height: this.height,
          toolbar: {
            show: true,
            tools: {
              download: true,
              selection: true,
              zoom: true,
              zoomin: true,
              zoomout: true,
              pan: true,
              reset: true
            }
          },
          dropShadow: {
            enabled: true,
            color: '#000',
            top: 15,
            left: 3,
            blur: 3,
            opacity: 0.09
          }
        },
        fill: {
          colors: ['#5fa0cb', '#d4526e']
        },
        plotOptions: {
          bar: {
            borderRadius: 5,
            horizontal: false,
            columnWidth: '15px',
            endingShape: 'rounded'
          },
        },
        dataLabels: {
          enabled: false
        },
        legend: {
          markers: {
            fillColors: ['#5fa0cb', '#d4526e'],
          }
        },
        stroke: {
          show: true,
          width: 3,
          colors: ['#5fa0cb', '#d4526e'],
          curve: 'smooth'
        },
        xaxis: {
          // categories: [],
          labels: {
            show: false,
          }
        },
        yaxis: {
          decimalsInFloat: 2,
          title: {
            text: 'harga',
            style: {
              color: '#212121'
            }
          },
          labels: {
            show: true,
          },
        },
        tooltip: {
          theme: 'light',
          y: {
            formatter: function (val) {
              return utils.numb(val)
            }
          }
        }
      }
    }
  },
  computed: {

  },
  methods: {
    async setSeries() {
      this.series
      this.options
    }
  },
  mounted() {
    this.setSeries()
  }
}
</script>
