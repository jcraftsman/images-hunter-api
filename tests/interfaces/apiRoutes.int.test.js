const request = require('supertest');
const sinon = require('sinon');
const App = require('../../infra/App');
const ImagesApiRouter = require('../../interfaces/ImagesApiRouter');
const HuntApiRouter = require('../../interfaces/HuntApiRouter');


describe('API routing', () => {
    let app;
    const clearImagesStub = {};
    const findImagesStub = {};
    const imagesIndexStub = {};

    beforeAll(() => {
        const imagesApiRouter = new ImagesApiRouter(findImagesStub, imagesIndexStub, clearImagesStub)
        const huntApiRouter = new HuntApiRouter(findImagesStub)
        app = new App(imagesApiRouter, huntApiRouter).start();
    })

    const anImage = {
        url: "https://my.ima.ge",
        description: "This is a wonderful image"
    };
    const allImages = [anImage];

    beforeEach(() => {
        imagesIndexStub.process = sinon.stub();
        findImagesStub.all = sinon.stub();
        findImagesStub.byId = sinon.stub();
        findImagesStub.byText = sinon.stub();
        clearImagesStub.all = sinon.stub();
        clearImagesStub.byId = sinon.stub();

    });

    describe('/images path', () => {
        describe('POST', () => {
            let postNewImage;
            const newImage = {
                "url": 'https://a.new.ima.ge',
                "description": 'This is a brand new one'
            }
            const createdImage = { ...newImage,
                _id: "5a6c6f8e1c5c5c5fa020a6c5"
            }
            describe('nominal scenario', () => {
                beforeEach(() => {
                    // Given
                    imagesIndexStub.process
                        .withArgs(sinon.match(newImage))
                        .returns(
                            Promise.resolve(createdImage)
                        );
                    // When
                    postNewImage = request(app)
                        .post("/images/")
                        .send(newImage);
                });

                it('should respond successfully', () => {
                    return postNewImage.expect(200);
                });
                it('should return the created image', () => {
                    return postNewImage.expect(createdImage);
                });
            });
            describe('when something goes wrong', () => {
                beforeEach(() => {
                    // Given
                    imagesIndexStub.process.rejects(new Error('fail'));
                    // When
                    postNewImage = request(app)
                        .post("/images/")
                        .send(newImage);
                });

                it('should respond with HTTP 500 server error code', () => {
                    return postNewImage.expect(500);
                });
            });
        });

        describe('GET', () => {
            let getImages;
            describe('nominal scenario', () => {
                beforeEach(() => {
                    // Given
                    findImagesStub.all.returns(Promise.resolve(allImages));
                    // When
                    getImages = request(app).get("/images/");
                });

                // Then
                it('should respond successfully', () => {
                    return getImages.expect(200);
                });
                it('should return all images', () => {
                    return getImages
                        .then(response => {
                            expect(response.body).toEqual(allImages);
                        });
                });
            });
            describe('when something goes wrong', () => {
                beforeEach(() => {
                    // Given
                    findImagesStub.all.rejects(new Error('fail'));
                    // When
                    getImages = request(app).get("/images/");
                });

                it('should respond with HTTP 500 server error code', () => {
                    return getImages.expect(500);
                });
            });

            describe('GET by id', () => {
                let getImageById;
                describe('when the the image exists', () => {
                    beforeEach(() => {
                        // Given
                        findImagesStub.byId
                            .withArgs('aUniqueImageId')
                            .returns(Promise.resolve(anImage));
                        // When
                        getImageById = request(app).get("/images/aUniqueImageId");
                    });

                    it('should respond successfully', () => {
                        return getImageById.expect(200);
                    });
                    it('should return only the image that matches the given id', () => {
                        return getImageById
                            .then(response => {
                                expect(response.body).toEqual(anImage);
                            });
                    });
                });

                describe('when the the image is missing', () => {
                    beforeEach(() => {
                        // Given
                        findImagesStub.byId
                            .withArgs('aUniqueImageId')
                            .returns(Promise.resolve(null));
                        // When
                        getImageById = request(app).get("/images/aUniqueImageId");
                    });

                    it('should respond with not found HTTP CODE (404), when no image is found by the given id', () => {
                        return getImageById.expect(404);
                    });
                });
                describe('when something goes wrong', () => {
                    beforeEach(() => {
                        // Given
                        findImagesStub.byId
                            .withArgs('aUniqueImageId')
                            .rejects(new Error('fail'));
                        // When
                        getImageById = request(app).get("/images/aUniqueImageId");
                    });

                    it('should respond with HTTP 500 server error code', () => {
                        return getImageById.expect(500);
                    });
                });
            });

            describe('DELETE', () => {
                describe('DELETE by id', () => {
                    let deleteImage;
                    describe('when the image to delete exists', () => {
                        const existingImage = {
                            _id: '8a6c6f8e1c5c5c5fa020a6cef',
                            "url": 'https://an.existing.ima.ge',
                            "description": 'This is an old good one'
                        }
                        beforeEach(() => {
                            // Given
                            clearImagesStub.byId
                                .withArgs(existingImage._id)
                                .returns(
                                    Promise.resolve(existingImage)
                                );
                            // When
                            deleteImage = request(app).delete("/images/" + existingImage._id);
                        });

                        it('should respond successfully with No Content HTTP code (204) ', () => {
                            return deleteImage.expect(204);
                        });
                        it('should return an empty body', () => {
                            return deleteImage.then(response => {
                                expect(response.text).toBe('');
                            });
                        });
                    });

                    describe('when the the image is missing', () => {
                        beforeEach(() => {
                            // Given
                            clearImagesStub.byId
                                .withArgs('aUniqueImageId')
                                .returns(Promise.resolve(null));
                            // When
                            deleteImage = request(app).delete("/images/aUniqueImageId");
                        });

                        it('should respond with not found HTTP CODE (404), when no image is found by the given id', () => {
                            return deleteImage.expect(404);
                        });
                    });
                    describe('when something goes wrong', () => {
                        beforeEach(() => {
                            // Given
                            clearImagesStub.byId.rejects(new Error('fail'));
                            // When
                            deleteImage = request(app).delete("/images/aUniqueImageId");
                        });

                        it('should respond with HTTP 500 server error code', () => {
                            return deleteImage.expect(500);
                        });
                    });
                });

                describe('delete all', () => {
                    let deleteAllImages;
                    describe('nominalScenario', () => {
                        beforeEach(() => {
                            // Given
                            clearImagesStub.all
                                .returns(Promise.resolve(null));
                            // When
                            deleteAllImages = request(app).delete("/images/");
                        });

                        it('should respond successfully with No Content HTTP code (204) ', () => {
                            return deleteAllImages.expect(204);
                        });
                        it('should return an empty body', () => {
                            return deleteAllImages.then(response => {
                                expect(response.text).toBe('');
                            });
                        });
                    });
                    describe('when something goes wrong', () => {
                        beforeEach(() => {
                            // Given
                            clearImagesStub.all.rejects(new Error('fail'));
                            // When
                            deleteAllImages = request(app).delete("/images/");
                        });

                        it('should respond with HTTP 500 server error code', () => {
                            return deleteAllImages.expect(500);
                        });
                    });
                });
            });

            describe('/hunt path', () => {
                describe('GET', () => {
                    let huntImages;
                    describe('when images are found', () => {

                        beforeEach(() => {
                            // Given
                            findImagesStub.byText
                                .withArgs('myKeyword')
                                .returns(Promise.resolve(allImages));
                            // When
                            huntImages = request(app).get("/hunt/myKeyword");
                        });

                        it('should respond successfully to the GET method', () => {
                            return huntImages.expect(200);
                        });
                        it('should return the found images', () => {
                            return huntImages.expect(allImages);
                        });
                    });
                    describe('when not matching image is found', () => {
                        beforeEach(() => {
                            // Given
                            findImagesStub.byText
                                .withArgs('myKeyword')
                                .returns(Promise.resolve(null));
                            // When
                            huntImages = request(app).get("/hunt/myKeyword");
                        });

                        it('should respond with not found HTTP CODE (404), when no image is found by the given id', () => {
                            return huntImages.expect(404);
                        });
                    });
                    describe('when something goes wrong', () => {
                        beforeEach(() => {
                            // Given
                            findImagesStub.byText.rejects(new Error('fail'));
                            // When
                            huntImages = request(app).get("/hunt/myKeyword");
                        });

                        it('should respond with HTTP 500 server error code', () => {
                            return huntImages.expect(500);
                        });
                    });
                });
            });
        });
    });
});