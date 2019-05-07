// Centralized propType definitions
import {shape, number, array, object} from 'prop-types';

export const tree = shape({
  root: object
});

export const factory = shape({
    upperbound: number,
    lowerbound: number,
    children: array
  }
);
