import { describe, expect, it, jest } from '@jest/globals';
import Person from '../src/person.js';

describe('#Person Suite', () => {
    describe('#validate', () => {
        it('should throw error if the name is not present', () => {
            const invalidPersonMock = {
                name: '',
                cpf: '123.456.789-09',
            };

            expect(() => Person.validate(invalidPersonMock))
                .toThrow(new Error('Name is required'));
        });

        it('should throw error if the cpf is not present', () => {
            const invalidPersonMock = {
                name: 'Fulano',
                cpf: '',
            };

            expect(() => Person.validate(invalidPersonMock))
                .toThrow(new Error('cpf is required'));
        });

        it("shouldn't throw error if person is valid", () => {
            const validPersonMock = {
                name: 'Fulano',
                cpf: '123.456.789-09',
            };

            expect(() => Person.validate(validPersonMock))
                .not
                .toThrow();
        });
    });

    describe('#format', () => {
        it('should format the person name and CPF', () => {
            const validPersonMock = {
                name: 'Fulano da Silva',
                cpf: '123.456.789-09',
            };

            const formattedPerson = Person.format(validPersonMock);

            const expectedResult = {
                name: 'Fulano',
                cpf: '12345678909',
                lastName: 'da Silva',
            };

            expect(formattedPerson).toStrictEqual(expectedResult);
        });
    });

    describe('#process', () => {
        it('should process a valid person', () => {
            // esse método será chamado internamente pelo process
            // queremos mockar o resultado dele pois ele já foi testado acima
            jest
                .spyOn(
                    Person,
                    Person.validate.name,
                )
                .mockReturnValue();

            // esse método será chamado internamente pelo process
            // queremos mockar o resultado dele pois ele já foi testado acima
            jest
                .spyOn(
                    Person,
                    Person.format.name,
                ).mockReturnValue({
                    name: 'Fulano',
                    cpf: '12345678909',
                    lastName: 'da Silva',
                });

            const formattedPersonMock = {
                name: 'Fulano',
                cpf: '12345678909',
                lastName: 'da Silva',
            };

            const result = Person.process(formattedPersonMock);

            expect(result).toStrictEqual('ok');
        });
    });
});
