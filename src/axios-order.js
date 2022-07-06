import axios from "axios";

const instance = axios.create({
  baseURL: "https://my-react-burger-a2d1e.firebaseio.com/",
});

export default instance;
