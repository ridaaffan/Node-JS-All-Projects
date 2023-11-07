#! /usr/bin/env node

import inquirer from "inquirer"

class Student {
    name:string

    constructor (n:string) {
    this.name = n
    }
}

class Person {
    students: Student[]=[]
    addStudent(obj:Student){
        this.students.push(obj)
    }
}

const persons = new Person()

console.log(persons);

const programmStart = async (persons: Person) => {
    do{
        console.log("Welcome guest");

    const ans = await inquirer.prompt({

        type: "list",
        name: "select",
        message: "Whom would you like to talk to?",
        choices: ["Yourself", "Student"]
    });

    if(ans.select == "Yourself") {
        console.log("Hello, I am talking to myself");
        console.log('I am feeling good!')
    };

    if(ans.select == "Student") {
        const ans = await inquirer.prompt({

            type: "input",
            name: "student",
            message: "Which student do you want to talk to?"
        });

        const student = persons.students.find((val) => val.name == ans.student);

        if(!student) {
            const name = new Student(ans.student);
            persons.addStudent(name);

            console.log(`Hello I am ${name.name}, and I am fine!`);
            console.log(persons.students);
        }

        if(student) {
            console.log(`Hello I am ${student.name}, and I am fine....!`);
            console.log(persons.students);
        }

    };
    } while(true)
};

programmStart(persons)