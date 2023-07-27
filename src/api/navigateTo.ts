import type { IfEquals } from "hry-types/src/Any/IfEquals";
import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { NoInfer } from "hry-types/src/Generic/NoInfer";
import type { WMNavigateToOption } from "../types/officialCorrelation";
import type { RequiredKeys } from "../types/RequiredKeys";
import { INNERMARKER } from "../utils/InnerMarker";
import type { PageDoc } from "./DefineComponent/ReturnType/PageDoc";

type NavigateToOption<T extends PageDoc> =
  & {
    url: T["path"];
  }
  & IfExtends<
    unknown,
    T["properties"],
    unknown,
    IfEquals<
      RequiredKeys<NonNullable<T["properties"]>>,
      never,
      {
        data?: T["properties"];
      },
      {
        data: T["properties"];
      }
    >
  >
  & Omit<WMNavigateToOption, "url">;

/**
 *  对象中可以使用 `"; / ? : @ & = + $ `, #"做为数据的一部分
 */
function _encodeURIComponent(
  option: Omit<WMNavigateToOption, "url"> & { url: string; data: object },
): WechatMiniprogram.NavigateToOption {
  const result: WMNavigateToOption = {
    url: `${option.url}?${INNERMARKER.url}=${
      encodeURIComponent(
        JSON.stringify(option.data),
      )
    }`,
  };

  Reflect.deleteProperty(option, "url");

  Reflect.deleteProperty(option, "data");

  return Object.assign(result, option);
}

/**
 * 页面onload参数中接受的数据值是传递的url解析后的字符串。例如:A页面通过`wx.navigateTo({url:'/pages/test/test?num=123&obj={"name":"zhao"}'})`
 * test页面onLoad(data)的参数data接受内容为` data = {num:"123",obj:"{"name":"zhao"}"}`即默认的url传的数据值为字符串,需要在接收时自行解析(JSON.parse)。且url采取ASCII编码只能接受0x20-0x7e区间的符号。无法使用一些特殊符号 如 ` :/?#[]@!$&'()*+,;= `。
 * navigateTo API 为 wx.navigateTo的语法糖,增加了data字段,最终的url数据拼接了通过encodeURIComponent编码(支持默认忽略的特殊符号)的data字段,在跳转页面的onload中通过decodeURIComponent解析url赋值给实例的data对象。为求使用时更加方便(无需对参数data解析再赋值)。且有ts类型提示。
 */
export function navigateTo<TPageDoc extends PageDoc = never>(
  option: NoInfer<NavigateToOption<TPageDoc>>,
) {
  if (!option["data"]) {
    return wx.navigateTo(option);
  } else {
    return wx.navigateTo(
      _encodeURIComponent(option as NavigateToOption<TPageDoc> & { data: object }),
    );
  }
}
