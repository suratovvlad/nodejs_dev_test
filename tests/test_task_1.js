'use strict';
const mocha = require('mocha');
const describe = mocha.describe;
const it = mocha.it;
const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
require('println');

const task1 = require("../task1.js");

describe("Test distributions", () => {
    describe("Test discrete (many points) distribution", () => {
        const input = {
            type: task1.DISTRIBUTION_TYPE.DISCRETE,
            probability: 1,
            data: [{
                point: 1,
                probability: 0.4
            }, {
                point: 2,
                probability: 0.5
            }, {
                point: 3,
                probability: 0.1
            }]
        };
        it("Testing...", () => {
            const output = task1.get_sample(input);
            output.println();
            output.should.be.not.lessThan(1);
            output.should.be.not.greaterThan(3);
        });
    });

    describe("Test discrete (one point) distribution", () => {
        const input = {
            type: task1.DISTRIBUTION_TYPE.DISCRETE,
            probability: 1,
            data: [{
                point: 0,
                probability: 1
            }]
        };
        it("Testing...", () => {
            const output = task1.get_sample(input);
            output.println();
            output.should.be.not.lessThan(0);
            output.should.be.not.greaterThan(1);
        });
    });

    describe("Test uniform distribution", () => {
        const input = {
            type: task1.DISTRIBUTION_TYPE.UNIFORM,
            bounds: {
                left: 2,
                right: 5
            },
            probability: 1
        };
        it("Testing...", () => {
            const output = task1.get_sample(input);
            output.println();
            output.should.be.not.lessThan(input['bounds']['left']);
            output.should.be.not.greaterThan(input['bounds']['right']);
        });
    });

    describe("Test normal distribution", () => {
        const input = {
            type: task1.DISTRIBUTION_TYPE.NORMAL,
            bounds: {
                left: 0.5,
                right: 1.5
            },
            probability: 1,
            expected_value: 1,
            variance: 0.3
        };
        it("Testing...", () => {
            const output = task1.get_sample(input);
            output.println();
            output.should.be.not.lessThan(input['bounds']['left']);
            output.should.be.not.greaterThan(input['bounds']['right']);
        });
    });

    describe("Test exponential distribution", () => {
        const input = {
            type: task1.DISTRIBUTION_TYPE.EXPONENTIAL,
            probability: 1,
            rate: 0.3
        };
        it("Testing...", () => {
            const output = task1.get_sample(input);
            output.println();
            output.should.be.greaterThan(0);
        });
    });


    describe("Test combined distribution", () => {
        const input = {
            type: task1.DISTRIBUTION_TYPE.COMBINED,
            bounds: {
                left: 0,
                right: 7
            },
            probability: 1,
            data: [
                {
                    type: task1.DISTRIBUTION_TYPE.DISCRETE,
                    probability: 0.7,
                    data: [{
                        point: 0,
                        probability: 1
                    }]
                },
                {
                    type: task1.DISTRIBUTION_TYPE.NORMAL,
                    bounds: {
                        left: 0.5,
                        right: 1.5
                    },
                    probability: 0.25,
                    expected_value: 1,
                    variance: 0.3
                },
                {
                    type: task1.DISTRIBUTION_TYPE.UNIFORM,
                    bounds: {
                        left: 2,
                        right: 5
                    },
                    probability: 0.05
                }
            ]
        };
        it("Testing...", () => {
            const output = task1.get_sample(input);
            output.println();
            output.should.be.not.lessThan(0);
            //output.should.be.not.greaterThan(1);
        });
    });

    describe("Test nested combined distribution", () => {
        const input = {
            type: task1.DISTRIBUTION_TYPE.COMBINED,
            probability: 1,
            data: [
                {
                    type: task1.DISTRIBUTION_TYPE.EXPONENTIAL,
                    probability: 0.1,
                    rate: 0.3
                },
                {
                    type: task1.DISTRIBUTION_TYPE.COMBINED,
                    probability: 0.9,
                    data: [
                        {
                            type: task1.DISTRIBUTION_TYPE.NORMAL,
                            bounds: {
                                left: 0.5,
                                right: 1.5
                            },
                            probability: 0.25,
                            expected_value: 1,
                            variance: 0.3
                        }, {
                            type: task1.DISTRIBUTION_TYPE.COMBINED,
                            probability: 0.75,
                            data: [
                                {
                                    type: task1.DISTRIBUTION_TYPE.UNIFORM,
                                    bounds: {
                                        left: 2,
                                        right: 5
                                    },
                                    probability: 0.05
                                }, {
                                    type: task1.DISTRIBUTION_TYPE.DISCRETE,
                                    probability: 0.95,
                                    data: [{
                                        point: 6,
                                        probability: 0.4
                                    }, {
                                        point: 7,
                                        probability: 0.5
                                    }, {
                                        point: 8,
                                        probability: 0.1
                                    }]
                                }
                            ]
                        }
                    ]
                }
            ]
        };
        it("Testing...", () => {
            const output = task1.get_sample(input);
            output.println();
            output.should.be.not.lessThan(0);
            //output.should.be.not.greaterThan(1);
        });
    });
});
