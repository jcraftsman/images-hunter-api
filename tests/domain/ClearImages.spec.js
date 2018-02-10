const sinon = require('sinon');
const ClearImages = require('../../domain/ClearImages');

describe('ClearImages', () => {
    let imagesRepository = {};
    let clearImages;
    beforeEach(() => {
        imagesRepository = {
            findByIdAndRemove: sinon.stub(),
            deleteAll: sinon.stub()
        }
        clearImages = new ClearImages(imagesRepository);
    })

    describe('byId', () => {
        it('deletes the image given by its id (using the repo)', () => {
            // Given
            const theId = '123';
            const theImage = {
                _id: theId,
                url: "https://my.ima.ge",
                description: "This is a wonderful image containing my keyword"
            };
            imagesRepository.findByIdAndRemove
                .withArgs(theId)
                .returns(theImage);

            // When
            const clearedImage = clearImages.byId(theId);

            // Then
            expect(clearedImage).toEqual(theImage);
        });
    });

    describe('all', () => {

        it('deletes all the images (using the repo)', () => {
            // When
            const foundImage = clearImages.all();

            // Then
            expect(imagesRepository.deleteAll.callCount).toEqual(1);
        });

    })
});