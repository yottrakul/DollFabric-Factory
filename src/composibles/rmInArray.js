const removeItemArray = (arr, id) => {
  const index = arr.findIndex(e => e.id === id)
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr
}

export { removeItemArray }