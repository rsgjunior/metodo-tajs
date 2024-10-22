export default class Person {
    static validate(person) {
        if (!person.name) throw new Error('Name is required');
        if (!person.cpf) throw new Error('cpf is required');
    }

    static format(person) {
        const [firstName, ...lastName] = person.name.split(' ');

        return {
            name: firstName,
            lastName: lastName.join(' '),
            cpf: person.cpf.replace(/\D/g, ''),
        };
    }

    static save(person) {
        const requiredAttributes = [
            'cpf',
            'name',
            'lastName',
        ];

        if (requiredAttributes.some(attr => !person[attr])) {
            throw new Error('Invalid person object')
        }

        console.log('registrado com sucesso', person);
    }

    static process(person) {
        this.validate(person);
        const formattedPerson = this.format(person);
        this.save(formattedPerson);
        return 'ok';
    }
}
