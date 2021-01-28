export default function generateId(init) {
  let count = init ?? 0;

  return () => {
    return ++count;
  }
}