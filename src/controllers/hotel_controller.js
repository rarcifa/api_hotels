const Hotel = require('./../db/model/hotel');


/**
 * POST /hotel/:id route to add a hotel.
 *
 * @param {*} req
 * @param {*} res
 */
const add = (req, res) => {
    const hotel = new Hotel(req.body);

    hotel.save()
        .then(hotel => res.json(hotel))
        .catch(err => res.status(400).json(err));
};


/**
 * GET /hotel route to retrieve all the hotels.
 *
 * @param {*} req
 * @param {*} res
 */
const getAll = (req, res) => {
    Hotel.find({})
        .then(hotels => res.json(hotels))
        .catch(err => res.status(400).json(err))
}


/**
 * GET /hotel/:id route to retrieve a hotel by its id.
 *
 * @param {*} req
 * @param {*} res
 */
const get = (req, res) => {
    Hotel.findById(req.params.id)
        .then(hotel => res.json(hotel))
        .catch(err => res.status(400).json(err))
}


/**
 * DELETE /hotel/:id route to delete a hotel by its id.
 *
 * @param {*} req
 * @param {*} res
 */
const remove = (req, res) => {
    Hotel.deleteOne({_id: req.params.id})
        .then(hotel => res.json(hotel))
        .catch(err => res.status(400).json(err))
};


/**
 * PATCH /hotel/:id route to update a hotel by its id.
 *
 * @param {*} req
 * @param {*} res
 */
const patch = (req, res) => {
    Hotel.updateOne({_id: req.params.id}, req.body, { runValidators: true })
        .then(hotel => res.json(hotel))
        .catch(err => res.status(400).json(err));
}


/**
 * POST /hotel/:id/book route to book a hotel by its id.
 *
 * @param {*} req
 * @param {*} res
 */
const book = (req, res) => {
    Hotel.findById(req.params.id)
        .then(hotel => {
            if (hotel.availability === 0) {
                res.status(400).json({
                    message: 'availability is 0'
                })
                return;
            }

            Hotel.updateOne({_id: hotel.id}, {availability: hotel.availability - 1}, { runValidators: true })
                .then(hotel => res.json(hotel))
                .catch(err => res.status(400).json(err))
            })
        .catch(err => res.status(400).json(err))
}


// export
module.exports = { add, getAll, get, remove, patch, book };
