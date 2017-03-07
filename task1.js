'use strict';
const jStat = require('jStat').jStat;
require('println');

// Get random between 0 and 1
const getRandom = function () {
    return Math.random();
};

const DISTRIBUTION_TYPE = {
    DISCRETE: {value: 0, name: "Discrete", code: "D"},
    UNIFORM: {value: 1, name: "Uniform", code: "U"},
    NORMAL: {value: 2, name: "Normal", code: "N"},
    EXPONENTIAL: {value: 3, name: "Exponential", code: "E"},
    COMBINED: {value: 4, name: "Combined", code: "C"}
};

const discrete_routine = function (distr) {
    distr['type'].name.println();
    const data = distr['data'];

    // We are completely sure in following:
    // 1) p1 + p2 + ... + pn = 1
    // 2) we can add the next pk to older,
    //    to make p-line divided by probabilities
    let p_line = [0];
    data.forEach((point) => {
        p_line.push(p_line[p_line.length - 1] + point['probability']);
    });
    //p_line.println();

    // Get Random
    const generated_rand = getRandom();
    generated_rand.println();

    // Check what is the distribution by Monte-Carlo Method
    let choosen_point_index = 0;
    for (let i = 0; i < p_line.length; ++i) {
        if (generated_rand > p_line[i]) {
            continue;
        } else {
            choosen_point_index = i - 1;
            //p_line[i].println();
            break;
        }
    }

    return data[choosen_point_index]['point'];
};

const uniform_routine = function (distr) {
    distr['type'].name.println();
    return jStat.uniform.sample(distr['bounds']['left'], distr['bounds']['right']);
};

const normal_routine = function (distr) {
    distr['type'].name.println();
    do
    {
        let sample = jStat.normal.sample(distr['expected_value'], distr['variance']);
        if ((sample >= distr['bounds']['left']) && (sample <= distr['bounds']['right'])) {

            return sample;
        }

    } while (true);
};

const exponential_routine = function (distr) {
    distr['type'].name.println();
    return jStat.exponential.sample(distr['rate']);
};

const combine_routine = function (distr) {

    distr['type'].name.println();
    const data = distr['data'];

    // We are completely sure in following:
    // 1) p1 + p2 + ... + pn = 1
    // 2) we can add the next pk to older,
    //    to make p-line divided by probabilities
    let p_line = [0];
    data.forEach((distr) => {
        p_line.push(p_line[p_line.length - 1] + distr['probability']);
    });
    //p_line.println();

    // Get Random
    const generated_rand = getRandom();
    generated_rand.println();

    // Check what is the distribution by Monte-Carlo Method
    let choosen_distr_index = 0;
    for (let i = 0; i < p_line.length; ++i) {
        if (generated_rand > p_line[i]) {
            continue;
        } else {
            choosen_distr_index = i - 1;
            //p_line[i].println();
            break;
        }
    }

    const choosen_distr = data[choosen_distr_index];
    return distribution_routine(choosen_distr);
};

const distribution_routine = function (distr) {

    let sample = 0;

    switch (distr['type']) {
        case DISTRIBUTION_TYPE.COMBINED:
            // We are completely sure that probability = 1
            sample = combine_routine(distr);
            break;
        case DISTRIBUTION_TYPE.DISCRETE:
            sample = discrete_routine(distr);
            break;
        case DISTRIBUTION_TYPE.UNIFORM:
            sample = uniform_routine(distr);
            break;
        case DISTRIBUTION_TYPE.NORMAL:
            sample = normal_routine(distr);
            break;
        case DISTRIBUTION_TYPE.EXPONENTIAL:
            sample = exponential_routine(distr);
            break;
        default:
            "Not supported distribution".println();
            break;
    }
    return sample;
};

const task1 = function (distr) {
    return distribution_routine(distr);
};

module.exports.DISTRIBUTION_TYPE = DISTRIBUTION_TYPE;
module.exports.get_sample = task1;