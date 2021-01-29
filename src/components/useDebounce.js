import { useState } from 'react';
import { useDebounce } from "ahooks";

export default function useDebounceContainer(wait = 1000) {
  const [debounceValue, setDebounceValue] = useState(null);
  const debounce = useDebounce(debounceValue, {wait});

  return [debounce, setDebounceValue];
}