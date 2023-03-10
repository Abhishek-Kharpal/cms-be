const entryService = require('../../src/services/entry');
const db = require('../../database/models/index');
const { entriesList } = require('../../mocks/entries');
const { collectionsList } = require('../../mocks/collections');

describe('When service tries to get all entries', () => {
  const mockEntries = entriesList;

  it('should return list of entries', async () => {
    jest.spyOn(db.entry, 'findAll').mockResolvedValue(mockEntries);
    const entries = await entryService.getAllEntries();
    expect(entries).toHaveLength(3);
  });
});

describe('When service tries to create a new entry', () => {
  const mockEntry = entriesList[0];

  it('should return the entry object', async () => {
    jest.spyOn(db.entry, 'create').mockResolvedValue(mockEntry);
    jest.spyOn(db.collection, 'findOne').mockResolvedValue(collectionsList[0]);
    const entry = await entryService.createEntry(
      mockEntry.collectionId,
      mockEntry.entryValues
    );
    expect(entry).toEqual(mockEntry);
    expect(entry).toBeInstanceOf(Object);
  });

  it('should throw an error if collection id is invalid', async () => {
    jest.spyOn(db.collection, 'findOne').mockResolvedValue(null);
    await expect(
      entryService.createEntry(
        mockEntry.collectionId,
        mockEntry.entryValues
      )
    ).rejects.toThrow();
  });
});

describe('When service tries to delete an entry', () => {
  it('should destroy the entry', async () => {
    jest.spyOn(db.entry, 'destroy').mockResolvedValue();
    await entryService.deleteEntry(1);
    expect(db.entry.destroy).toHaveBeenCalled();
  });
});

describe('When service tries to update an entry', () => {
  const mockEntry = entriesList[0];
  it('should throw an error if entry id is invalid', async () => {
    jest.spyOn(db.entry, 'findOne').mockResolvedValue(null);
    await expect(
      entryService.updateEntry(
        mockEntry.id,
        mockEntry.collectionId,
        mockEntry.entryValues
      )
    ).rejects.toThrow();
  });

  it('should throw an error if collection id is invalid', async () => {
    jest.spyOn(db.entry, 'findOne').mockResolvedValue(mockEntry);
    jest.spyOn(db.collection, 'findOne').mockResolvedValue(null);
    await expect(
      entryService.updateEntry(
        mockEntry.id,
        mockEntry.collectionId,
        mockEntry.entryValues
      )
    ).rejects.toThrow();
  });
});

describe('When service tries to add a field to entries', () => {

  it('should throw an error if field id is invalid', async () => {
    jest.spyOn(db.field, 'findOne').mockResolvedValue(null);
    await expect(entryService.addFieldToEntries(1)).rejects.toThrow();
  });
});

describe('When service tries to delete a field from entries', () => {
  it('should throw an error if field id is invalid', async () => {
    jest.spyOn(db.field, 'findOne').mockResolvedValue(null);
    await expect(entryService.deleteFieldFromEntries(1)).rejects.toThrow();
  });
});