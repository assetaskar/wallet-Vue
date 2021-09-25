import getUserId from "@/utils/getUserId";

export function SET_FILTER(state, value) {
  state.filter = value;
}

export function SET_TABS(state, value) {
  state.tabs = value;
}

export function ADD_DATA(state, data) {
  state[state.tabs].data.push(data);
  const newData = state[state.tabs].data.sort((a, b) => a.date > b.date);
  localStorage.setItem(`${state.tabs}-${getUserId()}`, JSON.stringify(newData));
}

export function EDIT_DATA(state, value) {
  const data = state[state.tabs].data.map(function(item) {
    if (item.id === this.id) {
      return this;
    }
    return item;
  }, value);

  localStorage.setItem(`${state.tabs}-${getUserId()}`, JSON.stringify(data));
  state[state.tabs].data = data;
}

export function DELETE_DATA(state, id) {
  const index = state[state.tabs].data.findIndex((item) => item.id === id);
  state[state.tabs].data.splice(index, 1);

  localStorage.setItem(
    `${state.tabs}-${getUserId()}`,
    JSON.stringify(state[state.tabs].data)
  );
}

export function EDIT_CATEGORY(state, data) {
  const prev = data.prev;
  let index = state[data.categoryType].categories.findIndex(
    (category) => category.name === prev
  );
  if (~index) {
    state[data.categoryType].categories.splice(index, 1, data.next);
    state[data.categoryType].data.forEach((item) => {
      if (item.category === prev) {
        item.category = data.next.name;
      }
    });
    localStorage.setItem(
      `${data.categoryType}-${getUserId()}`,
      JSON.stringify(state[data.categoryType].data)
    );
    localStorage.setItem(
      `${data.categoryType}-categories-${getUserId()}`,
      JSON.stringify(state[data.categoryType].categories)
    );
    return;
  }

  throw new Error("Категория не найдено");
}
