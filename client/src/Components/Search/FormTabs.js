import React, { useEffect } from 'react';
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import FormTab from './FormTab';
import {AiOutlinePlus} from 'react-icons/ai'
export default function FormTabs({ currentForm, forms, setCurrentForm, removeForm, addForm }) {
    
    return <>
        <Row className="justify-content-center">
        {Object.keys(forms).map((formID) =>
            <Col md={3} key={formID} className="text-center">
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
                    <Col m="auto">
                    <div className="add-form-button" onClick={addForm}>
                        <AiOutlinePlus />
                    </div>
                    </Col>
                :null}
                </Row>
    </>

};