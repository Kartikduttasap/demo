sap.ui.define([
    "./BaseController"
], function (
    BaseController
) {
    "use strict";

    return BaseController.extend("ns.demo.controller.Mtable", {
        onInit: function () {

        },
        onKunnr: function (oEvent) {
            debugger;
            // var sCust = oEvent.getSource().getText();
            // alert(sCust);

            // get Selected row values
            // oEvent.getSource().getBindingContext().getProperty("Vbeln")
            debugger;
            var delRecord = oEvent.getSource().getBindingContext().getObject();
            // var oModel = oEvent.getSource().getBindingContext().getModel();
            var oModel = this.getView().byId("idTable").getModel();
            var oData = oModel.oData;
            for (let i = 0; i < 4; i++) {
                if (oData[i] == delRecord) {
                    oData.splice(i, 1);
                    oModel.refresh();
                    break;
                }

            }

        },

        onSubmit: function (oEvent) {
            debugger;
            var oTable = this.getView().byId("idTable");
            var oModel = oTable.getModel();
            var oJsonData = oModel.oData;
            var sRow = oTable.getSelectedItem().getBindingContext().getObject();

            debugger;
            for (var i = oJsonData.header.length - 1; i >= 0; i--) {
                if (oJsonData.header[i] == sRow) {
                    oJsonData.header.splice(i, 1);
                }
            }
            oModel.refresh();
        },

        onDelete: function (oEvent) {
            debugger;
            var oTable = this.getView().byId("idTable");
            var oModel = oTable.getModel();
            var oJsonData = oModel.oData;
            var sRow = oTable.getSelectedItem().getBindingContext().getObject();

            debugger;
            for (var i = oJsonData.fruits.length - 1; i >= 0; i--) {
                if (oJsonData.fruits[i] === sRow) {
                    oJsonData.fruits.splice(i, 1);
                    break;
                }
            }
            oModel.refresh();

        },

        onAppend: function (oEvent) {
            debugger;
            var sRow = this.getView().byId("idForm").getBindingContext().getObject();
            var oTable = this.getView().byId("idTable");
            var oModel = oTable.getModel();
            var oJsonData = oModel.oData.fruits;
            oJsonData.push(sRow);
            oModel.refresh();
        },

        onChangeProperty: function (oEvent) {
            debugger;
            var oTable = this.getView().byId("idTable");
            var oModel = oTable.getModel();
            var oJsonData = oModel.oData;
            oTable.getSelectedItem().mAggregations.cells[5].setState("None");

        },

        onAddColumn: function (oEvent) {
            debugger;
            var oTable = this.getView().byId("idTable");

            this.oColumn = new sap.m.Column("idBenifits", {
                header: new sap.m.Label({
                    text: "Health Benifits"
                })
            });
            oTable.addColumn(this.oColumn);
            var shealthBenefit = new sap.m.Text({ text: "{healthBenefit}" });
            var oRow = this.getView().byId("idColumnListItem");
            oRow.addCell(shealthBenefit);
            oTable.bindItems("/fruits", oRow);
        },
        onReadRow: function (oEvent) {
            debugger;
            //Bind with ref
            var oTable = this.getView().byId("idTable");
            var sContext = oTable.getSelectedItem().getBindingContext();
            this.getView().byId("idForm").setBindingContext(sContext);
            // Bind without ref
            // var oModel = this.getView().getModel();
            // var sContext = new sap.ui.model.Context(oModel, "/header/2");
            // this.getView().byId("idInput1").setBindingContext(sContext);
        },

        onUpdateRow: function (oEvent) {
            var oFormContext = this.getView().byId("idForm").getBindingContext().getObject();
            var oTable = this.getView().byId("idTable");
            oTable.getSelectedItem().setBindingContext(oFormContext);
        },

        onBack: function (oEvent) {
            this.getOwnerComponent().navBack();
        },

        onItem: function (oEvent) {
            var sContext = oEvent.getSource().getSelectedContexts();
            this.getView().byId("idForm").setBindingContext(sContext[0]);
        },

        onInsert: function (oEvent) {
            var sRow = this.getView().byId("idForm").getBindingContext().getObject();
            var oTable = this.getView().byId("idTable");
            var oModel = oTable.getModel();
            var oJsonData = oModel.oData.fruits;
            oJsonData.splice(0, 0, sRow);
            oModel.refresh();
        },

        onDeleteColumn: function (oEvent) {
            debugger;
            var oTable = this.getView().byId("idTable");
            oTable.removeColumn("idBenifits");
            // oTable.addColumn(this.oColumn);
            // var shealthBenefit = new sap.m.Text({ text: "{healthBenefit}" });
            var oRow = this.getView().byId("idColumnListItem");
            oRow.removeCell(6);
            // oRow.addCell(shealthBenefit);
            oTable.bindItems("/fruits", oRow);
        }
    });
});