import React from 'react';
import PropTypes from 'prop-types';
import {UNITS_LENGTH, UNIT_CENTIMETER, UNIT_MILLIMETER} from './../../constants';
import convert from 'convert-units';
import { FormLabel, FormNumberInput, FormSelect } from '../../components/style/export';
import {Map} from 'immutable';
import {toFixedFloat} from '../../utils/math';
import PropertyStyle from './shared-property-style';

const internalTableStyle = {borderCollapse: 'collapse'};
const secondTdStyle = {padding: 0};
const unitContainerStyle = {width: '5em'};

export default function PropertyLengthMeasure({value, onUpdate, onValid, configs, sourceElement, internalState, state}, {catalog}) {

  let length = value.get('length') || 0;
  let _length = (value.get('_length') || length) * 10;
  let _unit = value.get('_unit') || UNIT_MILLIMETER;
  let { hook, label, ...configRest} = configs;

  let update = (lengthInput, unitInput) => {

    let newLength = toFixedFloat(lengthInput);
    let merged = value.merge({
      length: unitInput !== UNIT_MILLIMETER ? convert(newLength).from(unitInput).to(UNIT_MILLIMETER) : newLength,
      _length: lengthInput,
      _unit: unitInput
    });

    if (hook) {
      return hook(merged, sourceElement, internalState, state).then(val => {
        return onUpdate(val);
      });
    }

    return onUpdate(merged);
  };

  return (
    <table className="PropertyLengthMeasure" style={PropertyStyle.tableStyle}>
      <tbody>
      <tr>
        <td style={PropertyStyle.firstTdStyle}><FormLabel>{label}</FormLabel></td>
        <td style={secondTdStyle}>
          <table style={internalTableStyle}>
            <tbody>
            <tr>
              <td>
                <FormNumberInput
                  value={_length}
                  onChange={event => update(parseFloat(event.target.value) / 10, _unit)}
                  onValid={onValid}
                  {...configRest}
                />
              </td>
              <td style={unitContainerStyle}>
                <span className="unitStyle">mm</span>
                {/* <FormSelect value={_unit} onChange={event => {
                  // update(_length, event.target.value)
                  }
                }>
                  {
                    // UNITS_LENGTH.map(el => <option key={mm} value={el}>{el}</option>)
                    <option value="mm">mm</option>
                  }
                </FormSelect> */}
              </td>
            </tr>
            </tbody>
          </table>
        </td>
      </tr>
      </tbody>
    </table>
  );

}

PropertyLengthMeasure.propTypes = {
  value: PropTypes.instanceOf(Map).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onValid: PropTypes.func,
  configs: PropTypes.object.isRequired,
  sourceElement: PropTypes.object,
  internalState: PropTypes.object,
  state: PropTypes.object.isRequired
};

PropertyLengthMeasure.contextTypes = {
  catalog: PropTypes.object.isRequired
};
