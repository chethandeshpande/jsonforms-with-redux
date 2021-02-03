import { rankWith, scopeEndsWith, isBooleanControl } from '@jsonforms/core';

export default rankWith(
  9, //increase rank as needed
    scopeEndsWith('delete me')
);