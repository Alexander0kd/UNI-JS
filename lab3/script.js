// 1.2.3
const car1 = new Object();

car1.color = 'yellow';
car1.maxSpeed = 180;
car1.driver = {
    name: 'Kademskyi Olexander',
    category : 'C',
    personalLimitations: 'No driving at night',
};
car1.tuning = true;
car1.numberOfAccidents = 0;

// 1.2.4
const car2 = {
    color: 'red',
    maxSpeed: 200,
    driver: {
        name: 'Kademskyi Olexander',
        category: 'B',
        personalLimitations: null
    },
    tuning: false,
    numberOfAccidents: 2
};

// 1.2.5
car1.drive = function() {
    console.log("I am not driving at night.");
};
car1.drive();

// 1.2.6
car2.drive = function() {
    console.log("I can drive anytime.");
};
car2.drive();

// 1.2.7
function Truck(color, weight, avgSpeed, brand, model) {
    this.color = color;
    this.weight = weight;
    this.avgSpeed = avgSpeed;
    this.brand = brand;
    this.model = model;
}


// 1.2.8
Truck.prototype.AssignDriver = function(name, nightDriving, experience) {
    this.driver = {
        name: name,
        nightDriving: nightDriving,
        experience: experience
    };
};

// 1.2.9
Truck.prototype.trip = function() {
    if (!this.driver) {
        console.log("No driver assigned.");
    } else {
        const nightDrivingMessage = this.driver.nightDriving ? "drives at night" : "does not drive at night";
        console.log(`Driver ${this.driver.name} ${nightDrivingMessage} and has ${this.driver.experience} years of experience.`);
    }
};

// 1.2.10
const truck1 = new Truck('green', 6000, 55, 'Volvo', 'VNL');
truck1.AssignDriver('Kademskyi Olexander', true, 10);
truck1.trip();

const truck2 = new Truck('yellow', 7000, 55, 'Volvo', 'VNL');
truck2.AssignDriver('John Doe', false, 2);
truck2.trip();

// 1.2.12
class Square {
    constructor(a) {
        // 1.2.13
        this.a = a;
    }

    // 1.2.14
    static help() {
        console.log("Квадрат - геометрична фігура з чотирма рівними сторонами та чотирма прямими кутами.");
    }
    
    // 1.2.15
    length() {
        console.log(`Сума довжин сторін квадрата: ${4 * this.a}`);
    }
    
    // 1.2.15
    square() {
        console.log(`Площа квадрата: ${(this.a ** 2)}`);
    }
    
    // 1.2.15
    info() {
        console.log("Характеристики квадрата:");
        console.log(`- Всі сторони мають однакову довжину: ${this.a}`);
        console.log("- Всі кути рівні 90 градусів");
        this.length();
        this.square();
    }
}

// 1.2.16
class Rectangle extends Square {
    constructor(a, b) {
        // 1.2.17
        super(a);
        this.b = b;
    }

    // 1.2.17
    static help() {
        console.log("Прямокутник - геометрична фігура з двома паралельними сторонами та чотирма прямими кутами.");
    }
    
    // 1.2.17
    length() {
        console.log(`Периметр прямокутника: ${(2 * (this.a + this.b))}`);
    }
    
    // 1.2.17
    square() {
        console.log(`Площа прямокутника: ${(this.a * this.b)}`);
    }
    
    // 1.2.17
    info() {
        console.log("Характеристики прямокутника:");
        console.log(`- Довжина: ${this.a}, Ширина: ${this.b}`);
        console.log("- Всі кути рівні 90 градусів");
        this.length();
        this.square();
    }

    // 1.2.22
    get getA() {
        return this.a;
    }
    
    // 1.2.22
    set setA(value) {
        this.a = value;
    }

    // 1.2.22
    get getB() {
        return this.b;
    }
    
    // 1.2.22
    set setB(value) {
        this.b = value;
    }
}

// 1.2.18
class Rhombus extends Square {
    constructor(a, alpha, beta) {
        // 1.2.19
        super(a);
        this.alpha = alpha;
        this.beta = beta;
    }

    // 1.2.19
    static help() {
        console.log("Ромб - геометрична фігура з чотирма рівними сторонами та чотирма кутами.");
    }
    
    // 1.2.19
    length() {
        console.log(`Сума довжин сторін ромба: ${4 * this.a}`);
    }
    
    // 1.2.19
    square() {
        console.log(`Площа ромба: ${(this.a ** 2) * Math.sin(this.alpha * Math.PI / 180)}`);
    }
    
    // 1.2.19
    info() {
        console.log("Характеристики ромба:");
        console.log(`- Сторони: ${this.a}`);
        console.log(`- Кут alpha: ${this.alpha}, кут beta: ${this.beta}`);
        this.length();
        this.square();
    }
}

// 1.2.20
class Parallelogram extends Rhombus {
    constructor(a, b, alpha, beta) {
        // 1.2.21
        super(a, alpha, beta);
        this.b = b;
    }
  
    // 1.2.21
    static help() {
        console.log("Паралелограм - геометрична фігура з протилежними сторонами, які рівні та паралельні.");
    }
  
    // 1.2.21
    length() {
        console.log(`Периметр паралелограма: ${(2 * (this.a + this.b))}`);
    }
  
    // 1.2.21
    square() {
        console.log(`Площа паралелограма: ${(this.a * Math.sin(this.beta * Math.PI / 180))}`);
    }
  
    // 1.2.21
    info() {
        console.log("Характеристики паралелограма:");
        console.log(`- Довжина: ${this.a}, Ширина: ${this.b}`);
        console.log(`- Кут alpha: ${this.alpha}, кут beta: ${this.beta}`);
        this.length();
        this.square();
    }
}

// 1.2.23
Square.help();
Rectangle.help();
Rhombus.help();
Parallelogram.help();

// 1.2.24
const square = new Square(5);
square.info();

const rectangle = new Rectangle(6, 8);
rectangle.info();

const rhombus = new Rhombus(7, 60, 120);
rhombus.info();

const parallelogram = new Parallelogram(9, 10, 70, 110);
parallelogram.info();

// 1.2.25
function Triangular(a = 3, b = 4, c = 5) {
    return { a, b, c };
}

// 1.2.26
const triangle1 = Triangular();
const triangle2 = Triangular(7, 8, 9);
const triangle3 = Triangular(10, 12, 15);

console.log("Default Triangle:", triangle1);
console.log("Triangle 1:", triangle2);
console.log("Triangle 2:", triangle3);

// 1.2.27
function PiMultiplier(number) {
    return () => Math.PI * number;
}

// 1.2.28
const multiplyBy2 = PiMultiplier(2);
const multiplyBy3_2 = PiMultiplier(3/2);
const multiplyBy1_2 = PiMultiplier(1/2);

console.log("π * 2 =", multiplyBy2());
console.log("π * 3/2 =", multiplyBy3_2());
console.log("π / 2 =", multiplyBy1_2());

// 1.2.29
function Painter(color) {
    return (obj) => {
      const type = obj.type || "No 'type' property occurred!";
      console.log(`${color}: ${type}`);
    }
}

// 1.2.30
const PaintBlue = Painter("Blue");
const PaintRed = Painter("Red");
const PaintYellow = Painter("Yellow");

// 1.2.31
const object1 = { maxSpeed: 280, type: "Sportcar", color: "magenta" };
const object2 = { type: "Truck", avgSpeed: 90, loadCapacity: 2400 };
const object3 = { maxSpeed: 180, color: "purple", isCar: true };

PaintBlue(object1);
PaintRed(object2);
PaintYellow(object3);