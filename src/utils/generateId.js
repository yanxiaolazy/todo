export default function generateId() {
  let count = 0;

  return () => {
    return ++count;
  }
}