import type { CreateComponentType } from "../../types/CreateComponentType";

type RegionChangeBegin = { type: "begin"; causedBy: "gesture" | "update" };

export type MarkLocation = { latitude: number; longitude: number };

type RegionChangeEnd = {
  type: "end";
  causedBy: "drag" | "scale" | "update";
  centerLocation: MarkLocation;
  region: { northeast: MarkLocation; southwest: MarkLocation };
  rotate: number;
  scale: number;
  skew: number;
};

type RegionChangeDetail = RegionChangeBegin | RegionChangeEnd;

export type Callout = {
  content: string;
  display: "ALWAYS" | "BYCLICK";
  color?: string;
  fontSize?: string | number;
  borderWidth?: number;
  borderRadius?: number;
  borderColor?: string;
  bgColor?: string;
  padding?: number;
  textAlign?: "center" | "left" | "right";
  /**
   * 横向偏移量，向右为正数	number	2.11.0
   */
  anchorX?: number;
  /**
   * anchorY	纵向偏移量，向下为正数 number	2.11.0
   */
  anchorYL?: number;
};

// 官方说明 https://developers.weixin.qq.com/miniprogram/dev/component/map.html#marker
export type Marker = {
  // 标记点 id  marker 点击事件回调会返回此 id
  id: number;
  // 标注图标宽度 默认为图片实际宽度
  width: number | string;
  // 标注图标高度 默认为图片实际高度
  height: number | string;
  // 聚合簇的 id 自定义点聚合簇效果时使用
  clusterId?: number;
  // 是否参与点聚合 默认不参与点聚合
  joinCluster?: boolean;
  // 纬度 浮点数，范围 -90 ~ 90
  latitude: number;
  // 经度 浮点数，范围 -180 ~ 180
  longitude: number;
  // 标注点名 点击时显示，callout 存在时将被忽略
  title?: string;
  // 显示层级 默认为 0
  zIndex?: number;
  // 显示的图标 项目目录下的图片路径，支持网络路径、本地路径、代码包路径（2.3.0）
  iconPath: string;
  // 旋转角度 顺时针旋转的角度，范围 0 ~ 360，默认为 0
  rotate?: number;
  // 标注的透明度 默认 1，无透明，范围 0 ~ 1
  alpha?: number;
  // 标记点上方的气泡窗口 支持的属性见下表，可识别换行符
  callout?: Callout;
  // 自定义气泡窗口 支持的属性见下表
  customCallout?: Callout;
  // 为标记点旁边增加标签 支持的属性见下表，可识别换行符
  label?: Callout;
  // 经纬度在标注图标的锚点，默认底边中点
  anchor?: { x: number; y: number };
  // 无障碍访问，（属性）元素的额外描述
  ariaLabel?: string;
  // 碰撞关系 详见下表碰撞关系	3.4.3
  collisionRelation?: string;
  // 碰撞类型 详见下表碰撞关系	3.4.3
  collision?: string;
};

export type Circle = {
  // 纬度	number	是	浮点数，范围 -90 ~ 90
  latitude: number;
  // 经度	number	是	浮点数，范围 -180 ~ 180
  longitude: number;
  // 半径	number	是
  radius: number;
  // 描边的颜色	string	否	十六进制
  color?: string;
  // 填充颜色	string	否	十六进制
  fillColor?: string;
  // 描边的宽度	number	否
  strokeWidth?: number;
  // 压盖关系	string	否	默认为 abovelabels
  level?: string;
};

export type Polygon = {
  // 边线虚线	Array<number>	否	默认值 [0, 0] 为实线，[10, 10]表示十个像素的实线和十个像素的空白（如此反复）组成的虚线	2.22.0
  dashArray?: number[];
  // 经纬度数组	array	是	[{latitude: 0, longitude: 0}]	2.3.0
  points: MarkLocation[];
  // 描边的宽度	number	否		2.3.0
  strokeWidth?: number;
  // 描边的颜色	string	否	十六进制	2.3.0
  strokeColor?: string;
  // 填充颜色	string	否	十六进制
  fillColor?: string;
  // 设置多边形 Z 轴数值	number	否		2.3.0
  zIndex?: number;
  // 压盖关系	string	否	默认为 abovelabels	2.14.0
  level?: string;
};

export type Polyline = {
  // 经纬度数组	array
  points: MarkLocation[];
  // 线的颜色	string	否	十六进制
  color?: string;
  // 彩虹线	array	否	存在时忽略 color 值	2.13.0
  colorList?: string[];
  // 线的宽度	number	否
  width?: number;
  // 是否虚线	boolean	否	默认 false
  dottedLine?: boolean;
  // 带箭头的线	boolean	否	默认 false，开发者工具暂不支持该属性	1.2.0
  arrowLine?: boolean;
  // 更换箭头图标	string	否	在 arrowLine 为 true 时生效	1.6.0
  arrowIconPath?: string;
  // 线的边框颜色	string	否		1.2.0
  borderColor?: string;
  // 线的厚度	number	否		1.2.0
  borderWidth?: number;
  // 压盖关系	string	否	默认为 abovelabels	2.14.0
  level?: string;
  // 文字样式	TextStyle	否	折线上文本样式	2.22.0
  textStyle?: TextStyle;
  // 分段文本	Array<SegmentText>	否	折线上文本内容和位置	2.22.0
  segmentTexts?: SegmentText[];
};

