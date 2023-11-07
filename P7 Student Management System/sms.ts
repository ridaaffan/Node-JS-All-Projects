#! /usr/bin/env node

class School {
    name: string;
    students: Student[] = [];
    teachers: Teacher[] = [];
    //making functions that would get input of objects and will push in students and teacher array.

    addStudent(stdObj:Student) { ///gave parameter stdObj a literal type of Student object
this.students.push(stdObj)
    }

    addTeacher(teachdObj:Teacher) { ///gave parameter stdObj a literal type of Student object
        this.teachers.push(teachdObj)
            }

    constructor(name: string) {
        this.name = name;
    }
}

class Student{
    name: string;
    age: number;
    schoolName: string;

    constructor(name:string, age:number, schoolName:string){
        this.name = name;
        this.age = age;
        this.schoolName = schoolName;
    }
}

class Teacher extends Student{}


let school1 = new School("Happy Palace")
let school2 = new School("Learn and grow")

let s1 = new Student ("Rida", 26, school1.name)
let s2 = new Student ("Affan", 28, school2.name)
let s3 = new Student ("Ayesha", 19, school2.name)

let t1 = new Teacher ("Farrukh ", 59, school1.name)
let t2 = new Teacher ("Jamil", 57, school2.name)
let t3 = new Teacher ("Muzammil", 34, school2.name)


//Registering students in school through the function addStudent
school1.addStudent(s1)
school2.addStudent(s2)
school2.addStudent(s2)

//Registering teachers in school through the function addStudent
school1.addTeacher(t1)
school2.addTeacher(t2)
school2.addTeacher(t3)

console.log(school1);
console.log(school2);



