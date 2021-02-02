import React from "react";
import Button from "@material-ui/core/Button";
import {withJsonFormsControlProps} from "@jsonforms/react";

export default withJsonFormsControlProps((props) => {
    const { addTreatment,handleChange,uischema,schema, data } = props;

    return <div hidden={!!data}>
        <Button  onClick={() => {
            addTreatment(props.path, () => true) }}>Add treatment</Button>
    </div>
})
