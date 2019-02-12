export function separateByDay(list) {
  return list
    .reduce((acc, obj) => {
      var key = new Date(obj.dt_txt);
      key = key.getDate();
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, [])
    .filter(day => day !== null);
}

export function getDailyMaxAndMin(tempatures) {
  let max = tempatures[0].main.temp_max;
  let min = tempatures[0].main.temp_min;

  tempatures.forEach(value => {
    max = Math.max(max, value.main.temp_max);
    min = Math.min(min, value.main.temp_min);
  });
  return {
    max,
    min
  };
}
