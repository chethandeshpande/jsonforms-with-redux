import { connect } from 'react-redux';
import Proposal from "./Proposal";
import {Actions} from "@jsonforms/core";

const mapDispatchToProps = (dispatch) => ({
    updateUISchema: (data) => dispatch(Actions.setUISchema(data)),
    updateSchema: (data) => dispatch(Actions.setSchema(data)),
    updateData: (path,data) => dispatch(Actions.update(path,data))
})

const mapStateToProps = (state) => {
    console.log(state)
    return {
        data: state.jsonforms.core.data,
        schema: state.jsonforms.core.schema,
        uischema: state.jsonforms.core.uischema,
        errors: state.jsonforms.core.schema,
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Proposal);
  