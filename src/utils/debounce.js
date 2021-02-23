export default function debounce(fn, wait) {
  let timer = null;

  return (value = null) => {
    if (timer) clearTimeout(timer);

    timer = setTimeout(fn, wait, value);
  }
}