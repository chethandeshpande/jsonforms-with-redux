import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
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
import ProposalContainer from './ProposalContainer';

const schema = {
  "type": "object",
  "properties": {
    "proposal": {
      "title": "Proposal",
      "type": "object",
      "properties": {
        "farmName": {
          "title": "Farm Name",
          "type": "string",
          "description": "Specify Farm Name"
        },
        "farmerAddress": {
          "title": "Farmer Address",
          "description": "Specify Farmer Address",
          "type": "string"
        },
        "cultivation": {
          "type": "object",
          "properties": {
            "plotSize": {
              "title": "Plot Size",
              "type": "integer"
            }
          }
        },
      },
      "required": [
        "farmName",
        "farmerAddress"
      ]
    },
    "demo": {
      "title": "Demo",
      "type": "object",
      "properties": {
        "demoName": {
          "title": "Demo Name",
          "type": "string"
        },
        "demoRegion": {
          "title": "Demo Region",
          "type": "string"
        }
      }
    }
  }
};

const wholeUiSchema = {
  "proposal": {
    "type": "Group",
    "label": "Proposal",
    "elements": [
      {
        "type": "Control",
        "label": "Farm Name",
        "scope": "#/properties/farmName"
      },
      {
        "type": "Control",
        "scope": "#/properties/farmerAddress"
      },
      {
        "type": "Group",
        "label": "Cultivation",
        "elements": [
          {
            "type": "Control",
            "scope": "#/properties/cultivation/properties/plotSize"
          }
        ]
      },
    ]
  },
  "demo": {
    "type": "Group",
    "label": "Demo",
    "elements": [
      {
        "type": "Control",
        "label": "Demo Name",
        "scope": "#/properties/demoName"
      },
      {
        "type": "Control",
        "scope": "#/properties/demo/properties/demoRegion"
      },
    ]
  }
}

const data = {
  "proposal": {},
  "demo": {}
};

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

store.dispatch(Actions.init(data, schema, wholeUiSchema));
store.dispatch(Actions.registerRenderer(fileUploadTester, FileUploadContainer));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <JsonFormsReduxContext>
        <App />
      </JsonFormsReduxContext>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
