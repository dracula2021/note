#### echarts的学习笔记
1. 通过echrts.init方法初始化一个echarts实例并通过setoption方法生成一个简单的图表。
2. v5做的比较大的修改
    + echarts5去掉了 default exports
    + 新增了按需引入
    + v5溢出了内置的geoJson,不再支持ie8浏览器。
3. echarts的基本概念
   + series 一组数值已经他们映射成的图。
      1. 一个系列里面包含的要素至少有：一组数据，图表类型，以及其他的关于这些数据如何映射成图的参数。
      2. 类似的，系列的数据从dataset中获取。encode来设置对应的数据。
   + 组件
      + xAxis（直角坐标系 X 轴）、yAxis（直角坐标系 Y 轴）、grid（直角坐标系底板）、angleAxis（极坐标系角度轴）、radiusAxis（极坐标系半径轴）、polar（极坐标系底板）、geo（地理坐标系）、dataZoom（数据区缩放组件）、visualMap（视觉映射组件）、tooltip（提示框组件）、toolbox（工具栏组件）、series（系列）
      + 其实系列（series）也是一种组件，可以理解为：系列是专门绘制“图”的组件。
      + 组件的定位
        + 绝对数值，或者百分比（基于echarts容器宽度的百分比）
      + 两个 series，也共享了这个 xAxis，但是分别使用不同的 yAxis，使用 yAxisIndex 来指定它自己使用的是哪个 yAxis
4. echarts中的样式简介
   + 有以下几种方法
      1. 颜色主体
         + echarts4开始，除了一贯的默认主题外，新内置了两套主题，分别为light和dark
         ```
            var chart = echarts.init(dom, 'dark');
         ```
      2. 调色盘: 给定一组颜色，图形，系列会自动从其中选择颜色，可以设置全局的调色板，也可设置系列专属的调色板
      ```
        option = {
        // 全局调色盘。
        color: ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],

        series: [{
            type: 'bar',
            // 此系列自己的调色盘。
            color: ['#dd6b66','#759aa0','#e69d87','#8dc1a9','#ea7e53','#eedd78','#73a373','#73b9bc','#7289ab', '#91ca8c','#f49f42'],
            ...
        }, {
            type: 'pie',
            // 此系列自己的调色盘。
            color: ['#37A2DA', '#32C5E9', '#67E0E3', '#9FE6B8', '#FFDB5C','#ff9f7f', '#fb7293', '#E062AE', '#E690D1', '#e7bcf3', '#9d96f5', '#8378EA', '#96BFFF'],
                    ...
                }]
            }
      ```
       3. 直接样式设置
          + 很多地方可以设置 itemStyle、lineStyle、areaStyle、label 等等。这些的地方可以直接设置图形元素的颜色、线宽、点的大小、标签的文字、标签的样式等等。
       4. 视觉映射
5. ECharts 4 提供了 数据集（dataset）组件来单独声明数据
   + 用 dimensions 指定了维度的顺序。直角坐标系中，
         默认把第一个维度映射到 X 轴上，第二个维度映射到 Y 轴上。
         如果不指定 dimensions，也可以通过指定 series.encode
         完成映射，
    + 数据到图形的映射（series.encode)
6. ECharts提供了很多交互组件
    + 图例组件 legend、标题组件 title、视觉映射组件 visualMap、数据区域缩放组件 dataZoom、时间线组件 timeline

