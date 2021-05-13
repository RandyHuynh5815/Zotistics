import React from 'react';


export default function FormTab({formID, color, handleSetForm, handleCloseForm, title, showClose, isSelected}){
    return (
        <div
            style={{
                borderBottomColor: color,
                backgroundColor:isSelected?
                        "hsla(" + color.slice(4, -1) + ", 25%)"
                        : "transparent",
            }}
            className={"form-tab " + (isSelected?"selected-form-tab":"")}
            onClick={() => handleSetForm()}>
            <div
                className="close-button"
                style={showClose?null:{ display: "none" }}
                onClick={() => handleCloseForm()}>
                <a href="#">✕</a>
            </div>
            <h5 className="form-tab-header">
                {title}
            </h5>
        </div>
    );
}