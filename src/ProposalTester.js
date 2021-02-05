import { rankWith, scopeEndsWith, isBooleanControl } from '@jsonforms/core';

export default rankWith(
  3, //increase rank as needed
    scopeEndsWith('crop')
);