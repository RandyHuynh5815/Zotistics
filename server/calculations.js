
function classList(data){
    let classes = {}; // { className: {count, {year, quarter, code}} }

    for(classObject of data){
        let className = `${classObject.department} ${classObject.number}`
        let course = {year: classObject.year, quarter: classObject.quarter, code: classObject.code}

        if(className in classes){
            classes[className].count++;
            classes[className].courses.push(course);
        } else {
            classes[className] = {count: 1, courses: [course]}
        }
    }

    return classes;
}

function instructorList(data){
    let instructors = {};

    for(classObject of data){
        if(classObject.instructor in instructors){
            instructors[classObject.instructor]++;
        } else {
            instructors[classObject.instructor] = 1;
        }
    }

    return instructors;
}

function filter(){

}

function uniqueInstructors(data){
    let instructors = new Set();

    for(classObject of data){
        instructors.add(classObject.instructor);
    }

    return [...instructors];
}

module.exports = {classList, instructorList, filter, uniqueInstructors};