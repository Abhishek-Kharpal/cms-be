const entryController = require('../../src/controllers/entry');
const entryService = require('../../src/services/entry');
const {entriesList} = require('../../mocks/entries');

describe('When user tries to get all entries', () => {
  const entries = entriesList;

  it('should return all the entries',async ()=>{
    const mockRequest = {};
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    jest.spyOn(entryService, 'getAllEntries').mockResolvedValue(entries);
    await entryController.getAllEntries(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(entries);
  });
});

describe('When user tries to create a new entry', () => {
  const entry = entriesList[0];

  it('should return the created entry',async ()=>{
    const mockRequest = {
      body: {
        collectionId: 1,
        entryValues: {
          'name': 'XYZ',
          'address': '4245',
        }
      }
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    jest.spyOn(entryService, 'createEntry').mockResolvedValue(entry);
    await entryController.createEntry(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith(entry);
  });
});

describe('When user tries to update an entry',()=>{
  const entry = entriesList[0];

  it('should return the updated entry',async ()=>{
    const mockRequest = {
      params: {
        id: 1
      },
      body: {
        collectionId: entriesList[1].collectionId,
        entryValues: entriesList[1].entryValues
      }
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    jest.spyOn(entryService, 'updateEntry').mockResolvedValue({...entriesList[1], id: entry});
    await entryController.updateEntry(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({...entriesList[1], id: entry});
  });
}); 

describe('When user tries to delete an entry',()=>{

  it('should delete the entry',async ()=>{
    const mockRequest = {
      params: {
        id: 1
      }
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    jest.spyOn(entryService, 'deleteEntry').mockResolvedValue();
    await entryController.deleteEntry(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(204);
    expect(mockResponse.json).toHaveBeenCalledWith();
  });
});