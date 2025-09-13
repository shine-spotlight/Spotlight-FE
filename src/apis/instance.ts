import axios from "axios";
import { applyInterceptors } from "./api";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const defaultInstance = axios.create({
  baseURL: BASE_URL,
});

const authInstance = axios.create(defaultInstance.defaults);
authInstance.defaults.baseURL += "/auth";
applyInterceptors(authInstance);

const userInstance = axios.create(defaultInstance.defaults);
userInstance.defaults.baseURL += "/users";
applyInterceptors(userInstance);

const artistInstance = axios.create(defaultInstance.defaults);
artistInstance.defaults.baseURL += "/artists";
applyInterceptors(artistInstance);

const spaceInstance = axios.create(defaultInstance.defaults);
spaceInstance.defaults.baseURL += "/spaces";
applyInterceptors(spaceInstance);

const postingInstance = axios.create(defaultInstance.defaults);
postingInstance.defaults.baseURL += "/postings";
applyInterceptors(postingInstance);

const suggestingInstance = axios.create(defaultInstance.defaults);
suggestingInstance.defaults.baseURL += "/suggestings";
applyInterceptors(suggestingInstance);

const likeInstance = axios.create(defaultInstance.defaults);
likeInstance.defaults.baseURL += "/likes";
applyInterceptors(likeInstance);

const notificationInstance = axios.create(defaultInstance.defaults);
notificationInstance.defaults.baseURL += "/notifications";
applyInterceptors(notificationInstance);

const pointInstance = axios.create(defaultInstance.defaults);
pointInstance.defaults.baseURL += "/point";
applyInterceptors(pointInstance);

const demandInstance = axios.create(defaultInstance.defaults);
demandInstance.defaults.baseURL += "/demand";
applyInterceptors(demandInstance);

const adminInstance = axios.create(defaultInstance.defaults);
adminInstance.defaults.baseURL += "/admin";
applyInterceptors(adminInstance);

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
