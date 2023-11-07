#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

const apiLink : string = 
"https://opentdb.com/api.php?amount=6&category=18&difficulty=easy&type=multiple";

let fetchData = async (data : string) => {

    //fetching data
    let fetchQuiz : any = await fetch (data)
    //converting to json
    let res = await fetchQuiz.json()
    return res.results;
};

let data = await fetchData(apiLink);

let startQuiz = async () => {
    let score : number = 0
    //for username
    let name = await inquirer.prompt({

        type: "input",
        name: "fname",
        message: "What is your name?"
    
    });

    for (let i=1 ; i<=5 ; i++) {
        //for merging answers
        let answers = [...data[i].incorrect_answers, data[i].correct_answer];

        let ans =  await inquirer.prompt({

            type: "list",
            name: "quiz",
            message: data[i].question,
            choices: answers.map((val:any) => val)
        });

        if (ans.quiz == data[i].correct_answer) {
            ++score;
            console.log(chalk.bold.italic.green("Correct"))
        } else {
            console.log(`Correct answer is ${chalk.bold.italic.red(data[i].correct_answer)}`)
        }
    }

    console.log(`Dear ${chalk.bold.red(name.fname)}, your score is ${chalk.bold.green(score)} out of ${chalk.bold.green("5")}`)
};

startQuiz();

