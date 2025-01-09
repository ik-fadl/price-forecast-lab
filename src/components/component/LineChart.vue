<template>
  <div class="relative w-full h-full">
    <template v-if="series.length > 0">
      <VueApexCharts :height="height" :width="width" :type="type ?? 'line'" :options="options" :series="series">
      </VueApexCharts>
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
    hidden: { required: false },
    type: { required: false },
    width: { required: false },
    series: { required: true },
  },
  data() {
    return {
      options: {
        chart: {
          type: this.type ?? 'line',
          height: this.height,
          toolbar: {
            show: !this.hidden,
            tools: {
              download: !this.hidden,
              selection: !this.hidden,
              zoom: !this.hidden,
              zoomin: !this.hidden,
              zoomout: !this.hidden,
              pan: !this.hidden,
              reset: !this.hidden
            }
          },
          dropShadow: {
            enabled: !this.hidden,
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
        grid: {
          show: !this.hidden,
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
          },
          axisBorder: {
            show: !this.hidden,
          },
          axisTicks: {
            show: !this.hidden,
          },
        },
        yaxis: {
          decimalsInFloat: 2,
          show: !this.hidden,
          title: {
            text: 'harga',
            style: {
              color: '#212121'
            }
          },
          labels: {
            show: !this.hidden,
            formatter: (value) => `${value / 1000}K`,
          },
        },
        tooltip: {
          enabled: !this.hidden,
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
