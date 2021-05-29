
function classList(data){
    let classes = {}; // { className: {count, {year, quarter, code}} }

    for(classObject of data){
        console.log(classObject)
        let className = `${classObject.course_offering.course.department} ${classObject.course_offering.course.number}`
        let course = {year: classObject.course_offering.year, quarter: classObject.course_offering.quarter,
                      code: classObject.course_offering.section.code}

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
        if(classObject.course_offering.instructors[0].name in instructors){
            instructors[classObject.instructor]++;
        } else {
            instructors[classObject.instructor] = 1;
        }
    }

    return instructors;
}

function cumulativeData(data){
    let stats = {a: 0, b: 0, c: 0, d: 0, f: 0, p: 0, np: 0, gpa: 0}
    for(classObject of data){
        stats.a += classObject.grade_a_count;
        stats.b += classObject.grade_b_count;
        stats.c += classObject.grade_c_count;
        stats.d += classObject.grade_d_count;
        stats.f += classObject.grade_f_count;
        stats.p += classObject.grade_p_count;
        stats.np += classObject.grade_np_count;
        stats.gpa += classObject.average_gpa;
    }
    stats.gpa = (stats.gpa / data.length).toFixed(2)
    return stats;
}

function filter(){

}

function uniqueInstructors(data){
    let instructors = new Set();

    for(classObject of data){
        instructors.add(classObject.course_offering.instructors[0]);
    }

    return [...instructors];
}

module.exports = {classList, instructorList, filter, uniqueInstructors, cumulativeData};