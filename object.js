function Person(name,age) {
    this.name = name
    this.age = age    
}

Person.prototype.sayHello = function(){
    console.log('hello ',this.name)
}

let per = new Person('zhangsan',25)

per.sayHello()//zhangsan

function Student(name,age,grade) {
    Person.call(this,name,age)
    this.grade = grade   
}

Student.prototype = new Person()

Student.prototype.intr = function(){
    console.log('name ',this.name,'grade ',this.grade)
}

let stu = new Student('zhanghai',22,5)

stu.sayHello()//zhanghai
stu.intr()//zhanghai,5
console.log('new person ',Student.prototype,'per ',per)