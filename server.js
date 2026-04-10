
const express = require('express')
const app = express()
const PORT = process.env.PORT || 8000

app.use(express.json())

// BUSINESSES

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

// Helper Functions

// Check if id exists in 'database'
function valid_id(id) {
    var index = parseInt(id)
    if (index >= 0 && index < businesses.length) {
        return true
    } else {
        return false
    }
}

// Crappy validation function
function has_all_fields(business) {
    if (business.name && business.address &&
        business.city && business.state &&
        business.zip && business.phone &&
        business.category) {
        return true
    } else {
        return false
    }
}

// Users get a list of all businesses. This should be paginated
app.get('/businesses', (req, res) => {
    res.status(200).send(businesses)
})

// Users fetch detailed info about a business
// Return all information + reviews + photos
app.get('/businesses/:id', (req, res) => {
    var index = parseInt(req.params.id)
    if (valid_id(req.params.id)) {
        res.status(200).send(businesses[index]) // STILL NEED TO INCLUDE PHOTOS & REVIEWS so cant use array index as id. probably.
    } else {
        res.status(400).json({
            err: "Terrible Request"
        })
    }
})

// Owners add a business
// AUTH? True
app.post("/businesses", (req, res) => {
    if (req.body && has_all_fields(req.body)) {
        res.status(201).send()
    } else {
        res.status(400).json({
            err: "Missing Required Fields"
        })
    }
})

// Owners modify a business they own
// AUTH? True
app.put("/businesses/:id", (req, res) => {
    if (req.body && valid_id(req.params.id) && has_all_fields(req.body)) {
        res.status(200).send()
    } else {
        res.status(400).json({
            err: "Missing Required Fields"
        })
    }
})

// Owners delete a business they own
// AUTH? True
app.delete("/businesses/:id", (req, res) => {
    if (valid_id(req.params.id)) {
        res.status(204).send("Business deleted")
    } else {
        res.status(400).json({
            err: "Missing Required Fields"
        })
    }
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

