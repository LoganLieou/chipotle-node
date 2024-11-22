const { fromZip } = require('usa-zipcoder')

function Chipotle(_options) {
    // TODO eventually will use options to init the user login
    this.apiKey = "b4d9f36380184a3788857063bce25d6a"
    this.baseUrl = "https://services.chipotle.com"

    this.headers = new Headers()
    this.headers.append("Ocp-Apim-Subscription-Key", this.apiKey)
}

/**
 * Get the locations in your zip code's area.
 * 
 * @param {number} zip 
 * @returns list of id's and names of locations
 */
Chipotle.prototype.getLocations = async function(zip) {
    this.headers.append("Content-Type", "application/json")

    const coords = fromZip(zip)

    const body = JSON.stringify({
        "latitude": coords[0],
        "longitude": coords[1],
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
        headers: this.headers,
        body: body,
        redirect: "follow"
    };

    const response = await fetch(`${this.baseUrl}/restaurant/v3/restaurant`, requestOptions)
    const result = await response.json()
    var ids = []
    for (const restaurant of result.data)
        ids.push([restaurant.restaurantNumber, restaurant.restaurantName])
    return ids
} 

/**
 * Return's the price of a chicken bowl for a given location, the idea here is
 * the chicken bowl is the cheapest entree on the menu and everything will be
 * price relatively to it
 * 
 * @param {number} id 
 * @returns unit price of a chicken bowl
 */
Chipotle.prototype.getLocationPrice = async function(id) {
    const requestOptions = {
        method: "GET",
        headers: this.headers,
        redirect: "follow"
    }

    const result = await fetch(`${this.baseUrl}/menuinnovation/v1/restaurants/${id}/onlinemenu`, requestOptions)
        .then((response) => response.json())
        .catch((error) => console.error(error))

    const chicken_bowl = result.entrees.find(item => item.itemName === "Chicken Bowl")
    return chicken_bowl["unitPrice"]
}

/**
 * Prints out the cheapest chipotle in your area.
 * 
 * @param {number} zip 
 */
Chipotle.prototype.findCheapest = async function(zip) {
    const ids = await this.getLocations(zip)
    var mn = 300.0
    var name = ""
    for (const id of ids) {
        const price = await this.getLocationPrice(id[0])
        if (price < mn) {
            name = id[1]
            mn = price
        }
    }

    const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(mn);

    console.log(`The Cheapest Bowl is at ${name} for ${formatted}`)
}

/**
 * Retrieve the contents of your bag.
 * 
 * @param {string} orderId 
 */
Chipotle.prototype.getBag = async function(orderId) {
    const requestOptions = {
        method: "GET",
        headers: this.headers,
        redirect: "follow"
    }

    // I should be doing this for the other functions as well but dw abt it
    fetch(`${this.baseUrl}/order/v3/cart/online/${orderId}?finalizePricing=true`, requestOptions)
        .then(response => response.json())
        .catch(e => console.error(e))
}

module.exports = { Chipotle }