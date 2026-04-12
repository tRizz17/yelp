
const express = require('express')
const app = express()
const PORT = 3000

app.use(express.json())

const businesses = [

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
    }
]

const reviews = [
    {
        id: 1,
        business_id: 0,
        user_id: 101,
        stars: 4,
        dollars: 2,
        body: "Holy cowabunga."
    },
    {
        id: 2,
        business_id: 1,
        user_id: 102,
        stars: 5,
        dollars: 3,
        body: "Maui Wowie."
    },
    {
        id: 3,
        business_id: 2,
        user_id: 103,
        stars: 1,
        dollars: 1,
        body: "Worst service of all time hate them."
    }
];

const photos = [
    {
        id: 1,
        business_id: 0,
        url: "https://www.example.com",
        caption: "Interior seating area"
    },
    {
        id: 2,
        business_id: 1,
        url: "https://www.example.com",
        caption: null
    },
    {
        id: 3,
        business_id: 2,
        url: "https://www.example.com",
        caption: "Front entrance on a busy afternoon"
    }
];


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

function valid_review(review) {
    flag = true
    if (!review.stars || review.stars < 0 || review.stars > 5) flag = false
    if (!review.dollars || review.dollars < 1 || review.dollars > 4) flag = false
    return flag
}

// Users get a list of all businesses. This should be paginated
app.get('/businesses', (req, res) => {
    res.status(200).send(businesses)
})

// Users fetch detailed info about a business
app.get('/businesses/:id', (req, res) => {
    var index = parseInt(req.params.id)
    if (valid_id(req.params.id)) {
        const business = businesses[index]
        const review = reviews.filter(r => r.business_id === index);
        const photo = photos.filter(p => p.business_id === index);
        res.status(200).json({
            ...business,
            reviews: review,
            photos: photo,
        })
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
app.post("/reviews/:id", (req, res) => {
    if (req.body && valid_id(req.params.id) && valid_review(req.body)) {
        res.status(201).send()
    } else {
        res.status(400).json({
            err: "Missing Required Fields"
        })
    }

})

// User modify any review they've written
app.put("/reviews/:id", (req, res) => {
    if (req.body && valid_id(req.params.id) && valid_review(req.body)) {
        res.status(201).send()
    } else {
        res.status(400).json({
            err: "Missing Required Fields"
        })
    }

})

// User may delete any review they've written
app.delete("/reviews/:id", (req, res) => {
    if (valid_id(req.params.id)) {
        res.status(204).send("Business deleted")
    } else {
        res.status(400).json({
            err: "Missing Required Fields"
        })
    }
})

// User may list all reviews they've listed
app.get("/reviews", (req, res) => {
    res.status(200).send(reviews)
})

//PHOTOS

// Users upload image files containing photo of existing business
app.post("/photos/:id", (req, res) => {
    if (req.body && valid_id(req.params.id) && req.body.url && req.body.caption) {
        res.status(201).send()
    } else {
        res.status(400).json({
            err: "Missing Required Fields"
        })
    }
})

// Users may remove any photo they uploaded
app.delete("/photos/:id", (req, res) => {
    if (valid_id(req.params.id)) {
        res.status(204).send("Photo deleted")
    } else {
        res.status(400).json({
            err: "Missing Required Fields"
        })
    }
})
// Users may modify any photo they uploaded
app.put("/photos/:id", (req, res) => {
    if (req.body && valid_id(req.params.id) && req.body.url && req.body.caption) {
        res.status(200).send()
    } else {
        res.status(400).json({
            err: "Missing Required Fields"
        })
    }
})

// Users list all photos they uploaded
app.get("/photos", (req, res) => {
    res.status(200).send(photos)
})


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

