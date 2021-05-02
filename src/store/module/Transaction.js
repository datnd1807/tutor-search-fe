import http from "../../http-common";
import moment from "moment";
const managerManagement = {
  state: {
    transactions: [],
    tutorTransaction: [],
    tuteeTransaction: [],
  },
  getters: {
    getTransactions: (state) => {
      if (state.transactions.length != 0) {
        return state.transactions.sort((a, b) => {
          if (new Date(a.dateTime).getTime() > new Date(b.dateTime).getTime())
            return -1;
          else if (
            new Date(a.dateTime).getTime() < new Date(b.dateTime).getTime()
          )
            return 1;
          else return 0;
        });
      } else {
        return [];
      }
    },
    getTutorTransaction: (state) => {
      var i;
      var data = [
        {
          year: 0,
          month: "",
          totalAmount: 0,
        },
      ];
      const year = parseInt(moment().format("YYYY"));
      var month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
      for (i = 0; i < month.length; i++) {
        if (state.tutorTransaction[i] != undefined) {
          if (state.tutorTransaction[i].month != month[i]) {
            if (month[i] == 1) {
              data = [
                {
                  year: year,
                  month: "Jan",
                  totalAmount: 0,
                },
              ];
            } else if (month[i] == 2) {
              data = [
                {
                  year: year,
                  month: "Feb",
                  totalAmount: 0,
                },
              ];
            } else if (month[i] == 3) {
              data = [
                {
                  year: year,
                  month: "Mar",
                  totalAmount: 0,
                },
              ];
            } else if (month[i] == 4) {
              data = [
                {
                  year: year,
                  month: "Apr",
                  totalAmount: 0,
                },
              ];
            } else if (month[i] == 5) {
              data = [
                {
                  year: year,
                  month: "May",
                  totalAmount: 0,
                },
              ];
            } else if (month[i] == 6) {
              data = [
                {
                  year: year,
                  month: "Jun",
                  totalAmount: 0,
                },
              ];
            } else if (month[i] == 7) {
              data = [
                {
                  year: year,
                  month: "Jul",
                  totalAmount: 0,
                },
              ];
            } else if (month[i] == 8) {
              data = [
                {
                  year: year,
                  month: "Aug",
                  totalAmount: 0,
                },
              ];
            } else if (month[i] == 9) {
              data = [
                {
                  year: year,
                  month: "Sep",
                  totalAmount: 0,
                },
              ];
            } else if (month[i] == 10) {
              data = [
                {
                  year: year,
                  month: "Oct",
                  totalAmount: 0,
                },
              ];
            } else if (month[i] == 11) {
              data = [
                {
                  year: year,
                  month: "Nov",
                  totalAmount: 0,
                },
              ];
            } else if (month[i] == 12) {
              data = [
                {
                  year: year,
                  month: "Dec",
                  totalAmount: 0,
                },
              ];
            }
            state.tutorTransaction.splice(i, 0, data);
          } else {
            if (month[i] == 1) {
              state.tutorTransaction[i] = [
                {
                  year: year,
                  month: "Jan",
                  totalAmount: state.tutorTransaction[i].totalAmount,
                },
              ];
            } else if (month[i] == 2) {
              state.tutorTransaction[i] = [
                {
                  year: year,
                  month: "Feb",
                  totalAmount: state.tutorTransaction[i].totalAmount,
                },
              ];
            } else if (month[i] == 3) {
              state.tutorTransaction[i] = [
                {
                  year: year,
                  month: "Mar",
                  totalAmount: state.tutorTransaction[i].totalAmount,
                },
              ];
            } else if (month[i] == 4) {
              state.tutorTransaction[i] = [
                {
                  year: year,
                  month: "Apr",
                  totalAmount: state.tutorTransaction[i].totalAmount,
                },
              ];
            } else if (month[i] == 5) {
              state.tutorTransaction[i] = [
                {
                  year: year,
                  month: "May",
                  totalAmount: state.tutorTransaction[i].totalAmount,
                },
              ];
            } else if (month[i] == 6) {
              state.tutorTransaction[i] = [
                {
                  year: year,
                  month: "Jun",
                  totalAmount: state.tutorTransaction[i].totalAmount,
                },
              ];
            } else if (month[i] == 7) {
              state.tutorTransaction[i] = [
                {
                  year: year,
                  month: "Jul",
                  totalAmount: state.tutorTransaction[i].totalAmount,
                },
              ];
            } else if (month[i] == 8) {
              state.tutorTransaction[i] = [
                {
                  year: year,
                  month: "Aug",
                  totalAmount: state.tutorTransaction[i].totalAmount,
                },
              ];
            } else if (month[i] == 9) {
              state.tutorTransaction[i] = [
                {
                  year: year,
                  month: "Sep",
                  totalAmount: state.tutorTransaction[i].totalAmount,
                },
              ];
            } else if (month[i] == 10) {
              state.tutorTransaction[i] = [
                {
                  year: year,
                  month: "Oct",
                  totalAmount: state.tutorTransaction[i].totalAmount,
                },
              ];
            } else if (month[i] == 11) {
              state.tutorTransaction[i] = [
                {
                  year: year,
                  month: "Nov",
                  totalAmount: state.tutorTransaction[i].totalAmount,
                },
              ];
            } else if (month[i] == 12) {
              state.tutorTransaction[i] = [
                {
                  year: year,
                  month: "Dec",
                  totalAmount: state.tutorTransaction[i].totalAmount,
                },
              ];
            }
          }
        } else {
          if (month[i] == 1) {
            data = [
              {
                year: year,
                month: "Jan",
                totalAmount: 0,
              },
            ];
          } else if (month[i] == 2) {
            data = [
              {
                year: year,
                month: "Feb",
                totalAmount: 0,
              },
            ];
          } else if (month[i] == 3) {
            data = [
              {
                year: year,
                month: "Mar",
                totalAmount: 0,
              },
            ];
          } else if (month[i] == 4) {
            data = [
              {
                year: year,
                month: "Apr",
                totalAmount: 0,
              },
            ];
          } else if (month[i] == 5) {
            data = [
              {
                year: year,
                month: "May",
                totalAmount: 0,
              },
            ];
          } else if (month[i] == 6) {
            data = [
              {
                year: year,
                month: "Jun",
                totalAmount: 0,
              },
            ];
          } else if (month[i] == 7) {
            data = [
              {
                year: year,
                month: "Jul",
                totalAmount: 0,
              },
            ];
          } else if (month[i] == 8) {
            data = [
              {
                year: year,
                month: "Aug",
                totalAmount: 0,
              },
            ];
          } else if (month[i] == 9) {
            data = [
              {
                year: year,
                month: "Sep",
                totalAmount: 0,
              },
            ];
          } else if (month[i] == 10) {
            data = [
              {
                year: year,
                month: "Oct",
                totalAmount: 0,
              },
            ];
          } else if (month[i] == 11) {
            data = [
              {
                year: year,
                month: "Nov",
                totalAmount: 0,
              },
            ];
          } else if (month[i] == 12) {
            data = [
              {
                year: year,
                month: "Dec",
                totalAmount: 0,
              },
            ];
          }
          state.tutorTransaction.splice(i, 0, data);
        }
      }
      return state.tutorTransaction;
    },
    getTuteeTransaction: (state) => {
      var i;
      var data = [
        {
          year: 0,
          month: "",
          totalAmount: 0,
          totalRevenue: 0,
        },
      ];
      const year = parseInt(moment().format("YYYY"));
      var month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
      for (i = 0; i < month.length; i++) {
        if (state.tuteeTransaction[i] != undefined) {
          if (state.tuteeTransaction[i].month != month[i]) {
            if (month[i] == 1) {
              data = [
                {
                  year: year,
                  month: "Jan",
                  totalAmount: 0,
                  totalRevenue: 0,
                },
              ];
            } else if (month[i] == 2) {
              data = [
                {
                  year: year,
                  month: "Feb",
                  totalAmount: 0,
                  totalRevenue: 0,
                },
              ];
            } else if (month[i] == 3) {
              data = [
                {
                  year: year,
                  month: "Mar",
                  totalAmount: 0,
                  totalRevenue: 0,
                },
              ];
            } else if (month[i] == 4) {
              data = [
                {
                  year: year,
                  month: "Apr",
                  totalAmount: 0,
                  totalRevenue: 0,
                },
              ];
            } else if (month[i] == 5) {
              data = [
                {
                  year: year,
                  month: "May",
                  totalAmount: 0,
                  totalRevenue: 0,
                },
              ];
            } else if (month[i] == 6) {
              data = [
                {
                  year: year,
                  month: "Jun",
                  totalAmount: 0,
                  totalRevenue: 0,
                },
              ];
            } else if (month[i] == 7) {
              data = [
                {
                  year: year,
                  month: "Jul",
                  totalAmount: 0,
                  totalRevenue: 0,
                },
              ];
            } else if (month[i] == 8) {
              data = [
                {
                  year: year,
                  month: "Aug",
                  totalAmount: 0,
                  totalRevenue: 0,
                },
              ];
            } else if (month[i] == 9) {
              data = [
                {
                  year: year,
                  month: "Sep",
                  totalAmount: 0,
                  totalRevenue: 0,
                },
              ];
            } else if (month[i] == 10) {
              data = [
                {
                  year: year,
                  month: "Oct",
                  totalAmount: 0,
                  totalRevenue: 0,
                },
              ];
            } else if (month[i] == 11) {
              data = [
                {
                  year: year,
                  month: "Nov",
                  totalAmount: 0,
                  totalRevenue: 0,
                },
              ];
            } else if (month[i] == 12) {
              data = [
                {
                  year: year,
                  month: "Dec",
                  totalAmount: 0,
                  totalRevenue: 0,
                },
              ];
            }
            state.tuteeTransaction.splice(i, 0, data);
          } else {
            if (month[i] == 1) {
              state.tuteeTransaction[i] = [
                {
                  year: year,
                  month: "Jan",
                  totalAmount: state.tuteeTransaction[i].totalAmount,
                  totalRevenue: state.tuteeTransaction[i].totalRevenue,
                },
              ];
            } else if (month[i] == 2) {
              state.tuteeTransaction[i] = [
                {
                  year: year,
                  month: "Feb",
                  totalAmount: state.tuteeTransaction[i].totalAmount,
                  totalRevenue: state.tuteeTransaction[i].totalRevenue,
                },
              ];
            } else if (month[i] == 3) {
              state.tuteeTransaction[i] = [
                {
                  year: year,
                  month: "Mar",
                  totalAmount: state.tuteeTransaction[i].totalAmount,
                  totalRevenue: state.tuteeTransaction[i].totalRevenue,
                },
              ];
            } else if (month[i] == 4) {
              state.tuteeTransaction[i] = [
                {
                  year: year,
                  month: "Apr",
                  totalAmount: state.tuteeTransaction[i].totalAmount,
                  totalRevenue: state.tuteeTransaction[i].totalRevenue,
                },
              ];
            } else if (month[i] == 5) {
              state.tuteeTransaction[i] = [
                {
                  year: year,
                  month: "May",
                  totalAmount: state.tuteeTransaction[i].totalAmount,
                  totalRevenue: state.tuteeTransaction[i].totalRevenue,
                },
              ];
            } else if (month[i] == 6) {
              state.tuteeTransaction[i] = [
                {
                  year: year,
                  month: "Jun",
                  totalAmount: state.tuteeTransaction[i].totalAmount,
                  totalRevenue: state.tuteeTransaction[i].totalRevenue,
                },
              ];
            } else if (month[i] == 7) {
              state.tuteeTransaction[i] = [
                {
                  year: year,
                  month: "Jul",
                  totalAmount: state.tuteeTransaction[i].totalAmount,
                  totalRevenue: state.tuteeTransaction[i].totalRevenue,
                },
              ];
            } else if (month[i] == 8) {
              state.tuteeTransaction[i] = [
                {
                  year: year,
                  month: "Aug",
                  totalAmount: state.tuteeTransaction[i].totalAmount,
                  totalRevenue: state.tuteeTransaction[i].totalRevenue,
                },
              ];
            } else if (month[i] == 9) {
              state.tuteeTransaction[i] = [
                {
                  year: year,
                  month: "Sep",
                  totalAmount: state.tuteeTransaction[i].totalAmount,
                  totalRevenue: state.tuteeTransaction[i].totalRevenue,
                },
              ];
            } else if (month[i] == 10) {
              state.tuteeTransaction[i] = [
                {
                  year: year,
                  month: "Oct",
                  totalAmount: state.tuteeTransaction[i].totalAmount,
                  totalRevenue: state.tuteeTransaction[i].totalRevenue,
                },
              ];
            } else if (month[i] == 11) {
              state.tuteeTransaction[i] = [
                {
                  year: year,
                  month: "Nov",
                  totalAmount: state.tuteeTransaction[i].totalAmount,
                  totalRevenue: state.tuteeTransaction[i].totalRevenue,
                },
              ];
            } else if (month[i] == 12) {
              state.tuteeTransaction[i] = [
                {
                  year: year,
                  month: "Dec",
                  totalAmount: state.tuteeTransaction[i].totalAmount,
                  totalRevenue: state.tuteeTransaction[i].totalRevenue,
                },
              ];
            }
          }
        } else {
          if (month[i] == 1) {
            data = [
              {
                year: year,
                month: "Jan",
                totalAmount: 0,
                totalRevenue: 0,
              },
            ];
          } else if (month[i] == 2) {
            data = [
              {
                year: year,
                month: "Feb",
                totalAmount: 0,
                totalRevenue: 0,
              },
            ];
          } else if (month[i] == 3) {
            data = [
              {
                year: year,
                month: "Mar",
                totalAmount: 0,
                totalRevenue: 0,
              },
            ];
          } else if (month[i] == 4) {
            data = [
              {
                year: year,
                month: "Apr",
                totalAmount: 0,
                totalRevenue: 0,
              },
            ];
          } else if (month[i] == 5) {
            data = [
              {
                year: year,
                month: "May",
                totalAmount: 0,
                totalRevenue: 0,
              },
            ];
          } else if (month[i] == 6) {
            data = [
              {
                year: year,
                month: "Jun",
                totalAmount: 0,
                totalRevenue: 0,
              },
            ];
          } else if (month[i] == 7) {
            data = [
              {
                year: year,
                month: "Jul",
                totalAmount: 0,
                totalRevenue: 0,
              },
            ];
          } else if (month[i] == 8) {
            data = [
              {
                year: year,
                month: "Aug",
                totalAmount: 0,
                totalRevenue: 0,
              },
            ];
          } else if (month[i] == 9) {
            data = [
              {
                year: year,
                month: "Sep",
                totalAmount: 0,
                totalRevenue: 0,
              },
            ];
          } else if (month[i] == 10) {
            data = [
              {
                year: year,
                month: "Oct",
                totalAmount: 0,
                totalRevenue: 0,
              },
            ];
          } else if (month[i] == 11) {
            data = [
              {
                year: year,
                month: "Nov",
                totalAmount: 0,
                totalRevenue: 0,
              },
            ];
          } else if (month[i] == 12) {
            data = [
              {
                year: year,
                month: "Dec",
                totalAmount: 0,
                totalRevenue: 0,
              },
            ];
          }
          state.tuteeTransaction.splice(i, 0, data);
        }
      }
      return state.tuteeTransaction;
    },
  },
  mutations: {
    setTransaction(state, transactions) {
      state.transactions = transactions;
    },
    setTutorTransaction(state, transaction) {
      state.tutorTransaction = transaction;
    },
    setTuteeTransaction(state, transaction) {
      state.tuteeTransaction = transaction;
    },
  },
  actions: {
    async getTransactionByTutorId(context, tutorId) {
      try {
        const response = await http.get(`/tutor-transactions/tutor/${tutorId}`);
        if (response.status == 200 || response.status == 204) {
          context.commit("setTransaction", response.data);
        }
        return response;
      } catch (error) {
        console.log();
      }
    },
    async getTransactionByTuteeId(context, tuteeId) {
      try {
        const response = await http.get(`tutee-transactions/tutee/${tuteeId}`);
        if (response.status == 200 || response.status == 204) {
          context.commit("setTransaction", response.data);
        }
        return response;
      } catch (error) {
        console.log();
      }
    },
    async getTutorTransactionPerMonth(context, year) {
      const response = await http.get(
        `/tutor-transactions/get-total-amount-per-month`,
        {
          params: {
            year: year,
          },
        }
      );
      if (response.status == 200) {
        const data = response.data;
        context.commit("setTutorTransaction", data);
      }
    },
    async getTuteeTransactionPerMonth(context, year) {
      const response = await http.get(
        `/tutee-transactions/get-total-amount-per-month`,
        {
          params: {
            year: year,
          },
        }
      );
      if (response.status == 200) {
        const data = response.data;
        context.commit("setTuteeTransaction", data);
      }
    },
  },
};
export default managerManagement;
