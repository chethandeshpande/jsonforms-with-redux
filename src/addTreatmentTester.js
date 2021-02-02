import {rankWith, scopeEndsWith, uiTypeIs,isBooleanControl} from '@jsonforms/core';

export default rankWith(
    5, //increase rank as needed
    isBooleanControl
);
