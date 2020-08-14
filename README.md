# verification-tool

A js parameter verification tool that can support type, non-empty, etc.

### Example

```
const verification = require('../lib/index').default;

const Parameter = {
  id: {
    type: verification.NUMBER,
    allowNull: false,
    required: true,
  }
}

const result = verification.perform(Parameter, {id: 'id'})
console.log(result);  //{ success: false, error: '参数错误,请检查参数是否正确！(id)' }
```

