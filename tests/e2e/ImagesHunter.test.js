const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../infra/AppAssembly');

describe('ImagesHunter', () => {
    beforeAll(() => {
        mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
    })
    afterAll((done) => {
        mongoose.disconnect(done);
    });

    const anImage = {
        url: "https://my.ima.ge",
        description: "This is a wonderful image"
    };
    const theMatchingImage = {
        url: "https://my.ima.ge",
        description: "This is the image to hunt. It should be returned because it contains the description contains the word you are looking for. "
    };
    beforeEach(() => {
        return Promise.all([
            createImage(anImage),
            createImage(theMatchingImage)
        ]);
    });
    afterEach(() => {
        return deleteImage();
    });

    describe('GET all images ', () => {
        it('responds successfully with all created images', () => {
            return request(app).get("/images/")
                .expect(200)
                .then((response) => {
                    expect(response.body.sort()).toEqual([
                        expect.objectContaining(anImage),
                        expect.objectContaining(theMatchingImage)
                    ].sort());
                });
        });
    });
    describe('GET images by matching text ', () => {
        it('responds successfully with only the images with a description that contains the given text', () => {
            return request(app).get("/hunt/word")
                .expect(200)
                .then((response) => {
                    expect(response.body).toEqual([
                        expect.objectContaining(theMatchingImage)
                    ]);
                });
        });
    });
});

const createImage = (image) => {
    return request(app).post("/images/")
        .send(image)
        .expect(201);
};

const deleteImage = (image) => {
    return request(app).delete("/images/")
        .expect(204);
}