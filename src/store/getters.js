import Vue from "vue";
import getStartDayWeek from "@/utils/getStartDayWeek";

class dataCollection {
  labels = [];
  backgroundColor = [];
  borderColor = [];
  data = [];

  constructor(dataAll) {
    this.dataAll = dataAll;
  }

  get currentData() {
    return {
      labels: this.labels,
      datasets: [
        {
          data: this.data,
          backgroundColor: this.backgroundColor,
          borderColor: this.borderColor,
          borderWidth: 2,
        },
      ],
    };
  }
}

class dataCollectionBar extends dataCollection {
  constructor(dataAll, type) {
    super(dataAll);
    this.backgroundColor =
      type === "incomes" ? "rgba(66, 165, 245, 0.1)" : "rgba(255, 82, 82, 0.1)";
    this.borderColor = type === "incomes" ? "#42a5f5" : "#ff5252";
  }

  get week() {
    this.labels = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];
    this.data = Array(7).fill(0);

    this.dataAll.forEach((item) => {
      const index = ~(new Date(item.date).getDay() - 1)
        ? new Date(item.date).getDay() - 1
        : 6;
      this.data[index] += item.amount;
    });

    return this.currentData;
  }

  get month() {
    this.labels = Array(new Date().getMonthDays()).fill("0");
    this.data = Array(new Date().getMonthDays()).fill(0);

    this.labels = this.labels.map((label, idx) =>
      idx < 9 ? label + (idx + 1) : `${idx + 1}`
    );

    this.dataAll.forEach((item) => {
      const index = new Date(item.date).getDate() - 1;
      this.data[index] += item.amount;
    });

    return this.currentData;
  }

  get year() {
    this.labels = Vue.material.locale.shortMonths;
    this.data = Array(12).fill(0);

    this.dataAll.forEach((item) => {
      const index = new Date(item.date).getMonth();
      this.data[index] += item.amount;
    });

    return this.currentData;
  }
}

class dataCollectionDoughnut extends dataCollection {
  constructor(dataAll, categories) {
    super(dataAll);
    this.borderColor = "#424242";
    this.categories = categories;
  }

  get dataDoughnut() {
    this.dataAll.forEach((item) => {
      const index = this.labels.indexOf(item.category);

      if (~index) {
        this.data[index] += item.amount;
      } else {
        this.labels.push(item.category);
        this.data.push(item.amount);
        const { color } = this.categories.find(
          (category) => category.name === item.category
        );
        this.backgroundColor.push(color);
      }
    });

    return this.currentData;
  }
}

export function getData(state) {
  const data = state[state.tabs].data;

  switch (state.filter) {
    case "week":
      const startDayWeek = getStartDayWeek();
      return data.filter(
        (item) =>
          startDayWeek <= Date.parse(item.date) &&
          Date.parse(item.date) <= Date.now()
      );

    case "month":
      return data.filter(
        (item) => new Date().getMonth() === new Date(item.date).getMonth()
      );

    case "year":
      return data.filter(
        (item) => new Date().getFullYear() === new Date(item.date).getFullYear()
      );
  }
}

export function dataCollectionForBar(state, getters) {
  if (getters.getData.length) {
    const data = new dataCollectionBar(getters.getData, state.tabs);
    return data[state.filter];
  }

  return {};
}

export function dataCollectionForDoughnut(state, getters) {
  if (getters.getData.length) {
    const data = new dataCollectionDoughnut(
      getters.getData,
      state[state.tabs].categories
    );
    return data.dataDoughnut;
  }

  return {};
}

export function total(state, getters) {
  const startAmount = getters["users/getActiveUserData"]?.startAmount;
  const incomes = getters["incomes/totalIncomes"];
  const expenses = getters["expenses/totalExpenses"];

  return startAmount + incomes - expenses || 0;
}

export function getCategories(state) {
  return state[state.tabs].categories.map((category) => {
    return {
      value: category.name,
      text: category.name,
    };
  });
}
