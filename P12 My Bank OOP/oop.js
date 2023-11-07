#! /usr/bin/env node
import { faker } from "@faker-js/faker";
import chalk from "chalk";
import inquirer from "inquirer";
//class of customer
class Customer {
    constructor(fName, lName, age, gender, mob, acc) {
        this.firstName = fName;
        this.lastName = lName;
        this.age = age;
        this.gender = gender;
        this.mobNumber = mob;
        this.accNumber = acc;
    }
}
//class of Bank
class Bank {
    constructor() {
        this.customer = [];
        this.account = [];
    }
    addCustomer(obj) {
        this.customer.push(obj);
    }
    addAccountNumber(obj) {
        this.account.push(obj);
    }
    transaction(accObj) {
        let NewAccounts = this.account.filter((acc) => acc.accNumber !== accObj.accNumber);
        this.account = [...NewAccounts, accObj];
    }
}
let myBank = new Bank();
//customer Create
for (let i = 1; i <= 3; i++) {
    let fName = faker.person.firstName("male");
    let lName = faker.person.lastName();
    let num = parseInt(faker.phone.number("3#########"));
    const cus = new Customer(fName, lName, 25 * i, "male", num, 1000 + i);
    myBank.addCustomer(cus);
    myBank.addAccountNumber({ accNumber: cus.accNumber, balance: 100 * i });
}
//Bank functionality
async function bankService(bank) {
    do {
        let service = await inquirer.prompt({
            type: "list",
            name: "select",
            message: "Please select the service",
            choices: ["View balance", "Cash withdraw", "Cash deposit", "Exit"]
        });
        //view balance
        if (service.select == "View balance") {
            let res = await inquirer.prompt({
                type: "input",
                name: "num",
                message: "Please enter your account number:"
            });
            let account = myBank.account.find((acc) => acc.accNumber == res.num);
            if (!account) {
                console.log(chalk.red.bold.italic("Invalid account number"));
            }
            if (account) {
                let name = myBank.customer.find((item) => item.accNumber == account?.accNumber);
                console.log(`Dear ${chalk.green.italic(name?.firstName)} ${chalk.green.italic(name?.lastName)} your account balance is ${chalk.bold.blueBright(`$${account.balance}`)}`);
            }
        }
        //cash withdraw
        if (service.select == "Cash withdraw") {
            let res = await inquirer.prompt({
                type: "input",
                name: "num",
                message: "Please enter your account number:"
            });
            let account = myBank.account.find((acc) => acc.accNumber == res.num);
            if (!account) {
                console.log(chalk.red.bold.italic("Invalid account number"));
            }
            if (account) {
                let ans = await inquirer.prompt({
                    type: "number",
                    name: "rupee",
                    message: "Please enter your amount."
                });
                if (ans.rupee > account.balance) {
                    console.log(chalk.red.bold("Insufficient Balance"));
                }
                let newBalance = account.balance - ans.rupee;
                //transaction method call
                bank.transaction({ accNumber: account.accNumber, balance: newBalance });
                console.log(newBalance);
            }
        }
        //cash deposit
        if (service.select == "Cash deposit") {
            let res = await inquirer.prompt({
                type: "input",
                name: "num",
                message: "Please enter your account number:"
            });
            let account = myBank.account.find((acc) => acc.accNumber == res.num);
            if (!account) {
                console.log(chalk.red.bold.italic("Invalid account number"));
            }
            if (account) {
                let ans = await inquirer.prompt({
                    type: "number",
                    name: "rupee",
                    message: "Please enter your amount."
                });
                let newBalance = account.balance + ans.rupee;
                //transaction method call
                bank.transaction({ accNumber: account.accNumber, balance: newBalance });
            }
        }
        //for exit
        if (service.select == "Exit") {
            return;
        }
    } while (true);
}
bankService(myBank);
