<template>
  <div>
    <Chart type="pie" :data="chartData" :options="chartOptions" class="chart" />
  </div>
</template>

<script setup>
import Chart from "primevue/chart";
import { ref, onMounted } from "vue";

onMounted(() => {
  chartData.value = setChartData();
  chartOptions.value = setChartOptions();
});

const chartData = ref();
const chartOptions = ref();

const colors = [
  "#DC143C",
  "#19183B",
  "#A7E399",
  "#FAA533",
  "#0BA6DF",
  "#59AC77",
  "#FF9A00",
  "#6A0066",
  "#0BA6DF",
];

const { datas, type } = defineProps({
  datas: {
    required: true,
  },
  type: {},
});

const categoryData =
  type === "deposit"
    ? { ...datas.depositCategories }
    : { ...datas.withdrawCategories };

console.log(categoryData);

const setChartData = () => {
  const documentStyle = getComputedStyle(document.body);

  return {
    labels: Object.keys(categoryData),
    datasets: [
      {
        data: Object.values(categoryData),
        backgroundColor: colors.slice(0, Object.values(categoryData).length),
        // hoverBackgroundColor: ["pink", "yellow", "purple"],
      },
    ],
  };
};

const setChartOptions = () => {
  return {
    plugins: {
      legend: {
        position: type === "deposit" ? "right" : "left",
        labels: {
          usePointStyle: true,
          color: "white",
          boxWidth: 12,
          padding: 20,
        },
      },
    },
  };
};
</script>

<style scoped></style>
