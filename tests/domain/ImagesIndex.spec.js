const sinon = require('sinon');
const ImagesIndex = require('../../domain/ImagesIndex');


describe('ImagesIndex', () => {
    const imagesRepository = {
        create: sinon.stub()
    };
    const imagesIndex = new ImagesIndex(imagesRepository);

    describe('process', () => {
        it('Creates a new image in the repository', () => {
            // Given
            const theId = '123';
            const theImage = {
                url: "https://my.ima.ge",
                description: "This is a wonderful image containing my keyword"
            };
            const theIndexedImage = {
                ...theImage,
                _id: theId
            }
            imagesRepository.create
                .withArgs(theImage)
                .returns(theIndexedImage);

            // When
            const processedImage = imagesIndex.process(theImage);

            // Then
            expect(processedImage).toEqual(theIndexedImage);
        });
    });

});