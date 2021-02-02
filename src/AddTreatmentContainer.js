import { connect } from 'react-redux';
import AddTreatment from './AddTreatment';
import {Actions} from "@jsonforms/core";

const mapDispatchToProps = (dispatch) => ({
    addTreatment: (path,data) => dispatch(Actions.update(path,data))
})

const mapStateToProps  = (state) => {}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddTreatment);
