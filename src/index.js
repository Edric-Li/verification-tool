/**
 * Simple parameter validation tool.
 */
import _ from 'lodash'

const NUMBER = /^[-+]?\d+$|^[-+]?\d+.\d+$/;

function perform(options, value) {
  const r = initiation(options, value);
  if (!r.success) {
    console.error('Parameter error', r.abnormal);
    return {
      success: false,
      error: `参数错误,请检查参数是否正确！(${Object.keys(r.abnormal).toString()})`
    };
  }
  return {success: true}
}

function initiation(options, value) {
  const abnormal = {};
  _.forEach(options, (o, k) => {
    const temp = value && value[k];
    if ('required' in o && !o.required && !temp) {
      return;
    }
    if (!temp) {
      abnormal[k] = 'undefined';
      return;
    }
    if ('type' in o) {
      if (o.type === 'array') {
        if (!isArray(temp)) {
          abnormal[k] = `Expect to be a ${o.type}`;
        }
      } else if (o.type === 'number') {
        if (!isNumber(temp)) {
          abnormal[k] = `Expect to be a ${o.type}`;
        }
        // eslint-disable-next-line valid-typeof
      } else if (typeof (temp) !== o.type) {
        abnormal[k] = `Expect to be a ${o.type}`;
      }
    }

    if ('allowNull' in o && o.allowNull) {
      if (!temp) {
        abnormal[k] = 'Can\'t be empty';
      }
    }
  });
  return Object.keys(abnormal).length > 0 ? {success: false, abnormal} : {success: true};
}

function isNumber(num) {
  return num && new RegExp(NUMBER).test(num);
}

function isArray(arr) {
  return Array.isArray(arr);
}

const verification = {
  STRING: 'string',
  NUMBER: 'number',
  BOOLEAN: 'boolean',
  FUNCTION: 'function',
  SYMBOL: 'symbol',
  OBJECT: 'object',
  ARRAY: 'array',
  initiation,
  perform,
  isNumber,
  isArray
}

export default verification;
