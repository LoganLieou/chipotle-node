/**
 * Adds an order to your bag, this is very much so still a WIP
 * 
 * @param {string} orderId 
 */
async function addToBag(orderId) { 
  var etag = "10034f5f-0000-0300-0000-673fd94a0000" // TODO how do we init this etag

  const myHeaders = new Headers();
  myHeaders.append("Ocp-Apim-Subscription-Key", "b4d9f36380184a3788857063bce25d6a");
  myHeaders.append("If-Match", etag);
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "meal": {
      "mealName": "Big Meal",
      "entrees": [
        {
          "menuItemId": "CMG-101",
          "menuItemName": "Chicken Bowl",
          "quantity": 1,
          "contents": [
            {
              "menuItemId": "CMG-5052",
              "menuItemName": "Pinto Beans",
              "quantity": 1,
              "isUpSell": false
            },
            {
              "menuItemId": "CMG-5252",
              "menuItemName": "Cheese",
              "quantity": 1,
              "isUpSell": false
            },
            {
              "menuItemId": "CMG-5201",
              "menuItemName": "Fresh Tomato Salsa",
              "quantity": 1,
              "isUpSell": false
            },
            {
              "menuItemId": "CMG-5101",
              "menuItemName": "Fajita Veggies",
              "quantity": 1,
              "isUpSell": false
            },
            {
              "menuItemId": "CMG-5202",
              "menuItemName": "Roasted Chili-Corn Salsa",
              "quantity": 1,
              "isUpSell": false
            },
            {
              "menuItemId": "CMG-5002",
              "menuItemName": "Brown Rice",
              "quantity": 1,
              "isUpSell": false
            }
          ]
        }
      ],
      "sides": [],
      "drinks": []
    }
  })

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  }

  fetch(`https://services.chipotle.com/order/v3/cart/online/${orderId}/meals`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      etag = result.headers.get('ETag')
      console.log("ETag: ", etag)
      console.log("Successfully placed order")
    })
    .catch((error) => console.error(error))
}