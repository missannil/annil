import type { IllegalFieldValidation, PropertiesConstraint } from '../types/common';

type Options<TProperties extends object> = {
    /**
     * @description 可通过 as SpecificType<anyType> 书写任意类型,禁用observable字段,简写或无value字段为必传属性。对象写法有value字段为可选属性.必传字段若为对象类型则加入默认类型null
     */
    properties?: TProperties & IllegalFieldValidation<TProperties>;
};

interface Constructor {
    <
        Literal extends string | number | boolean | Literal[] | Record<string, Literal>,
        TProperties extends PropertiesConstraint<Literal> = {}
    >(
        options: Options<TProperties>
    ): TProperties;
}

export const MainComponent: Constructor = function (options): any {
    return options;
};
