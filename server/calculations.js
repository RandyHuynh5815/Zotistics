
/*
  Returns object of classes and their occurrences to use
  in the side bar of the results page next to the graph
 */
function classList(data){
    let classes = {}; // { className: {count, {year, quarter, code}} }

    for(let classObject of data){
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

    for(let classObject of data){
        let teacher = null;
        if(classObject.course_offering.instructors !== null){
            if(classObject.course_offering.instructors[0] !== null){
                teacher = classObject.course_offering.instructors[0].name;
            }
        }
        //let teacher = classObject.course_offering.instructors[0].name
        if(teacher in instructors){
            instructors[teacher]++;
        } else {
            instructors[teacher] = 1;
        }
    }

    return instructors;
}

/*
  Returns exact year from a quarter and year combo
  Winter 2017-18 => Winter 2018
 */
function exactYear(quarter, year){
    let yearSplit = year.split('-');
    let quarterUpper = quarter.toUpperCase()
    let exactYear;
    if(quarterUpper === 'SUMMER' || quarterUpper === 'FALL'){
        exactYear = yearSplit[0]
    } else if(quarterUpper === 'WINTER' || quarterUpper === 'SPRING'){
        exactYear = yearSplit[0][0] + yearSplit[0][1] + yearSplit[1]
    }

    return exactYear
}

/*
  Returns exact quarter and year from the search query
  Winter 2017-18 => Winter 2018
 */
function quarterYear(quarters, years){
    if(quarters.length === 1 && years.length === 1){
        return {quarter: quarters[0], year: exactYear(quarters[0], years[0])}
    } else if(quarters.length === 1 && years.length === 0){
        return {quarter: quarters[0], year: ''}
    } else if(quarters.length === 0 && years.length === 1){
        return {quarter: '', year: years[0]}
    } else if(quarters.length === 0 && years.length === 0){
        return {quarter: 'All', year: ''}
    } else {
        return {quarter: 'Custom', year: ''}
    }
}

/*
  Adds additional data for each course in the api result
 */
function addData(data){
    for(let i = 0; i < data.length; i++){
        let quarter = data[i].course_offering.quarter.toUpperCase();
        let year = data[i].course_offering.year;
        data[i].course_offering.exact_year = exactYear(quarter, year);
        data[i].course_offering.quarter = data[i].course_offering.quarter.charAt(0).toUpperCase() +
            data[i].course_offering.quarter.slice(1).toLowerCase(); // all caps to first letter upper case and rest lower case
    }
}

/*
  Sums up the amount of grades in the query and averages the gpa
 */
function cumulativeData(data){
    let stats = {a: 0, b: 0, c: 0, d: 0, f: 0, p: 0, np: 0, gpa: 0}
    for(let classObject of data){
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

/*
  Filters the api result based on the advanced options in the query
 */
function filter(data, excludePNP, covid19, lowerDiv, upperDiv){
    let final = [];

    for(let c of data){
        let push = true;
        let co = c.course_offering;

        if(lowerDiv === true && upperDiv === false && co.course !== null){
            let num = parseInt(co.course.number.replace(/\D/g, ""));
            if(num >= 100){
                push = false;
            }
        }
        if(upperDiv === true && lowerDiv === false && co.course !== null){
            let num = parseInt(co.course.number.replace(/\D/g, ""));
            if(num < 100){
                push = false;
            }
        }
        if(covid19 === true){
            if((co.year === '2019-20' && co.quarter.toUpperCase() === 'WINTER') ||
                (co.year === '2019-20' && co.quarter.toUpperCase() === 'SPRING') ||
                (co.year === '2020-21' && co.quarter.toUpperCase() === 'SUMMER') ||
                (co.year === '2020-21' && co.quarter.toUpperCase() === 'FALL') ||
                (co.year === '2020-21' && co.quarter.toUpperCase() === 'WINTER')){
                push = false;
            }
        }
        if(excludePNP){
            if(c.grade_a_count === 0 && c.grade_b_count === 0 && c.grade_c_count === 0 && c.grade_d_count === 0 && c.grade_f_count === 0){
                push = false
            }
        }

        if(push === true){
            final.push(c);
        }
    }

    return final
}

module.exports = {classList, instructorList, filter, cumulativeData, addData, quarterYear};