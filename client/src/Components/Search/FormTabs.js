import React, { useEffect } from 'react';
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import FormTab from './FormTab';
import {AiOutlinePlus} from 'react-icons/ai'
export default function FormTabs({ currentForm, forms, setCurrentForm, removeForm, addForm }) {

    return <>
        {Object.keys(forms).map((formID) =>
            <Col lg={3} md={5} sm={12} key={formID} className="text-center">
                    <FormTab
                        formID={formID}
                        color={forms[formID].color}
                        handleSetForm={() => setCurrentForm(formID)}
                        handleCloseForm={() => removeForm(formID)}
                        showClose={Object.keys(forms).length > 1}
                        isSelected={formID === currentForm}
                        title={forms[formID].instructor !== "" ? forms[formID].instructor : "New Form "} />
            </Col>)}
            {Object.keys(forms).length <= 3? 
                    <div className="add-form-button" onClick={addForm}>
                        <AiOutlinePlus />
                    </div>
                :null}
    </>

};