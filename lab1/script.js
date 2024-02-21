function printInfo() {
    console.log("Для використання функції triangle введіть значення та тип першого елементу трикутника, потім значення та тип другого елементу.")
    console.log("Доступні типи: leg, hypotenuse, adjacent angle, opposite angle, angle.");
    console.log("leg - катет");
    console.log("hypotenuse - гіпотенуза");
    console.log("adjacent angle - прилеглий до катета кут, opposite angle, angle.");
    console.log("opposite angle - протилежний до катета кут.");
    console.log("angle - один з двох гострих кутів (коли задана гіпотенуза).");
    console.log("Приклад використання: triangle(4, 'leg', 8, 'hypotenuse');");
    console.log("Перевірте, щоб величини кутів були в градусах, а катети були менші за гіпотенузу.");    
}

function toDegrees(val) {
  return val * (180 / Math.PI);
}

function triangle(val1, type1, val2, type2) {
    if (val1  <= 0 || val2 <= 0) {
        console.log("Значення менші або дорівнюють 0");
        return "failed";
    }

    const validTypes = ["leg", "hypotenuse", "adjacent angle", "opposite angle", "angle"];
    if (!validTypes.includes(type1) || !validTypes.includes(type2)) {
        console.log("Один із двох типів не дійсний");
        console.log("Доступні типи: leg, hypotenuse, adjacent angle, opposite angle, angle.");
        return "failed";
    }

    if ((type1 === "hypotenuse" && type2 === "leg" && val1 <= val2) || (type2 === "hypotenuse" && type1 === "leg" && val2 <= val1)) {
        console.log("Гіпотенуза має бути більшою за катети.");
        return "failed";
    }

    if (type1 === "hypotenuse" && type2 === "hypotenuse") {
        console.log("Не може бути 2 гіпотенузи.");
        return "failed";
    }
    
    if (type1 === "adjacent angle" && (val1 >= 90 || val1 <= 0.00000000001) || type2 === "adjacent angle" && (val2 >= 90 || val2 <= 0.00000000001)) {
        console.log("Кути повинні бути гострими (меншими за 90 градусів).");
        return "failed";
    }

    if (type1 === "opposite angle" && (val1 >= 90 || val1 <= 0) || type2 === "opposite angle" && (val2 >= 90 || val2 <= 0)) {
        console.log("Кути повинні бути гострими (меншими за 90 градусів).");
        return "failed";
    }

    if (type1 === "angle" && (val1 >= 90 || val1 <= 0) || type2 === "angle" && (val2 >= 90 || val2 <= 0)) {
        console.log("Кути повинні бути гострими (меншими за 90 градусів).");
        return "failed";
    }
    
    let a, b; //? катети
    let c; //? гіпотенуза
    let alpha; //?  гострий кут, який лежить навпроти катета a
    let beta; //?  гострий кут, який лежить навпроти катета b

    switch (type1) {
        
        //? leg - катет
        case "leg":
            a = val1;
            
            switch (type2) {
                
                //? leg - катет
                case "leg":
                    b = val2;

                    c = Math.sqrt(a ** 2 + b ** 2);
                    alpha = toDegrees(Math.atan(a / b));
                    beta = toDegrees(Math.atan(b / a));
                    break;
                

                //? hypotenuse - гіпотенуза
                case "hypotenuse":
                    c = val2;

                    b = Math.sqrt(c ** 2 - a ** 2);
                    alpha = toDegrees(Math.atan(a / b));
                    beta = toDegrees(Math.atan(b / a));
                    break;
                
                //? adjacent angle - прилеглий до катета кут
                case "adjacent angle":
                    alpha = val2;
                    
                    c = a / Math.cos(alpha * (Math.PI / 180));
                    b = Math.sqrt(c ** 2 - a ** 2);
                    
                    beta = 90 - alpha;
                    break;
                
                //? opposite angle - протилежний до катета кут
                case "opposite angle":
                    beta = val2;
                    
                    c = a / Math.sin(beta * (Math.PI / 180));
                    b = Math.sqrt(c ** 2 - a ** 2);

                    alpha = 90 - beta;
                    break;
                default:
                    console.log("Не вистачає інформації для обчислення кутів.");
                    return "failed";
            }
            break;
        
        //? hypotenuse - гіпотенуза
        case "hypotenuse":
            c = val1;
            switch (type2) {
                case "leg":
                    a = val2;
                    b = Math.sqrt(c ** 2 - a ** 2);
                    alpha = toDegrees(Math.atan(a / b));
                    beta = toDegrees(Math.atan(b / a));
                    break;
                case "angle":
                    beta = val2;
                    
                    b = c * Math.sin(beta * (Math.PI / 180));
                    a = Math.sqrt(c ** 2 - b ** 2);

                    alpha = 90 - beta;
                    break;
                default:
                    console.log("Не вистачає інформації для обчислення кутів.");
                    return "failed";
            }
            break;

        //? adjacent angle - прилеглий до катета кут
        case "adjacent angle":
            alpha = val1;
            switch (type2) {
                case "leg":
                    a = val2;
                    
                    c = a / Math.cos(alpha * (Math.PI / 180));
                    b = Math.sqrt(c ** 2 - a ** 2);

                    beta = 90 - alpha;
                    break;
                default:
                    console.log("Не вистачає інформації для обчислення кутів.");
                    return "failed";
            }
            break;

        //? opposite angle - протилежний до катета кут
        case "opposite angle":
            beta = val1;
            switch (type2) {
                case "leg":
                    b = val2;

                    c = b / Math.sin(beta * (Math.PI / 180));
                    a = Math.sqrt(c ** 2 - b ** 2);

                    alpha = 90 - beta;
                    break;
                default:
                    console.log("Не вистачає інформації для обчислення кутів.");
                    return "failed";
            }
            break;

        case "angle":
            beta = val1;
            switch (type2) {
                case "hypotenuse":
                    c = val2;
                    
                    b = c * Math.sin(beta * (Math.PI / 180));
                    a = Math.sqrt(c ** 2 - b ** 2);

                    alpha = 90 - beta;
                    break;
                default:
                    console.log("Не вистачає інформації для обчислення кутів.");
                    return "failed";
            }
            break;
        
        default:
            console.log("Не вистачає інформації для обчислення кутів.");
            return "failed";
    }
    
    console.log(`a = ${a}`);
    console.log(`b = ${b}`);
    console.log(`c = ${c}`);
    console.log(`alpha = ${alpha}`);
    console.log(`beta = ${beta}`);
    return "success";
}

printInfo();
