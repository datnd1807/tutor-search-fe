<template>
  <div>
    <base-header type="gradient-info" class="pb-6 pb-8 pt-5 pt-md-8">
      <!-- Card stats -->
      <div class="row">
        <div class="col-xl-4">
          <stats-card
            title="Total tutor"
            type="gradient-red"
            :sub-title="totalTutor"
            icon="el-icon-user-solid"
            class="mb-4 mb-xl-0"
          >
            <template slot="footer">
              <span class="text-success mr-2"
                ><i class="fa fa-arrow-up"></i
                >{{ " " + totalTutorInMonth }}</span
              >
              <span class="text-nowrap">Number of tutors in month</span>
            </template>
          </stats-card>
        </div>
        <div class="col-xl-4">
          <stats-card
            title="Total tutee"
            type="gradient-orange"
            :sub-title="totalTutee"
            icon="el-icon-user-solid"
            class="mb-4 mb-xl-0"
          >
            <template slot="footer">
              <span class="text-success mr-2"
                ><i class="fa fa-arrow-up"></i
                >{{ " " + totalTuteeInMonth }}</span
              >
              <span class="text-nowrap">Number of tutees in month</span>
            </template>
          </stats-card>
        </div>
      </div>
    </base-header>

    <!--Charts-->
    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col-xl-12 mb-xl-0">
          <card type="default" header-classes="bg-transparent">
            <div slot="header" class="row align-items-center">
              <div class="col">
                <div class="row">
                  <h6 class="text-light text-uppercase ls-1 mb-4 pr-7 pl-3">
                    Overview
                  </h6>
                  <div class="width-select">
                    <el-select
                      v-model="year"
                      placeholder="Select year"
                      size="mini"
                      @change="
                        getTransactionByYear(year, bigLineChart.activeIndex)
                      "
                    >
                      <el-option
                        v-for="(year, index) in dropDownListYear"
                        :key="index"
                        :label="year"
                        :value="year"
                      >
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <h5
                  v-if="bigLineChart.activeIndex === 0"
                  class="h3 text-white mb-3"
                >
                  Course Fee ({{ year }})
                </h5>
                <h5
                  v-if="bigLineChart.activeIndex === 0"
                  class="h4 text-white mb-3"
                >
                  Total profits: {{ totalRevenueTutor }}$
                </h5>
                <h5
                  v-if="bigLineChart.activeIndex === 1"
                  class="h3 text-white mb-3"
                >
                  Joining course Fee ({{ year }})
                </h5>
                <h5 v-if="bigLineChart.activeIndex === 1" class="h4 text-white">
                  Total revenues: {{ totalRevenueTutor }}$
                </h5>
                <h5
                  v-if="bigLineChart.activeIndex === 1"
                  class="h4 text-white mb-2"
                >
                  Total profits: {{ totalProfitsTutor }}$
                </h5>
              </div>
              <div class="col">
                <ul class="nav nav-pills justify-content-end">
                  <li class="nav-item mr-2 mr-md-0">
                    <a
                      class="nav-link py-2 px-3"
                      href="#"
                      :class="{ active: bigLineChart.activeIndex === 0 }"
                      @click="setDefaultYear(0)"
                    >
                      <span class="d-none d-md-block">Tutor</span>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link py-2 px-3"
                      href="#"
                      :class="{ active: bigLineChart.activeIndex === 1 }"
                      @click="setDefaultYear(1)"
                    >
                      <span class="d-none d-md-block">Tutee</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <line-chart
              :height="350"
              ref="bigChart"
              :chart-data="bigLineChart.chartData"
              :extra-options="bigLineChart.extraOptions"
            >
            </line-chart>
          </card>
        </div>
      </div>
      <!-- End charts-->
    </div>
  </div>
</template>
<script>
// Charts
import * as chartConfigs from "@/components/Charts/config";
import LineChart from "@/components/Charts/LineChart";
import { mapActions, mapGetters } from "vuex";
import moment from "moment";
import VueCookies from "vue-cookies";
export default {
  components: {
    LineChart,
  },
  computed: {
    ...mapGetters([
      "getTutees",
      "getNumberTutor",
      "getTuteeInMonth",
      "getTutorInMonth",
      "getTutorTransaction",
      "getTuteeTransaction",
    ]),
    totalTutee() {
      return this.getTutees.length.toString();
    },
    totalTutor() {
      return this.getNumberTutor.toString();
    },
    totalTuteeInMonth() {
      return this.getTuteeInMonth;
    },
    totalTutorInMonth() {
      return this.getTutorInMonth;
    },
  },
  data() {
    return {
      bigLineChart: {
        allData: [[], []],
        activeIndex: 0,
        chartData: {
          datasets: [],
          labels: [],
        },
        extraOptions: chartConfigs.blueChartOptions,
      },
      dropDownListYear: [],
      year: 0,
      filter: {},
      totalProfitsTutor: 0,
      totalRevenueTutor: 0,
    };
  },
  methods: {
    ...mapActions([
      "getTutorTransactionPerMonth",
      "getTuteeTransactionPerMonth",
    ]),
    async init() {
      await this.getTutorTransactionPerMonth(moment().format("YYYY"));
      await this.getTuteeTransactionPerMonth(moment().format("YYYY"));
    },
    initBigChart(index) {
      this.totalRevenueTutor = 0;
      this.totalProfitsTutor = 0;
      if (index == 0 || index == 1) {
        let chartData = {
          datasets: [
            {
              label: "Profits ($)",
              data: [],
            },
          ],
          labels: [],
        };
        if (index == 0) {
          for (const index of this.getTutorTransaction) {
            chartData.labels.push(index[0].month);
            chartData.datasets[0].data.push(
              Math.round(index[0].totalAmount * 100) / 100
            );
            this.totalRevenueTutor =
              this.totalRevenueTutor +
              Math.round(index[0].totalAmount * 100) / 100;
          }
        } else {
          for (const index of this.getTuteeTransaction) {
            chartData.labels.push(index[0].month);
            chartData.datasets[0].data.push(
              Math.round(index[0].totalRevenue * 100) / 100
            );
            this.totalRevenueTutor =
              this.totalRevenueTutor +
              Math.round(index[0].totalAmount * 100) / 100;
            this.totalProfitsTutor =
              this.totalProfitsTutor +
              Math.round(index[0].totalRevenue * 100) / 100;
          }
        }
        this.bigLineChart.chartData = chartData;
        this.bigLineChart.activeIndex = index;
      } else {
        let chartData = {
          datasets: [
            {
              label: "Profits",
              data: this.bigLineChart.allData[index],
            },
          ],
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
        };
        this.bigLineChart.chartData = chartData;
        this.bigLineChart.activeIndex = index;
      }
    },
    listYear() {
      var year = moment().format("YYYY");
      for (let i = 2020; i <= year; i++) {
        this.dropDownListYear.push(i);
      }
    },
    async getTransactionByYear(year, index) {
      if (index == 0) {
        await this.getTutorTransactionPerMonth(year);
      } else {
        await this.getTuteeTransactionPerMonth(year);
      }
      this.initBigChart(index);
    },
    async setDefaultYear(index) {
      await this.getTransactionByYear(moment().format("YYYY"), index);
      this.year = 2021;
    },
  },
  async mounted() {
    if (VueCookies.get("token") != null) {
      await this.init();
      this.initBigChart(0);
      this.year = moment().format("YYYY");
      this.listYear();
    }
  },
};
</script>
<style lang="scss" scoped>
.width-select {
  width: 80px;
}
</style>
