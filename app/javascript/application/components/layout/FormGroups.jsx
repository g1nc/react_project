import React from 'react'
import PropTypes from 'prop-types'
import MaskedInput from 'react-maskedinput'
import {FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap'

export const FieldGroup = ({ id, label, help, collection, ...props }) => (
    <FormGroup controlId={id}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl {...props}>
            {collection && collection.map((object) =>
                <option key={object.id} value={object.id}>{object.name}</option>
            )}
        </FormControl>
        {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
);

FieldGroup.propTypes = {
    id:    PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
};

export const MaskedGroup = ({ id, label, help, mask = '+7 (111) 111-11-11', ...props }) => {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <MaskedInput {...props} mask={mask} type="text" className={'form-control'} />
            {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
};

MaskedGroup.propTypes = {
    id:    PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
};