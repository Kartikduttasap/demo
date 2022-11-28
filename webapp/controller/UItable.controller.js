sap.ui.define([
    "./BaseController"
], function (
    BaseController
) {
    "use strict";

    return BaseController.extend("ns.demo.controller.UItable", {
        onInit: function () {

        },
        onBack: function (oEvent) {
            this.getOwnerComponent().navBack();
        },
        onTableAdd: function (oEvent) {
            debugger;
            var oTable = this.getView().byId("Table");
            var oModel = oTable.getModel();
            if (oTable.getSelectedIndex() >= 0) {
                var line = oModel.oData.header[oTable.getSelectedIndex()];
            }
            else {
                var line = oModel.oData.header[0];
            }

            oModel.oData.header.push(line);
            oModel.refresh();
        },

        onTableChange: function (oEvent) {

            var oTable = this.getView().byId("Table");
            var oModel = oTable.getModel();
            // var col = oTable.mAggregations.rows[oTable.getSelectedIndex()].mAggregations.cells[2];

            var col = oTable.getRows();
            var cell = col[oTable.getSelectedIndex()].getCells();
            debugger;
            cell[2].setText("Done");

        },

        onTableDelete: function (oEvent) {
            debugger;
            var oTable = this.getView().byId("Table");
            var oModel = oTable.getModel();
            if (oTable.getSelectedIndex() >= 0) {
                // var line = oModel.oData.header[oTable.getSelectedIndex()];
                oModel.oData.header.splice(oTable.getSelectedIndex(), 1);
            }
            else {
                oModel.oData.header.splice(0, 1);
            }
            oModel.refresh();
        },

        onTableSalesOrg: function (oEvent) {
            debugger;
            var oTable = this.getView().byId("Table");
            if (oEvent.getSource().getText() == "Show Sales Org") {
                oEvent.getSource().setText("Hide Sales Org");
                if (Tablecol == " ") {
                    this.col = new sap.ui.table.Column({
                        id: "idSales",
                        label: new sap.m.Label({ text: "Sales Org" }),
                        template: new sap.m.Input({ value: "{Vkorg}" })
                    });
                    Tablecol = "X";
                }
                oTable.addColumn(this.col);
            }
            else {
                oEvent.getSource().setText("Show Sales Org");
                oTable.removeColumn("idSales");
            }

        },
    });
});