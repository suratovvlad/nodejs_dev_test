'use strict';

const get_element_position = function (line_number, add_position, offsets, input_lines) {
    // Get right position in line
    let position_number = offsets[line_number] + add_position;
    if (position_number >= input_lines[line_number].length) {
        position_number -= input_lines[line_number].length;
    }
    if (position_number >= input_lines[line_number].length) {
        position_number -= input_lines[line_number].length;
    }
    return position_number;
};

const get_element_of_field_line = function (row_index, column_index, offsets, input_lines) {
    const element_position = get_element_position(row_index, column_index, offsets, input_lines);
    return input_lines[row_index][element_position];
};

const fu = function (input_lines) {

    let result = {};

    for (let i = 0; i < input_lines[0].length; ++i) {
        for (let j = 0; j < input_lines[1].length; ++j) {
            for (let k = 0; k < input_lines[2].length; ++k) {
                const  offsets = [i, j, k];

                let a11 = get_element_of_field_line(0, 0, offsets, input_lines); //get element of the first line
                let a12 = get_element_of_field_line(1, 0, offsets, input_lines); //get element of the second line
                let a13 = get_element_of_field_line(2, 0, offsets, input_lines); //get element of the third line

                let a21 = get_element_of_field_line(0, 1, offsets, input_lines);
                let a22 = get_element_of_field_line(1, 1, offsets, input_lines);
                let a23 = get_element_of_field_line(2, 1, offsets, input_lines);

                let a31 = get_element_of_field_line(0, 2, offsets, input_lines);
                let a32 = get_element_of_field_line(1, 2, offsets, input_lines);
                let a33 = get_element_of_field_line(2, 2, offsets, input_lines);

                let temp_matrix_sum = 0;
                {
                    // check first horizontal line
                    if ((a11 === a12) && (a11 === a13)) {
                        temp_matrix_sum += a11;
                    }
                    // check second horizontal line
                    if ((a21 === a22) && (a21 === a23)) {
                        temp_matrix_sum += a21;
                    }
                    // check third horizontal line
                    if ((a31 === a32) && (a31 === a33)) {
                        temp_matrix_sum += a31;
                    }
                }
                {
                    // check first vertical line
                    if ((a11 === a21) && (a11 === a31)) {
                        temp_matrix_sum += a11;
                    }
                    // check second vertical line
                    if ((a12 === a22) && (a12 === a32)) {
                        temp_matrix_sum += a12;
                    }
                    // check third vertical line
                    if ((a13 === a23) && (a13 === a33)) {
                        temp_matrix_sum += a13;
                    }
                }
                {
                    // check main diagonal line
                    if ((a11 === a22) && (a11 === a33)) {
                        temp_matrix_sum += a11;
                    }
                }
                {
                    // check non-main diagonal line
                    if ((a13 === a22) && (a13 === a31)) {
                        temp_matrix_sum += a13;
                    }
                }

                if (!result.hasOwnProperty(temp_matrix_sum)) {
                    result[temp_matrix_sum] = [];
                }
                result[temp_matrix_sum].push(offsets);
            }
        }
    }

    return result;
};

module.exports = fu;