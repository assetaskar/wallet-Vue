export function deleteCategory({ commit, state }, { name, type }) {
  let index = state[type].categories.findIndex(
    (category) => category.name === name
  );
  if (~index) {
    commit(`${type}/DELETE_CATEGORY`, { name, index });
    return;
  }

  throw new Error("Категория не найдено");
}
