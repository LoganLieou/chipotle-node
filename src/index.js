const { fromZip } = require('./zip_handler.js')

const myHeaders = new Headers();

myHeaders.append("Ocp-Apim-Subscription-Key", "b4d9f36380184a3788857063bce25d6a");
myHeaders.append("Access-Control-Request-Headers", "authorization,chipotle-correlationid,content-type,ocp-apim-subscription-key,x-kpsdk-cd,x-kpsdk-ct,x-kpsdk-v");
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Bearer eyJhbGciOiJBMTI4S1ciLCJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwidHlwIjoiSldUIiwiY3R5IjoiSldUIn0.ESXEIm5YHNlDH9s-K4522hbbS8k1N6aSLsZKncoHFqBjmYB1zGlSAA.9R0DVOsmNthyZk2DCR1z7A.51Bje14b3zGBfideTz9PP-TGBnGVnEo_IBLsHraZlxBf2yWqoeSQxMb8qSuQMWQY0JENNVL8JbGYT_OIM5TGMvZDISd-uvrxEv_za_yQOayWR3mXxeSA3pQp_BKzVXxy-25YpDnTKIczQvwveQLzLmtLF9e9CDg4F5lsEY98qA6PEM-K38SEnzkGgFZNs6yVYZ-dJy9UV-oAIIDVFALEXA_oYs6ck45BTaw5WLku0SA5W5skgP4_2HnYTxJF3kREk1Afu_2R6Wj0EFh5KuGgoYxEGPi-Gyi0LiA8vUDVhhCJCsmWf2iDH-l8tYZv0a1D2juWS4XQrzySaTeW9yCaEEMMBFXSBImdoST8jZKovSsxpr93KLU0rorT1ulEij5nVVl5geGAPDCcBQYdtvOhs_ibNJ0Ha2kkK6t3hqqcR1g1dnMCWFkJwmMq59DA1juNIRcIeb1ltj3b_-yqW6vHHFeAHv3Q3tJFguWDK7W4pt-IRaQxxsM_TpFadkapVCRR.xnmCzZ5gXe_V7aF5m1gI3A");
myHeaders.append("Cookie", "f5avraaaaaaaaaaaaaaaa_session_=NFPLBNOEGLEPOBMMNLDKFLAEHKDOPEHPFDDIEKJOOKOKBBPJEOGFMKECLHGLKKDCJBJDLNIBCJNBEHPEJBCAKLACAOCAAGFKAGLFBFDPPBJACILGHMBDHGGCNNOIHCDO; TS01dd1185=01adcbe9d2141a11cf2d7bf524d1c440190ca70567476594c07b635dfe185aef15277d589825aa6b6488bfb73f275199c07098ab9062009e55ea9fd53c339874e038313e59; f5avraaaaaaaaaaaaaaaa_session_=EOHDKAFFBJPIMMAHJGENHOEANDKJHMGACDPAKLHDECJOMBLIPLEKJFMNNCGBDCGOEGADNNHOIHKENOHCHNJAJPHGMODNMIIIKKFFFMIKOCILDDIFBAILGEIDGPFKBMNL");

const res = fromZip('76020')

const raw = JSON.stringify({
  "latitude": res[0],
  "longitude": res[1],
  "radius": 80647,
  "restaurantStatuses": [
    "OPEN",
    "LAB"
  ],
  "conceptIds": [
    "CMG"
  ],
  "orderBy": "distance",
  "orderByDescending": false,
  "pageSize": 10,
  "pageIndex": 0,
  "embeds": {
    "addressTypes": [
      "MAIN"
    ],
    "realHours": true,
    "directions": true,
    "catering": true,
    "onlineOrdering": true,
    "timezone": true,
    "marketing": true,
    "chipotlane": true,
    "sustainability": true,
    "experience": true
  }
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://services.chipotle.com/restaurant/v3/restaurant", requestOptions)
  .then((response) => response.json())
  .then((result) => {
    for (const item of result.data) {
      console.log("NAME: ", item.restaurantName)
      console.log("ADDRESS: ", item.addresses)
    }
  })
  .catch((error) => console.error(error));