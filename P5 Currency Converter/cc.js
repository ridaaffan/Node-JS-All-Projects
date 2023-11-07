#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
//Currency converter API link
let apiLink = "https://v6.exchangerate-api.com/v6/bc791a8c8dc6aa4b3d47e005/latest/PKR";
//Fetching data through arrow function
let fetchData = async (data) => {
    let fetchData = await fetch(data);
    let res = await fetchData.json();
    return res.conversion_rates;
};
let data = await fetchData(apiLink);
//Object to array using built-in function
let countries = Object.keys(data);
//User input of first country
let firstCountry = await inquirer.prompt({
    type: "list",
    name: "name",
    message: "Converting from",
    choices: countries,
});
//first country money
let userMoney = await inquirer.prompt({
    type: "number",
    name: "rupee",
    message: `Please enter the amount in ${chalk.redBright.bold(firstCountry.name)}:`
});
//convert country
let secondCountry = await inquirer.prompt({
    type: "list",
    name: "name",
    message: "Converting to",
    choices: countries,
});
//conversion rate
let cnv = `https://v6.exchangerate-api.com/v6/bc791a8c8dc6aa4b3d47e005/pair/${firstCountry.name}/${secondCountry.name}`;
//fetching data for conversion rate
let cnvData = async (data) => {
    let cnvData = await fetch(data);
    let res = await cnvData.json();
    return res.conversion_rate;
};
let conversionRate = await cnvData(cnv);
let convertedRate = userMoney.rupee * conversionRate;
console.log(`Your ${chalk.bold.redBright(firstCountry.name)} ${chalk.bold.redBright(userMoney.rupee)} in ${chalk.bold.redBright(secondCountry.name)} is ${chalk.bold.redBright(convertedRate)}`);
