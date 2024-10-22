import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import fs from 'node:fs/promises';
import Service from '../src/service.js';

describe('Service Suite', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    })

    describe('#read', () => {
        it('should return users array without password', async () => {
            const service = new Service();

            // AAA - Arrange, act, assert
            // arrange
            const mockDatabase = [
                { "id": "ae61d95b-ae5f-4b17-88b4-775e5ef4a4df", "name": "Fulano", "password": "5d6cf02dd2aaa326", "age": 12 },
                { "id": "a5c3b4ad-30a9-4baf-8b88-f936b46c03d3", "name": "Ciclano", "password": "2fec81588cc98294", "age": 13 }
            ];

            const mockReadFileResolvedValue = mockDatabase
                .map(e => JSON.stringify(e))
                .map(e => e.concat('\n'))
                .join('')

            jest.spyOn(fs, fs.readFile.name)
                .mockResolvedValue(mockReadFileResolvedValue)

            // act
            const result = await service.read();

            // assert
            const expectedResult = mockDatabase.map(({ password, ...rest }) => rest);
            expect(result).toStrictEqual(expectedResult)
        })

        it("should return empty array if db file doesn't exist", async () => {
            const service = new Service();
            const result = await service.read();

            expect(result).toStrictEqual([]);
        })
    })
})
