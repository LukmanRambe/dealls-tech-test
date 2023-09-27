import { useEffect } from 'react';

import * as am5 from '@amcharts/amcharts5';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5xy from '@amcharts/amcharts5/xy';

import useRemoteGetAllProducts from '../../hooks/remote/useRemoteGetAllProducts';
import useMediaQuery from '../../hooks/useMediaQuery';

const Chart: React.FC = () => {
  const { products } = useRemoteGetAllProducts('');
  const isSmallScreen = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    const root = am5.Root.new('chart');

    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panY: false,
        layout: root.verticalLayout,
      })
    );

    const data = products?.data?.map((product) => {
      return {
        product: product.title,
        value: product.stock,
      };
    });

    // Create Y-axis
    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
        min: 0,
        max: 200,
      })
    );

    yAxis.get('renderer').labels.template.setAll({
      fontSize: isSmallScreen ? 12 : 16,
    });

    // Create X-Axis
    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        renderer: am5xy.AxisRendererX.new(root, {}),
        categoryField: 'product',
      })
    );

    if (data) {
      xAxis.data.setAll(data);
    }

    xAxis.events.once('datavalidated', (event) => {
      event.target.zoomToIndexes(0, 7);
    });

    xAxis.get('renderer').labels.template.setAll({
      maxWidth: 100,
      oversizedBehavior: 'wrap',
      textAlign: 'center',
      fontSize: isSmallScreen ? 12 : 16,
    });

    // Create series
    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: 'Products',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'value',
        categoryXField: 'product',
        fill: am5.color('#b784ff'),
        stroke: am5.color('#9e55ff'),
        tooltip: am5.Tooltip.new(root, {
          autoTextColor: false,
          labelText: '{product} : {value}',
        }),
      })
    );

    if (data) {
      series.data.setAll(data);
    }

    // Add cursor
    chart.set('cursor', am5xy.XYCursor.new(root, {}));

    // Add Scrollbar
    const scrollbarX = am5.Scrollbar.new(root, {
      orientation: 'horizontal',
    });

    chart.set('scrollbarX', scrollbarX);
    chart.bottomAxesContainer.children.push(scrollbarX);

    chart.children.unshift(
      am5.Label.new(root, {
        text: 'Amount of Each Products',
        fontSize: isSmallScreen ? 16 : 25,
        fontWeight: '600',
        textAlign: 'left',
        marginBottom: 30,
        fill: am5.color('rgb(105, 19, 216)'),
      })
    );

    return () => root && root.dispose();
  }, [products]);

  return (
    <div
      id="chart"
      className="h-full min-h-[500px] xl:min-h-[500px] w-full xl:min-w-[500px] min-w-full"
    ></div>
  );
};

export default Chart;
