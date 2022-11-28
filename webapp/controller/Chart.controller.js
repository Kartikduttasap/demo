sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel"
], function (
    BaseController,
    JSONModel
) {
    "use strict";

    return BaseController.extend("ns.demo.controller.Chart", {
        /**
         * @override
         */
        onInit: function () {
            debugger;
            var aChartType = [{
                type: "bar"
            },
            {
                type: "line"
            },
            {
                type: "column"
            }];
            var oData = {
                chartType: aChartType
            };
            var oModel = new JSONModel();
            oModel.setData(oData);
            this.getView().byId("idChartType").setModel(oModel);
            debugger;
            // 1.Get the id of the VizFrame
            var oVizFrame = this.getView().byId("idViz");

            // 2.Create a JSON Model and set the data
            var oModel = new sap.ui.model.json.JSONModel();
            var data = {
                'Cars': [
                    { "Model": "Alto", "Value": "758620" },
                    { "Model": "Zen", "Value": "431160" },
                    { "Model": "Santro", "Value": "515100" },
                    { "Model": "Matiz", "Value": "293780" },
                    { "Model": "Wagan R", "Value": "974010" },
                ]
            };
            oModel.setData(data);

            // 3. Create Viz dataset to feed to the data to the graph
            var oDataset = new sap.viz.ui5.data.FlattenedDataset({
                dimensions: [{
                    name: "Model",
                    value: "{Model}"
                }],
                measures: [{
                    name: "Cars Bought",
                    value: '{Value}'
                }],
                data: {
                    path: "/Cars"
                }
            });
            debugger;
            oVizFrame.setDataset(oDataset);
            oVizFrame.setModel(oModel);
            // oVizFrame.setVizType("bar");  //line

            // 4.Set Viz properties
            oVizFrame.setVizProperties({
                plotArea: {
                    colorPalette: d3.scale.category20().range()
                }
            });

            var feedValueAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
                'uid': "valueAxis",
                'type': "Measure",
                'values': ["Cars Bought"]
            }),
                feedCategoryAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
                    'uid': "categoryAxis",
                    'type': "Dimension",
                    'values': ["Model"]
                });
            oVizFrame.addFeed(feedValueAxis);
            oVizFrame.addFeed(feedCategoryAxis);
        },
        onBack: function (oEvent) {
            this.getOwnerComponent().navBack();
        },

        onChange: function (oEvent) {
            debugger;
            var selKey = oEvent.getParameters().selectedItem.getProperty("key");
            this.getView().byId("idViz").setVizType(selKey);
        }
    });
});