// BarChart using NVD3.js


function loadBarChart(lmvData) {

    nv.addGraph(function() {
        var barChart = nv.models.multiBarHorizontalChart()
            .x(function(d) { return d.label; })
            .y(function(d) { return d.value; })
            .showValues(true)
            .showControls(false)
            .tooltips(false)
            .valueFormat(d3.format('f'))
            .margin({ top: 0, right: 50, bottom: 0, left: 150})
            .transitionDuration(400);


        lmvData.content.sort(function(a,b) {
            if (_sortOrder == "value-asc")
                return a.value - b.value;
            else if (_sortOrder == "value-desc")
                return b.value - a.value;
            else if (_sortOrder == "label-asc")
                return a.label < b.label ? -1 : 1;
            else if (_sortOrder == "label-desc")
                return b.label < a.label ? -1 : 1;
        } );
        var barCharData =
            [
                {
                    key: "Quantity",
                    values: lmvData.content
                }
            ];
        
        barChart.height((lmvData.content.length + 2) * 15); // give each line 15px + add a header and footer


        d3.select('#barChart')
            .datum(barCharData)
            .call(barChart);
        barChart.yAxis.axisLabel("Quantity").tickFormat(d3.format("d"));
        d3.selectAll('svg .nv-bar').on('click', handleBarClick);

        nv.utils.windowResize(function() {
            barChart.update();
        });


        return barChart;
    });
}

function handleBarClick(event) {
    d3.selectAll('.nv-bar').classed({'clicked': false});
    d3.select(this).classed({'clicked': true});

    _viewerMain.isolateById(event.lmvIds);
    //_viewerSecondary.select(evt.data.lmvIds);
    workaround_2D_select(event.lmvIds);
}
