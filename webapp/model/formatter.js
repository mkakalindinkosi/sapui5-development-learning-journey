sap.ui.define([
    "sap/ui/model/resource/ResourceModel"
], function (ResourceModel) {
    "use strict";

    // ✅ Create ONE reusable ResourceBundle
    var oResourceModel = new ResourceModel({
        bundleName: "sap.training.exc.i18n.i18n"
    });

    var oBundle = oResourceModel.getResourceBundle();

    return {

        /* ===============================
           Flight class text
           =============================== */
        classText: function (sClass) {
            if (!sClass) {
                return "";
            }

            switch (sClass) {
                case "C":
                    return oBundle.getText("flightClassC");
                case "Y":
                    return oBundle.getText("flightClassY");
                case "F":
                    return oBundle.getText("flightClassF");
                default:
                    return sClass;
            }
        },

        /* ===============================
           Cancellation tooltip
           =============================== */
        cancellationTooltip: function (sIsCancelled) {
            return sIsCancelled === "X"
                ? oBundle.getText("cancelledTooltip")
                : oBundle.getText("notCancelledTooltip");
        },

        /* ===============================
           Flight date formatting
           =============================== */
        formatFlightDate: function (sDate) {
            if (!sDate) {
                return "";
            }

            var oDate = new Date(sDate);

            return oDate.toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric"
            });
        }
    };
});
