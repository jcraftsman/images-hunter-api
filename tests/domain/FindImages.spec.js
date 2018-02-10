const sinon = require('sinon');
const FindImages = require('../../domain/FindImages');
const Image = require('../../domain/Image');


describe('FindImages', () => {
    let imagesRepository = {};
    let clearImages;
    beforeEach(() => {
        imagesRepository = {
            find: sinon.stub(),
            findById: sinon.stub()
        };
        findImages = new FindImages(imagesRepository);
    })

    describe('byId', () => {
        it('returns the image returned by the repo for the given id', () => {
            // Given
            const theId = '123';
            const theImage = {
                _id: theId,
                url: "https://my.ima.ge",
                description: "This is a wonderful image containing my keyword"
            };
            imagesRepository.findById
                .withArgs(theId)
                .returns(theImage);

            // When
            const foundImage = findImages.byId(theId);

            // Then
            expect(foundImage).toEqual(theImage);
        });
    });

    describe('byText', () => {
        it('returns the images matching the keyword regex returned by the repo', () => {
            // Given
            const adaptedImageMatchingRegexInTheRepo = [new Image(undefined, "https://my.ima.ge", "This is a wonderful image containing my keyword")]
            const matchingRegexImageInTheRepo = [{
                url: "https://my.ima.ge",
                description: "This is a wonderful image containing my keyword"
            }];
            imagesRepository.find
                .withArgs({
                    description: /keyword/i
                })
                .returns(matchingRegexImageInTheRepo);

            // When
            const foundImage = findImages.byText('keyword');

            // Then
            expect(foundImage).toEqual(adaptedImageMatchingRegexInTheRepo);
        });
    });

    describe('all', () => {

        it('returns the images returned by the repo', () => {
            // Given
            const allImages = [{
                url: "https://my.ima.ge",
                description: "This is a wonderful image"
            }, {
                url: "https://my.other.ima.ge",
                description: "This is another wonderful image"
            }];
            imagesRepository.find
                .withArgs()
                .returns(allImages);

            // When
            const foundImage = findImages.all();

            // Then
            expect(foundImage).toEqual(allImages);
        });

    })
});