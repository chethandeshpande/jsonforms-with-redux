import { connect } from 'react-redux';
import FileUpload from './FileUpload';
import {Actions} from "@jsonforms/core";

const mapDispatchToProps = (dispatch) => ({
    addSize: () => dispatch({type: "ADD_SIZE"}),
    updateUISchema: (data) => dispatch(Actions.setUISchema(data)),
    updateSchema: (data) => dispatch(Actions.setSchema(data)),
    updateData: (path,data) => dispatch(Actions.update(path,data))
})

const mapStateToProps  = (state) =>{
    return {
        uischema1: state.jsonforms.core.uischema,
        schema1: state.jsonforms.core.schema
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(FileUpload);
