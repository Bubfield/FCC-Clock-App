const handleTime = (timer) => {
  let regex = /[1-9]/g;
  let a = timer.slice(0, 1);
  let b = timer.slice(1, 2) - 1;
  let c = timer.slice(3, 4);
  let d = timer.slice(4, 5);
  let e = timer.slice(0, 3);

  if (timer.slice(3) === "00") {
    timer = a + b + ":59";
    return timer;
  } else if (regex.test(d)) {
    return timer.slice(0, 4) + (d - 1);
  } else if (d === "0" && c !== "0") {
    d = "9";
    return e + (c - 1) + d;
  }
};

export default handleTime;
