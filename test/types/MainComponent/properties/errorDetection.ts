import { MainComponent } from '../../../../src/core/MainComponent';

/**
 * 非法字段检测
 */
MainComponent({
    properties: {
        str: {
            type: String,
            // @ts-expect-error  "非法字段 values"
            values: '123'
        },
        num: {
            // @ts-expect-error  "非法字段 types"
            types: Number,
            value: 123
        },
        bool: {
            type: Boolean,
            value: true,
            // @ts-expect-error  "非法字段 optionalType"
            optionalType: [String]
        },
        other: {
            type: Number,
            // @ts-expect-error  "非法字段 observers"
            observable: ''
        }
    }
});
