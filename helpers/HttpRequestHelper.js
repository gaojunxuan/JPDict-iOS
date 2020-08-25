import md5 from 'react-native-md5';
import axios from 'axios';

const appid = "20160211000011632";
const key = "NvduVsfjpNEclI03Sbei";

const JPDICT_API_KEY = "apikey";

export class HttpRequestHelper {
    static jpToCn(text, callback) {
        var random = (Math.abs(Math.random() * 10000000000)) | 0;
        var sign = md5.hex_md5(appid + text + random + key);
        var uri = `https://fanyi-api.baidu.com/api/trans/vip/translate?q=${escape(text)}&from=jp&to=zh&appid=${appid}&salt=${random}&sign=${sign}`;
        var request =  axios.get(uri)
                            .then((response) => { callback(response.data) } )
                            .catch((error) => console.error(error)); 
    }
    static cnToJp(text, callback) {
        var random = (Math.abs(Math.random() * 10000000000)) | 0;
        var sign = md5.hex_md5(appid + text + random + key);
        var uri = `https://fanyi-api.baidu.com/api/trans/vip/translate?q=${escape(text)}&from=zh&to=jp&appid=${appid}&salt=${random}&sign=${sign}`;
        var request =  axios.get(uri)
                            .then((response) => { callback(response.data) } )
                            .catch((error) => console.error(error)); 
    }
    static translate(text, src, dst, callback, errorCallback=(e) => console.log(e)) {
        var random = (Math.abs(Math.random() * 10000000000)) | 0;
        var sign = md5.hex_md5(appid + text + random + key);
        var uri = `https://fanyi-api.baidu.com/api/trans/vip/translate?q=${escape(text)}&from=${src}&to=${dst}&appid=${appid}&salt=${random}&sign=${sign}`;
        var request =  axios.get(uri)
                            .then((response) => { callback(response.data) } )
                            .catch((error) => errorCallback(error)); 
    }
    static async getEasyNews() {
      try {
        let request =  await axios.get(`https://jpdictapi.terra-incognita.dev/api/GetNHKEasyNews?code=${JPDICT_API_KEY}`);
        return request.data;
      }
      catch(e) {
        console.log(e);
      }
    }
    static async getDailySentences() {
      try {
        let request =  await axios.get(`https://jpdictapi.terra-incognita.dev/api/GetDailySentence?code=${JPDICT_API_KEY}`);
        return request.data;
      }
      catch {
        return [{ sentence: "网络异常" }, { sentence: "网络异常" }, { sentence: "网络异常" }]
      }
      
    }
    static async getNHKRadioNews() {
      try {
        let request = await axios.get(`https://jpdictapi.terra-incognita.dev/api/GetNHKRadio?code=${JPDICT_API_KEY}&speed=normal`);
        return request.data;
      }
      catch(e) {
        console.log(e);
      }
    }
}