import { fakerRU as faker } from '@faker-js/faker'
import XLSX from 'xlsx';

function generateFakeData(num) {
    const data = [];

    for (let i = 0; i < num; i++) {
        const user = {
            id: i + 1,
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            phone: faker.phone.number(),
            email: faker.internet.email(),
            registration_date: faker.date.past().toISOString().split('T')[0],
            loyalty_points: faker.number.int({ min: 0, max: 1000 }),
            date_of_birth: faker.date.past(30, new Date()).toISOString().split('T')[0]
        };
        data.push(user);
    }

    return data;
}
const fakeUsers = generateFakeData(50);

const dataForExcel = [
    ["id", "first_name", "last_name", "phone", "email", "registration_date", "loyalty_points", "date_of_birth"],
    ...fakeUsers.map(user => [
        user.id,
        user.first_name,
        user.last_name,
        user.phone,
        user.email,
        user.registration_date,
        user.loyalty_points,
        user.date_of_birth
    ])
];

const workbook = XLSX.utils.book_new();

const worksheet = XLSX.utils.aoa_to_sheet(dataForExcel);

XLSX.utils.book_append_sheet(workbook, worksheet, "Лист1");

XLSX.writeFile(workbook, "данные.xlsx");

console.log(" готово ");
