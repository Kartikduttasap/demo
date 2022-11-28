sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,
        JSONModel) {
        "use strict";
        var col = " ";
        var Tablecol = " ";
        return Controller.extend("ns.demo.controller.Main", {

            onInit: function () {
                var that = this;
                debugger;
                var oModel = this.getOwnerComponent().getModel();
                oModel.read("/headerSet", {
                    success: function (oData, oResponse) {
                        that.setTable(oData.results);
                        // alert("Suc");
                    },
                    error: function (oError) {
                        alert("Error");
                    }
                });
                var that = this;

                var oModel = this.getOwnerComponent().getModel();
                ////
                oModel.read("/salesDocTypeSet", {
                    success: function (oData, oResponse) {

                        that.setSelect(oData.results, that);
                        // alert("Suc Doc Type");
                        // that.getView().byId("idSelect").setBindingContext(new sap.ui.model.Context(oModel, "/nameinfo"))
                    },
                    error: function (oError) {
                        alert("Error");
                    }
                });

            },
            setTable: function (results) {
                // alert("Suc");
                var headerData = {
                    header: results
                };
                var headerModel = new JSONModel();
                headerModel.setData(headerData);
                // this.getView().setModel(headerModel);
                sap.ui.getCore().setModel(headerModel);
                var oModel = sap.ui.getCore().getModel();
                this.getView().setModel(oModel);
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
                // debugger;
                var oTable = this.getView().byId("idTable");
                var oModel = oTable.getModel();
                var oJsonData = oModel.oData;
                var sRow = oTable.getSelectedItem().getBindingContext().getObject();

                debugger;
                for (var i = oJsonData.header.length - 1; i >= 0; i--) {
                    if (oJsonData.header[i] === sRow) {
                        oJsonData.header.splice(i, 1);
                        break;
                    }
                }
                oModel.refresh();

            },

            onAdd: function (oEvent) {

                var newRecord = {
                    Auart: "",
                    Vbeln: ""
                };
                var oTable = this.getView().byId("idTable");
                var oModel = oTable.getModel();
                var oJsonData = oModel.oData;
                // oJsonData.header[oJsonData.header.length] = oJsonData.header[oJsonData.header.length - 1];
                debugger;
                // var newRecord = oJsonData.header[oJsonData.header.length - 1];
                // newRecord.Auart = "";
                // newRecord.Vbeln = "";
                oJsonData.header.push(newRecord);

                oModel.refresh();
            },

            onChange: function (oEvent) {
                debugger;
                var oTable = this.getView().byId("idTable");
                var oModel = oTable.getModel();
                var oJsonData = oModel.oData;
                // var sRow = oTable.getSelectedItem().getBindingContext().getObject().Vbeln = "100";
                oTable.getSelectedItem().mAggregations.cells[2].setText("Done");
                oModel.refresh();
            },

            onSalesOrg: function (oEvent) {
                debugger;
                var oTable = this.getView().byId("idTable");
                if (oEvent.getSource().getText() == "Show Sales Org") {
                    oEvent.getSource().setText("Hide Sales Org");
                    if (col == " ") {
                        this.oColumn = new sap.m.Column("idSalesOrg", {
                            header: new sap.m.Label({
                                text: "Sales Org"
                            })
                        });
                        col = "X";
                    }
                    oTable.addColumn(this.oColumn);

                    var salesOrg = new sap.m.Text({ text: "{Vkorg}" });
                    var oRow = this.getView().byId("idColumnListItem");
                    oRow.addCell(salesOrg);
                    oTable.bindItems("/header", oRow);
                } else {

                    oEvent.getSource().setText("Show Sales Org");
                    // var oColumns = oTable.getColumns();
                    // oColumns.splice(3, 1);
                    oTable.removeColumn("idSalesOrg");
                    var oRow = this.getView().byId("idColumnListItem");
                    oRow.mAggregations.cells.splice(3, 1);
                    oTable.bindItems("/header", oRow);
                }

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

            CreateUI: function (oEvent) {
                debugger;
                var oToolbar = this.getView().byId("idToolbar");
                var oButton = new sap.m.Button({
                    id: "idDyn",
                    text: "Dynamic Button",
                    press: this.onDynButton

                });
                oToolbar.addContent(oButton);
            },
            onDynButton: function () {
                debugger;
                alert("Dynamic Button Clicked");
            },

            onNav: function (oEvent) {
                debugger;
                var oTable = this.getView().byId("idTable");
                var sPath = oTable.getSelectedContextPaths()
                var SelPath = sPath[0].split("/");
                //
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("RouteDetail", {
                    Vbeln: SelPath[2]
                });
            },

            onDrpDwn: function (oEvent) {

                var oModel = this.getView().byId("idSelect").getModel();
                var oContext = new sap.ui.model.Context(oModel, "/Cities");
                // this.getView().byId("idSelect1").setModel(oModel);
                debugger;
                // var oContext = this.getView().byId("idSelect").getBindingContext();
                this.getView().byId("idSelect1").setBindingContext(oContext);
            },
            setSelect: function (results, that) {
                debugger;
                var oJsonData = {
                    Cities: results
                };
                var oModel = new JSONModel();
                oModel.setData(oJsonData);
                that.getView().byId("idSelect").setModel(oModel);
                that.getView().byId("idSelect1").setModel(oModel);
                debugger;
                that.getView().byId("idSuggInput").setModel(oModel);
                // var oCont = this.getView().byId("idSelect").getBindingContext();
                // this.getView().byId("idSelect1").setBindingContext(oCont);
                // var oContext = new sap.ui.model.Context(oModel, "/Cities");
                // this.getView().byId("idSelect").setBindingContext(oContext);

                // var oCon = this.getView().byId("idSelect").getBindingContext(oContext);
            },

            onBind: function (oEvent) {
                debugger;
                // var oModel = this.getView().byId("idSelect").getModel();
                // var sContext = new sap.ui.model.Context(oModel, "/Cities");
                // var oSelect = this.getView().byId("idSelect1").setBindingContext(sContext);

            },

            onSelected: function (oEvent) {
                debugger;
                var oContext = oEvent.getSource().getBindingContext();
            },

            onBindContext: function (oEvent) {
                //Bind with ref
                var oTable = this.getView().byId("idTable");
                var sContext = oTable.getSelectedItem().getBindingContext();
                this.getView().byId("idInput").setBindingContext(sContext);
                // Bind without ref
                var oModel = this.getView().getModel();
                var sContext = new sap.ui.model.Context(oModel, "/header/2");
                this.getView().byId("idInput1").setBindingContext(sContext);
            }

        });
    });

