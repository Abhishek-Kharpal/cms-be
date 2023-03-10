const collectionService = require('../../src/services/collection');
const db = require('../../database/models/index');
const { collectionsList } = require('../../mocks/collections');

describe('When service tries to fetch all collections', () => {
  const mockCollections = collectionsList;
  it('should return list of collections', async () => {
    jest.spyOn(db.collection, 'findAll').mockResolvedValue(mockCollections);
    const collections = await collectionService.getAllCollections();
    expect(collections).toHaveLength(2);
  });
});

describe('When service tries to create a collection', () => {
  const mockCollection = collectionsList[0];
  it('should return the created collection', async () => {
    jest.spyOn(db.collection, 'create').mockResolvedValue(mockCollection);
    const collection = await collectionService.createCollection(mockCollection.name);
    expect(collection).toEqual(mockCollection);
  });
});