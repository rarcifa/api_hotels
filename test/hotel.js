const mongoose = require('mongoose');
const Hotel = require('../src/db/model/hotel');
const HOTEL = require('./hotel-valid')

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/app');

const should = chai.should();

chai.use(chaiHttp);


describe('Hotels', () => {
    beforeEach((done) => {
        Hotel.deleteMany({}, (err) => {
           done();
        });
    });


    /**
     * Test GET /hotel route
     */
    describe('GET /hotel', () => {
        it('it should get all the hotels', (done) => {
            chai.request(server)
                .get('/hotel')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });


    /**
     * Test POST /hotel route
     */
    describe('POST /hotel', () => {
        it('it should save a hotel', (done) => {
            chai.request(server)
                .post('/hotel')
                .send(HOTEL)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name').eql(HOTEL.name);
                    res.body.should.have.property('availability').eql(HOTEL.availability);
                    done();
                });
        });
    });


    /**
     * Test POST /hotel route
     */
    describe('POST /hotel', () => {
        it('it should not save a hotel with keyword \'Free\' in name', (done) => {
            const hotel = {...HOTEL};
            hotel.name = 'Examaple Free hotel';

            chai.request(server)
                .post('/hotel')
                .send(hotel)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });


    /**
     * Test GET /hotel/:id route
     */
    describe('GET /hotel/:id', () => {
        it('it should get a hotel by given id', (done) => {
            const hotel = new Hotel(HOTEL)
            hotel.reputation = 500;

            hotel.save()
                .then(hotel => {
                    chai.request(server)
                        .get(`/hotel/${hotel._id}`)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.should.have.property('_id').eql(hotel.id);
                            res.body.should.have.property('reputation').eql(500);
                            done();
                        })
                })
        });
    });


    /**
     * Test GET /hotel/:id route
     */
    describe('GET /hotel/:id', () => {
        it('it should get a hotel by given id', (done) => {
            const hotel = new Hotel(HOTEL)
            hotel.reputation = 799;

            hotel.save()
                .then(hotel => {
                    chai.request(server)
                        .get(`/hotel/${hotel._id}`)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.should.have.property('_id').eql(hotel.id);
                            res.body.should.have.property('reputation').eql(799);
                            done();
                        })
                })
        });
    });


    /**
     * Test GET /hotel/:id route
     */
    describe('GET /hotel/:id', () => {
        it('it should not get a hotel by incorrect given id', (done) => {
            chai.request(server)
                .get('/hotel/invalid_id')
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                })
        });
    });


    /**
     * Test DELETE /hotel/:id route
     */
    describe('DELETE /hotel/:id', () => {
        it('it should delete a hotel by given id', (done) => {
            const hotel = new Hotel(HOTEL)

            hotel.save()
                .then(hotel => {
                    chai.request(server)
                        .delete(`/hotel/${hotel._id}`)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.should.have.property('ok').eql(1);
                            done();
                        })
                })
        });
    });


    /**
     * Test PATCH /hotel/:id route
     */
    describe('PATCH /hotel/:id', () => {
        it('it should update a hotel by given id', (done) => {
            const hotel = new Hotel(HOTEL);

            hotel.save()
                .then(hotel => {
                    chai.request(server)
                        .patch(`/hotel/${hotel._id}`)
                        .send({name: 'Example name 22'})
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.should.have.property('ok').eql(1);
                            done();
                        })
                })
        });
    });


    /**
     * Test PATCH /hotel/:id route
     */
    describe('PATCH /hotel/:id', () => {
        it('it should not update a hotel by given incorrect name', (done) => {
            const hotel = new Hotel(HOTEL);

            hotel.save()
                .then(hotel => {
                    chai.request(server)
                        .patch(`/hotel/${hotel._id}`)
                        .send({name: 'Example website'})
                        .end((err, res) => {
                            res.should.have.status(400);
                            res.body.should.be.a('object');
                            done();
                        })
                })
        });
    });


    /**
     * Test POST /hotel/:id/book route
     */
    describe('POST /hotel/:id/book', () => {
        it('it should book a hotel by given id', (done) => {
            const hotel = new Hotel(HOTEL);

            hotel.save()
                .then(hotel => {
                    chai.request(server)
                        .post(`/hotel/${hotel._id}/book`)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.should.have.property('ok').eql(1);
                            done();
                        })
                })
        });
    });


    /**
     * Test POST /hotel/:id/book route
     */
    describe('POST /hotel/:id/book', () => {
        it('it should not book a hotel when availability is 0', (done) => {
            const hotel = new Hotel(HOTEL);
            hotel.availability = 0;

            hotel.save()
                .then(hotel => {
                    chai.request(server)
                        .post(`/hotel/${hotel._id}/book`)
                        .end((err, res) => {
                            res.should.have.status(400);
                            res.body.should.be.a('object');
                            res.body.should.have.property('message').eql('availability is 0');
                            done();
                        })
                })
        });
    });

    /**
     * Test POST /hotel/:id/book route
     */
    describe('POST /hotel/:id/book', () => {
        it('it should not book a hotel when hotel id is invalid', (done) => {
            chai.request(server)
                .post(`/hotel/invalid_id/book`)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                })
        });
    });
})
