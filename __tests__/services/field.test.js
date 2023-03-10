const fieldService = require('../../src/services/field');
const db = require('../../database/models/index');
const { fieldList } = require('../../mocks/fields');
const { collectionsList } = require('../../mocks/collections');

describe('When service tries to get all fields', () => {
  const mockFields = fieldList;

  it('should return list of fields', async () => {
    jest.spyOn(db.field, 'findAll').mockResolvedValue(mockFields);
    const fields = await fieldService.getAllFields();
    expect(fields).toHaveLength(4);
  });
});

describe('When service tries to create a new field', () => {
  const mockField = fieldList[0];

  it('should return the field object', async () => {
    jest.spyOn(db.field, 'create').mockResolvedValue(mockField);
    jest.spyOn(db.collection, 'findOne').mockResolvedValue(collectionsList[0]);
    const field = await fieldService.createField(
      mockField.name,
      mockField.type,
      mockField.collectionId
    );
    expect(field).toEqual(mockField);
    expect(field).toBeInstanceOf(Object);
  });

  it('should throw an error if collection id is invalid', async () => {
    jest.spyOn(db.collection, 'findOne').mockResolvedValue(null);
    await expect(
      fieldService.createField(
        mockField.name,
        mockField.type,
        mockField.collectionId
      )
    ).rejects.toThrow();
  });
});

describe('When service tries to delete a field', () => {
  const mockField = fieldList[0];
  it('should throw an error if field id is invalid', async () => {
    jest.spyOn(db.field, 'findOne').mockResolvedValue(null);
    await expect(fieldService.deleteField(mockField.id)).rejects.toThrow();
  });
});

describe('When service tries to update a field', () => {
  const mockField = fieldList[0];
  it('should throw an error if field id is invalid', async () => {
    jest.spyOn(db.field, 'findOne').mockResolvedValue(null);
    await expect(
      fieldService.updateField(
        mockField.id,
        mockField.name,
        mockField.collectionId,
        mockField.type
      )
    ).rejects.toThrow();
  });
});