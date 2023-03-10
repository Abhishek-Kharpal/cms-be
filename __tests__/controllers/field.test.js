const fieldController = require('../../src/controllers/field');
const fieldService = require('../../src/services/field');
const entryService = require('../../src/services/entry');
const { fieldList } = require('../../mocks/fields');

describe('When user tries to get all fields', () => {
  const fields = fieldList;

  it('should return all the fields',async ()=>{
    const mockRequest = {};
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    jest.spyOn(fieldService, 'getAllFields').mockResolvedValue(fields);
    await fieldController.getAllFields(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(fields);
  });

  it('should return 500 response if service throws an error',async ()=>{
    const mockRequest = {};
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    jest.spyOn(fieldService, 'getAllFields').mockRejectedValue(new Error('Error'));
    await fieldController.getAllFields(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({error: 'Error'});
  });
});

describe('When user tries to create a field', () => {
  const field = fieldList[0];

  it('should return the created field',async ()=>{
    const mockRequest = {
      body: {
        name: field.name,
        type: field.type,
        collectionId: field.collectionId
      }
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    jest.spyOn(fieldService, 'createField').mockResolvedValue(field);
    jest.spyOn(entryService, 'addFieldToEntries').mockResolvedValue();
    await fieldController.createField(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith(field);
  });

  it('should return 500 response if service throws an error',async ()=>{
    const mockRequest = {
      body: {
        name: field.name,
        type: field.type,
        collectionId: field.collectionId
      }
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    jest.spyOn(fieldService, 'createField').mockRejectedValue(new Error('Error'));
    await fieldController.createField(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({error: 'Error'});
  });
});

describe('When user tries to update a field', () => {
  const field = fieldList[0];

  it('should return the updated field',async ()=>{
    const mockRequest = {
      params: {
        id: field.id
      },
      body: {
        name: fieldList[1].name,
        type: fieldList[1].type,
        collectionId: fieldList[1].collectionId
      }
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    jest.spyOn(fieldService, 'updateField').mockResolvedValue({...fieldList[1], id: field.id});
    jest.spyOn(entryService, 'updateFieldInEntries').mockResolvedValue();
    await fieldController.updateField(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({...fieldList[1], id: field.id});
  });

  it('should return 500 response if service throws an error',async ()=>{
    const mockRequest = {
      params: {
        id: field.id
      },
      body: {
        name: fieldList[1].name,
        type: fieldList[1].type,
        collectionId: fieldList[1].collectionId
      }
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    jest.spyOn(fieldService, 'updateField').mockRejectedValue(new Error('Error'));
    await fieldController.updateField(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({error: 'Error'});
  });
});

describe('When user tries to delete a field', () => {
  const field = fieldList[0];

  it('should delete the field',async ()=>{
    const mockRequest = {
      params: {
        id: field.id
      }
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    jest.spyOn(fieldService, 'deleteField').mockResolvedValue();
    jest.spyOn(entryService, 'deleteFieldFromEntries').mockResolvedValue();
    await fieldController.deleteField(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(204);
    expect(mockResponse.json).toHaveBeenCalledWith();
  });

  it('should return 500 response if service throws an error',async ()=>{
    const mockRequest = {
      params: {
        id: field.id
      }
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    jest.spyOn(fieldService, 'deleteField').mockRejectedValue(new Error('Error'));
    await fieldController.deleteField(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({error: 'Error'});
  });
});