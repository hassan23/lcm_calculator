import axios from "axios";
import { lcm } from "mathjs";
const complexity = {
  "Best time": "O(nlog(n))",
  "Best space": "O(n^2)",
  Optimal: "O(n)"
};

const LCM = (list, algo) => lcm(...list);

const saveLCM = async (lcm, algo, numbers) => {
  const time = Date.now();
  const response = await axios.post("/save", {
    time,
    username: localStorage.getItem("username"),
    email: localStorage.getItem("email"),
    algo: algo,
    complexity: complexity[algo],
    numbers,
    lcm
  });
  console.log(response);
};
export { LCM, saveLCM };
