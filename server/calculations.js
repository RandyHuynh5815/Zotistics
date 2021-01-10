
function classList(data){
    let classes = {};
    
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
}

module.exports = {classList};