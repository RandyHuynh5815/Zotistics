
/*
  Returns object of classes and their occurrences to use
  in the side bar of the results page next to the graph
 */
function classList(data){
    let classes = {}; // { className: {count, {year, quarter, code}} }

    for(classObject of data){
        let c = classObject.course_offering;
        let className = `${c.course ? c.course.department : null} ${c.course ? c.course.number : null}`;
        let course = {year: c.year, quarter: c.quarter, code: c.section.code};

        if(className in classes){
            classes[className].count++;
            classes[className].courses.push(course);
        } else {
            classes[className] = {count: 1, courses: [course]};
        }
    }

    return classes;
}

/*
  Returns object of instructors and their occurrences to use
  in the side bar of the results page next to the graph
 */
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

/*
  Sums up the amount of grades in the query and averages the gpa
 */
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

module.exports = {classList, instructorList, filter, cumulativeData};