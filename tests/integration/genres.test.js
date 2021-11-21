const request = require('supertest');
const {Genre} = require('../../models/genre');
const {User} = require("../../models/user");
let server;

describe('/api/genres', () => {
    beforeEach(() => {
        server = require('../../index');
    });

    afterEach(async () => {
        await Genre.remove({});
        server.close();
    });

    describe('GET /', () => {
        it('should return all genres', async () => {

            await Genre.insertMany([
                {name: 'genre1'},
                {name: 'genre2'}
            ]);

            const res = await request(server).get('/api/genres');

            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some(g => g.name === 'genre1')).toBeTruthy();
            expect(res.body.some(g => g.name === 'genre2')).toBeTruthy();

        });
    });

    describe('GET /:id', () => {
        it('should return a genre object if we pass a valid ID', async () => {
            const genre = new Genre({name: 'genre1'});
            await genre.save();

            const res = await request(server).get(`/api/genres/${genre._id}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name', genre.name);
        });

        it('should return 404 if we pass an invalid ID', async () => {
            const res = await request(server).get('/api/genres/1');
            expect(res.status).toBe(404);
        });
    });

    describe('POST /', () => {

        let token;
        let name;

        const exec = async () => {
            return await request(server)
                .post('/api/genres')
                .set('x-auth-token', token)
                .send({name}); // in ES6 if the name and the value has the same name we can write like this
        };

        beforeEach(() => {
            token = new User().generateToken();
            name = 'genre1';
        });

        it('should return 401 if client is not logged in', async () => {
            token = '';
            const res = await exec();
            expect(res.status).toBe(401);
        });

        it('should return 400 if genre is less than 5 chars', async () => {
            name = '123';

            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 400 if genre is greater than 255 chars', async () => {
            name = new Array(257).join('a');

            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should save the genre if it is valid', async () => {
            await exec();

            const genre = await Genre.find({name: 'genre1'});

            expect(genre).not.toBeNull();
        });

        it('should return the genre if it is valid', async () => {
            const res = await exec();

            expect(res.body).toHaveProperty('_id');

            expect(res.body).toHaveProperty('name', 'genre1');
        });
    });
});