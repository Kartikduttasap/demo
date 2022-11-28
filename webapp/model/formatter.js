sap.ui.define([], function () {
    "use strict";

    return {
        statusFormat: function (status) {
            if (status == "Available") {
                return "Success";
            } else if (status == "Out of Stock") {
                return "Error";
            } else if (status == "Unavailable") {
                return "Warning";
            }
        }
    };
});