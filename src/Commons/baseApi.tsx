import axios from "axios";

export const baseApi = axios.create({
    baseURL: "https://code-challenge.spectrumtoolbox.com/api"
});