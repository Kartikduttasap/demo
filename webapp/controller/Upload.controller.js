sap.ui.define([
    "./BaseController",
    'sap/ui/export/library',
    'sap/ui/export/Spreadsheet',
    'sap/m/MessageToast',
    "../model/xlsx"
], function (
    BaseController, exportLibrary, Spreadsheet, MessageToast, xlsx
) {
    "use strict";

    var EdmType = exportLibrary.EdmType;
    return BaseController.extend("ns.demo.controller.Upload", {
        onInit: function () {
            // Formatting Excel
            // https://blogs.sap.com/2021/11/20/excel-download-in-sapui5-application-with-custom-formatting/
            // Upload and Download
            // https://blogs.sap.com/2022/08/22/excel-file-upload-download-in-sapui5/
            // Generating Excel through ABAP
            // https://blogs.sap.com/2018/06/07/how-to-generate-professional-excel-from-sapui5-using-abap2xlsx/
            this.localModel = new sap.ui.model.json.JSONModel();
            this.getView().setModel(this.localModel, "localModel");
        },
        onBack: function (oEvent) {
            this.getOwnerComponent().navBack();
        },

        onExpTemplate: function (oEvent) {

            var aCols, aProducts, oSettings, oSheet;

            aCols = this.createColumnConfig();
            aProducts = this.getView().getModel().getProperty('/fruits');

            oSettings = {
                workbook: { columns: aCols },
                dataSource: aProducts
            };

            oSheet = new Spreadsheet(oSettings);
            oSheet.build()
                .then(function () {
                    MessageToast.show('Spreadsheet export has finished');
                })
                .finally(oSheet.destroy);
        },
        createColumnConfig: function () {
            return [
                {
                    label: 'Name',
                    property: 'name',
                    // type: EdmType.Number,
                    scale: 0
                },
                {
                    label: 'Type',
                    property: 'type',
                    width: '25'
                },
                {
                    label: 'Color',
                    property: 'color',
                    width: '25'
                },
                {
                    label: 'Price',
                    property: 'price',
                    type: EdmType.Currency,
                    unitProperty: 'currency',
                    width: '18'
                },
                {
                    label: 'Status',
                    property: 'status',
                    type: EdmType.String
                }];
        },
        onUpload: function (oEvent) {
            // debugger;
            // var oFileUploader = this.getView().byId("idfileUploader");
            // var xlsDomRef = oFileUploader.getFocusDomRef();
            // var xlsFile = xlsDomRef.files[0];
            // var that = this;

            // this.fileName = xlsFile.name;
            // this.fileType = xlsFile.type;

            // //Get selected Radio Button
            // for (var j = 0; j < this.getView().byId("radioButtonGroup").getButtons().length; j++) {
            //     if (this.getView().byId("radioButtonGroup").getButtons()[j].getSelected()) {
            //         this.operation = this.getView().byId("radioButtonGroup").getButtons()[j].getText();
            //     }
            // }

            // var oReader = new FileReader();
            // oReader.onload = function (oReadStream) {
            //     //Get the number of columns present in the file uploaded & convert the regex unformatted stream
            //     //to array. This will be parsed at the backend SAP
            //     var noOfcolumn = oReadStream.currentTarget.result.match(/[^\r\n]+/g)[0].split("\t").length;
            //     var binContent = oReadStream.currentTarget.result.match(/[^\r\n\t]+/g);

            //     //Provide the binary content as payload. This will be received as an XSTRING in
            //     //SAP under the CREATE_STREAM method of media resource structure
            //     var payload = {
            //         "Content": binContent
            //     };

            //     //Provide additional details through header. Column No, Filename + File Type + TableName + Operation
            //     var header = {
            //         "slug": noOfcolumn + "," + that.fileName + "," + that.fileType + "," + that.operation
            //     };

            //     //Call a CREATE_STREAM activity
            //     that.getModel().create("/TableStructureSet", payload, {
            //         headers: header,
            //         success: function (oData, oResponse) {
            //             MessageToast.show("Data Uploaded Successfully!");
            //         },
            //         error: function (oError) {
            //             MessageToast.show("Data Uploaded Failed!");
            //         }
            //     });

            // };

            // // Read the file as a binary String. Do not read URI, you have to encode before sending
            // oReader.readAsBinaryString(xlsFile);
        },

        onExpTable: function (oEvent) {

            var aCols, aProducts, oSettings, oSheet;

            aCols = this.createTableColumnConfig();

            aProducts = this.getView().byId("idTable").getModel().oData;

            oSettings = {
                workbook: { columns: aCols },
                dataSource: aProducts.items
            };

            oSheet = new Spreadsheet(oSettings);
            debugger;
            oSheet.build()
                .then(function () {
                    MessageToast.show('Spreadsheet export has finished');
                })
                .finally(oSheet.destroy);
        },
        createTableColumnConfig: function () {
            return [
                {
                    label: 'Name',
                    property: 'Name',
                    // type: EdmType.Number,
                    scale: 0
                },
                {
                    label: 'Type',
                    property: 'Type',
                    width: '25'
                },
                {
                    label: 'Color',
                    property: 'Color',
                    width: '25'
                },
                {
                    label: 'Price',
                    property: 'Price',
                    // type: EdmType.Currency,
                    // unitProperty: 'currency',
                    width: '18'
                },
                {
                    label: 'Status',
                    property: 'Status',
                    type: EdmType.String
                }];
        },
        onChange: function (oEvent) {
            // var jQueryScript = document.createElement('script');
            // jQueryScript.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.10.0/xlsx.js');
            // document.head.appendChild(jQueryScript);

            var excelData = {};

            var xlsFile = oEvent.getParameter("files")[0];
            var that = this;

            this.fileName = xlsFile.name;
            this.fileType = xlsFile.type;

            var reader = new FileReader();
            reader.onload = function (oReadStream) {
                var data = oReadStream.target.result;
                // sap.m.MessageToast.show("binary string: " + data);
                debugger;
                var workbook = XLSX.read(data, {
                    type: 'binary'
                });
                workbook.SheetNames.forEach(function (sheetName) {
                    // Here is your object for every sheet in workbook
                    excelData = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);

                });
                debugger;
                // Setting the data to the local model 
                that.localModel.setData({
                    items: excelData
                });
                debugger;
                // var aProducts = that.getView().getModel().getProperty('/fruits');
                that.getView().byId("idTable").setModel(that.localModel);
                // that.localModel.refresh(true);
            };
            reader.onerror = function (ex) {
                alert("Upload Error");
            };
            reader.readAsBinaryString(xlsFile);
        }
        //     //      Code to download the data in excel format
        // Download: function(oEvent){
        //     var sUrl = "/sap/opu/odata/sap/ZDEMO_GW_SRV_SRV/SalesOrderSet?$format=xlsx";
        //         var encodeUrl = encodeURI(sUrl);
        //     sap.m.URLHelper.redirect(encodeUrl,true);
        //   },
    });
});