import axios from "axios";
const baseDomain = "http://dvanhsound.local";
const baseUrl = `${baseDomain}/api/youtube`;
export default axios.create({
    baseURL: baseUrl,
    headers: {"X-Requested-With" : 'XMLHttpRequest'}
})