export type TextStyle = {
  // 文本颜色	string	否	#000000
  textColor?: string;
  // 描边颜色	string	否	#ffffff
  strokeColor?: string;
  // 文本大小	number	否	14
  fontSize?: number;
};

export type SegmentText = {
  // 名称	string	默认''
  name: string;
  // 起点	number
  startIndex: string;
  // 终点	number
  endIndex: number;
};

// 源自 https://developers.weixin.qq.com/miniprogram/dev/component/map.html#%E5%B1%9E%E6%80%A7%E8%AF%B4%E6%98%8E
export type Map = CreateComponentType<"map", {
  properties: {
    // 中心经度 1.0.0
    latitude: number;
    // 中心纬度 1.0.0
    longitude: number;
    // 缩放级别，取值范围为3-20 1.0.0
    scale?: number;
    // 最小缩放级别 2.13.0
    minScale?: number;
    // 最大缩放级别 2.13.0
    maxScale?: number;
    // 标记点 1.0.0
    markers?: Marker[];
    // 即将移除，请使用 markers 1.0.0
    covers?: Marker[];
    // 路线  1.0.0
    polyline?: Polyline[];
    // 圆 1.0.0
    circles?: Circle[];
    // 控件（即将废弃，建议使用 cover-view 代替） 1.0.0
    controls?: Marker[];
    // 缩放视野以包含所有给定的坐标点 1.0.0
    includePoints?: Marker[];
    /**
     * 显示带有方向的当前定位点 1.0.0
     */
    showLocation?: boolean;
    // 多边形 2.3.0
    polygons?: Polygon[];
    // 地图能力【个性化地图】使用的key，不支持动态修改 2.3.0
    subkey?: string;
    // 地图能力【个性化地图】配置的 style
    layerStyle?: number;
    // 旋转角度，范围 0 ~ 360, 地图正北和设备 y 轴角度的夹角 2.5.0
    rotate?: number;
    // 倾斜角度，范围 0 ~ 40 , 关于 z 轴的倾角 2.5.0
    skew?: number;
    // 展示3D楼块 2.3.0
    enable3D?: boolean;
    // 显示指南针 2.3.0
    showCompass?: boolean;
    // 显示比例尺，工具暂不支持 2.8.0
    showScale?: boolean;
    // 开启俯视 2.3.0
    enableOverlooking?: boolean;
    // 开启最大俯视角，俯视角度从 45 度拓展到 75 度 2.26.0
    enableAutoMaxOverlooking?: boolean;
    // 是否支持缩放 2.3.0
    enableZoom?: boolean;
    // 是否支持拖动 2.3.0
    enableScroll?: boolean;
    // 是否支持旋转 2.3.0
    enableRotate?: boolean;
    // 是否开启卫星图 2.7.0
    enableSatellite?: boolean;
    // 是否开启实时路况 2.7.0
    enableTraffic?: boolean;
    // 是否展示 POI 点 2.14.0
    enablePOI?: boolean;
    // 是否展示建筑物 2.14.0
    enableBuilding?: boolean;
    // 配置项 2.8.2
    setting?: object;
  };
  customEvents: {
    // 点击地图时触发，2.9.0起返回经纬度信息 1.0.0
    tap: MarkLocation;
    // 点击标记点时触发，e.detail = {markerId} 1.0.0
    markertap: { markerId: number };
    // 点击label时触发，e.detail = {markerId} 2.9.0
    labeltap: { markerId: number };
    // 点击控件时触发，e.detail = {controlId} 1.0.0
    controltap: { controlId: number };
    // 点击标记点对应的气泡时触发e.detail = {markerId} 1.2.0
    callouttap: { markerId: number };
    // 在地图渲染更新完成时触发 1.6.0
    updated: undefined;
    /**
     * 视野改变时，regionchange 会触发两次，返回的 type 值分别为 begin 和 end。
     * 2.8.0 起 begin 阶段返回 causedBy，有效值为 gesture(手势触发) & update(接口触发)
     * 2.3.0 起 end 阶段返回 causedBy，有效值为 drag(拖动导致)、scale(缩放导致)、update(调用更新接口导致)
     */
    regionchange: RegionChangeDetail;
    // 点击地图poi点时触发，e.detail = {name, longitude, latitude} 2.3.0
    poitap: { name: string; longitude: number; latitude: number };
    // 点击地图路线时触发，e.detail = {longitude, latitude} 3.1.0
    polylinetap: { longitude: number; latitude: number };
    // 地图能力生效时触发，e.detail = {ability, errCode, errMsg}
    abilitysuccess: { ability: string; errCode: number; errMsg: string };
    // 地图能力失败时触发，e.detail = {ability, errCode, errMsg}
    abilityfail: { ability: string; errCode: number; errMsg: string };
    // 地图鉴权结果成功时触发，e.detail = {errCode, errMsg}
    authsuccess: { errCode: number; errMsg: string };
    // MapContext.moveAlong 插值动画时触发。e.detail = {markerId, longitude, latitude, animationStatus: "interpolating" | "complete"}, 3.1.0
    interpolatepoint: {
      markerId: number;
      longitude: number;
      latitude: number;
      animationStatus: "interpolating" | "complete";
    };
    // 组件错误时触发，例如创建或鉴权失败，e.detail = {longitude, latitude}
    error: { longitude: number; latitude: number };
  };
}>;
