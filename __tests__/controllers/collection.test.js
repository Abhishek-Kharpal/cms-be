const collectionController = require('../../src/controllers/collection');
const collectionService = require('../../src/services/collection');
const { collectionsList } = require('../../mocks/collections');

describe('When user tries to get all collections', () => {
  const collections = collectionsList;

  it('should return all the collections',async ()=>{
    const mockRequest = {};
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    jest.spyOn(collectionService, 'getAllCollections').mockResolvedValue(collections);
    await collectionController.getAllCollections(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(collections);
  });

});

describe('When user tries to create a collection', () => {
  const collection = collectionsList[0];

  it('should return the created collection',async ()=>{
    const mockRequest = {
      body: {
        name: collection.name
      }
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    jest.spyOn(collectionService, 'createCollection').mockResolvedValue(collection);
    await collectionController.createCollection(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith(collection);
  });

});