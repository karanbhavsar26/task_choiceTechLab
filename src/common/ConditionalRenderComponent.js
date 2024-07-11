import { useSelector } from "react-redux";

export default function ConditionalRenderedComponent({ children }) {
  const step = useSelector((state) => state?.forms?.step);
  
  return step !== 5 && children;
}
