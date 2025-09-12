import axios from "axios";
import { applyInterceptors } from "./api";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const defaultInstance = axios.create({
  baseURL: BASE_URL,
});
applyInterceptors(defaultInstance);

const authInstance = axios.create(defaultInstance.defaults);
authInstance.defaults.baseURL += "/auth";

const userInstance = axios.create(defaultInstance.defaults);
userInstance.defaults.baseURL += "/users";

const artistInstance = axios.create(defaultInstance.defaults);
artistInstance.defaults.baseURL += "/artists";

const spaceInstance = axios.create(defaultInstance.defaults);
spaceInstance.defaults.baseURL += "/spaces";

const postingInstance = axios.create(defaultInstance.defaults);
postingInstance.defaults.baseURL += "/postings";

const suggestingInstance = axios.create(defaultInstance.defaults);
suggestingInstance.defaults.baseURL += "/suggestings";

const likeInstance = axios.create(defaultInstance.defaults);
likeInstance.defaults.baseURL += "/likes";

const notificationInstance = axios.create(defaultInstance.defaults);
notificationInstance.defaults.baseURL += "/notifications";

const pointInstance = axios.create(defaultInstance.defaults);
pointInstance.defaults.baseURL += "/point";

const demandInstance = axios.create(defaultInstance.defaults);
demandInstance.defaults.baseURL += "/demand";

const adminInstance = axios.create(defaultInstance.defaults);
adminInstance.defaults.baseURL += "/admin";

export {
  defaultInstance,
  authInstance,
  userInstance,
  artistInstance,
  spaceInstance,
  pointInstance,
  postingInstance,
  suggestingInstance,
  likeInstance,
  notificationInstance,
  demandInstance,
  adminInstance,
};
