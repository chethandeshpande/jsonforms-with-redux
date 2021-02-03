import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './AppContainer';
import reportWebVitals from './reportWebVitals';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';

import { Actions, jsonformsReducer } from '@jsonforms/core';
import {
  materialRenderers,
  materialCells
} from '@jsonforms/material-renderers';
import { JsonFormsReduxContext } from '@jsonforms/react';
import { composeWithDevTools } from "redux-devtools-extension";
import fileUploadTester from './fileUploadTester';
import FileUploadContainer from './FileUploadContainer';
import fileUploadReducer from "./fileUploadReducer";
import AddTreatmentContainer from "./AddTreatmentContainer";
import addTreatmentTester from "./addTreatmentTester";
import AddTreatment from "./AddTreatment";

import FileUpload from "./FileUpload";
import ProposalContainer from "./ProposalContainer";
import ProposalTester from "./ProposalTester";
import Proposal from "./Proposal";
const schema ={
  "type": "object",
  "properties": {
    "comments": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
          },
          "unitType": {
            "type": "string",
            "enum": [
             "string",
             "integer"
            ]
          },
        }
      }
    },

    "feedback":{
      type: "string",
    }
  }
};


const uischema = {
  "type": "VerticalLayout",
  "elements": [
    {
      "type": "Control",
      "scope": "#/properties/comments"
    },
    {
      "type": "Control",
      "scope": "#/properties/feedback"
    }
  ]
}

const data = {
  "comments": []
}

const store = createStore(
  combineReducers({ jsonforms: jsonformsReducer(), fileUploadReducer }),
  {
    jsonforms: {
      cells: materialCells,
      renderers: materialRenderers
    }
  },
  composeWithDevTools()
);

store.dispatch(Actions.init(data, schema, uischema));
store.dispatch(Actions.registerRenderer(fileUploadTester, FileUploadContainer));
store.dispatch(Actions.registerRenderer(addTreatmentTester, AddTreatmentContainer));
store.dispatch(Actions.registerRenderer(ProposalTester, ProposalContainer));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <JsonFormsReduxContext>
        <ProposalContainer />
      </JsonFormsReduxContext>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
