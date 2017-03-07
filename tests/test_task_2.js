'use strict';
const mocha = require('mocha');
const describe = mocha.describe;
const it = mocha.it;
const chai = require('chai');
const expect = chai.expect;
const should = chai.should();

const fu = require("../task2.js");

const testing_base_function = function (input, output, expectation) {
    // Check objects fields
    expect(Object.keys(output)).to.deep.equal(Object.keys(expectation));
    // Check fields values
    Object.keys(output).forEach((key) => {
        // Check sizes of arrays (array is the value of certain field)
        expect(output[key].length).to.deep.equal(expectation[key].length);
        // Check arrays equality without order checking
        output[key].should.have.deep.members(expectation[key]);
    });
};

describe("Testing lines with lengths = 1", () => {
    describe("Testing for number '0'", () => {
        it("testing...", () => {
            const input = [[0], [0], [0]];
            const output = fu(input);
            const expected = {
                0: [[0, 0, 0]]
            };
            testing_base_function(input, output, expected);
        });
    });
    describe("Testing for number '1'", () => {
        it("testing...", () => {
            const input = [[1], [1], [1]];
            const output = fu(input);
            const expected = {
                8: [[0, 0, 0]]
            };
            testing_base_function(input, output, expected);
        });
    });
    describe("Testing for number '2'", () => {
        it("testing...", () => {
            const input = [[2], [2], [2]];
            const output = fu(input);
            const expected = {
                16: [[0, 0, 0]]
            };
            testing_base_function(input, output, expected);
        });
    });
    describe("Testing for number '3'", () => {
        it("testing...", () => {
            const input = [[3], [3], [3]];
            const output = fu(input);
            const expected = {
                24: [[0, 0, 0]]
            };
            testing_base_function(input, output, expected);
        });
    });
    describe("Testing for number '4'", () => {
        it("testing...", () => {
            const input = [[4], [4], [4]];
            const output = fu(input);
            const expected = {
                32: [[0, 0, 0]]
            };
            testing_base_function(input, output, expected);
        });
    });
    describe("Testing for number '9'", () => {
        it("testing...", () => {
            const input = [[9], [9], [9]];
            const output = fu(input);
            const expected = {
                72: [[0, 0, 0]]
            };
            testing_base_function(input, output, expected);
        });
    });
});

describe("Testing lines with lengths = 2", () => {
    describe("Testing for pattern [0, 1]", () => {
        it("testing...", () => {
            const input = [
                [0, 1],
                [0, 1],
                [0, 1]
            ];
            const output = fu(input);
            const expected = {
                0: [[0, 0, 1], [0, 1, 0], [0, 1, 1], [1, 0, 0], [1, 1, 0]],
                1: [[0, 0, 0]],
                2: [[1, 1, 1], [1, 0, 1]]
            };

            testing_base_function(input, output, expected);
        });
    });
    describe("Testing for pattern [2, 7]", () => {
        it("testing...", () => {
            const input = [
                [2, 7],
                [2, 7],
                [2, 7]
            ];
            const output = fu(input);
            const expected = {
                0: [[0, 0, 1], [0, 1, 1], [1, 0, 0], [1, 1, 0]],
                4: [[0, 1, 0]],
                11: [[0, 0, 0]],
                14: [[1, 0, 1]],
                16: [[1, 1, 1]]
            };

            testing_base_function(input, output, expected);
        });
    });
});

describe("Testing lines with lengths >= 2", () => {
    describe("Testing for pattern [0, 1]", () => {
        it("testing...", () => {
            const input = [
                [1, 5, 8],
                [5, 8, 1],
                [8, 1, 5]
            ];
            const output = fu(input);
            const expected = {
                0: [[0, 0, 1], [0, 0, 2], [0, 1, 0], [0, 1, 1], [0, 2, 0], [0, 2, 2], [1, 0, 0], [1, 0, 1], [1, 1, 0], [1, 1, 2], [1, 2, 1], [1, 2, 2], [2, 0, 0], [2, 0, 2], [2, 1, 1], [2, 1, 2], [2, 2, 0], [2, 2, 1]],
                1: [[0, 1, 2], [1, 1, 1]],
                5: [[1, 2, 0], [2, 2, 2]],
                8: [[0, 0, 0], [2, 0, 1]],
                14: [[0, 2, 1], [1, 0, 2], [2, 1, 0]]
            };

            testing_base_function(input, output, expected);
        });
    });
});




