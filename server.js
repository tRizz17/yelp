
const express = require('express')
const app = express()
const PORT = 3000

app.use(express.json())

// BUSINESSES

// SCHEMA
// Business name
// Business street address
// Business city
// Business state
// Business ZIP code
// Business phone number
// Business category and subcategories (e.g. category "Restaurant" and subcategory "Pizza")
// The following information may also optionally be included when a new business is added:

// Business website
// Business email

var businesses = [

    {
        name: "Pizza World",
        address: "123 fun pl",
        city: "Portland",
        state: "OR",
        zip: "97212",
        phone: "123456789",
        category: "Pizza",
        website: "www.pizzameow.com",
        email: "pizzameow@pizzameow.com",
    }, 
    {
        name: "Burger Place",
        address: "234 burger st",
        city: "New York",
        state: "NY",
        zip: "523523",
        phone: "23352353",
        category: "Burgers",
        website: "www.ermegherdburgers.com",
        email: "",
    }, 

]


// Users get a list of all businesses. This should be paginated
// METHOD: GET
// Include all information 
// /businesses

app.get('/businesses', (req, res, next) =>  {
    res.status(200).send(businesses)
})

// Users fetch detailed info about a business
// METHOD: GET
// Use ID in query params
// Return all information + reviews + photos
// /businesses/:id

app.get('/businesses/:id', (req, res) => {
    var index = parseInt(req.params.id)
    if (index >= 0 && index < businesses.length) {
        res.status(200).send(businesses[index])
    } else {
        res.status(404).json({
            err: "Business not found"
        })
    }
})

// Owners add a business
// METHOD: POST
// Include all required fields + 2 optional fields
// /businesses
// AUTH? True

app.post("/businesses", (req, res) => {
    if (req.body && all_fields(req.body)) {
        // success?
    } else {
        // not success. 
    }
})

// Owners modify a business they own
// METHOD: PUT
// // /businesses/:id
// AUTH? True

app.put("/businesses/:id", (req, res) => {
    // validate id exists
    if (req.body && all_fields(req.body)) {
        // success
    } else {
        // not sucess
    }
})

// Owners delete a business they own
// METHOD: DELETE
// // /businesses/:id
// AUTH? True

app.delete("/businesses/:id", (req, res) => {
    // validate id exists
    // something here
})

// REVIEWS

// Users write review of business
// METHOD: POST
// star rating 0-5, dollar sign 1-4, optional written review
// reviews/:id

app.post("/reviews/:id", (req, res) => {
    // validate id exists
    // check if req.body 
    // validate rating 0-5
    // validate dollars 1-4
    // optional reveiw
})

// User modify any review they've written
// METHOD: PUT
// reviews/:id
app.put("/reviews/:id", (req, res) => {
    // validate id exists
    // check if req.body 
    // validate rating 0-5
    // validate dollars 1-4
    // optional reveiw

})

// User may delete any review they've written
// METHOD: DELETE
// reviews/:id
app.delete("/reviews/:id", (req, res) => {
    // validate id exists
})

// User may list all reviews they've listed
// METHOD: GET
// /reviews
// app.get("/reviews")

//PHOTOS

// Users upload image files containing photo of existing business
// Each photo must have an associated caption
// photos/:id

// Users may remove any photo they uploaded
// METHOD: DELETE
// photos/:id

// Users may modify any photo they uploaded
// METHOD: PUT
// photos/:id

// Users list all photos they uploaded
// METHOD: GET
// /photos


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

