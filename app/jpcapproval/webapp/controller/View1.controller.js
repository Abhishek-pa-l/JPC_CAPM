sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("com.sap.jpcapproval.controller.View1", {
            onInit: function () {
                debugger
                let oModel=this.getOwnerComponent().getModel();
                oModel.read("/Approvers",{
                    success:function(res){
                        debugger
                        let data=res.results.bckground;
                        this.getView().byId("myRTE2").setValue(data)
                    },
                    error:function(e){

                    }
                })
                this.initRichTextEditor(false);
                this.initRichTextEditor2(false);

            },
            handleSelect: function (oEvent) {
                var sSelectedKey = oEvent.getParameters().selectedItem.getKey();
                if (this.oRichTextEditor) {
                    this.oRichTextEditor.destroy();
                }
                switch (sSelectedKey) {
                    case "TinyMCE5":
                        this.initRichTextEditor(true);
                        break;
                    default:
                        this.initRichTextEditor(false);
                        break;
                }
            },
            initRichTextEditor: function (bIsTinyMCE5) {
                var that = this,
                sHtmlValue = '<table style="border-collapse: collapse; width: 100%;" border="1"><colgroup><col style="width: 33.3053%"><col style="width: 33.3053%"><col style="width: 33.3053%"></colgroup>\
                <tbody>\
                <tr>\
                        <td>col1</td>\
                        <td>col2</td>\
                        <td>col3</td>\
                    </tr><tr>\
                            <td>col11</td>\
                            <td>col22</td>\
                            <td>col33</td>\
                        </tr>\
                </tbody>\
                </table>\
                <p><strong>To request JPC approval to amend Contract xxxxxx as follows:</strong></p><p>&nbsp; &nbsp; <span style="color: gold">a. extend the contract duration for an additional period of [Please state] from [Please state] to [Please state], </span></p><p>&nbsp; &nbsp; <span style="color: deepskyblue">b. amend Schedules B and C without any increase in value/ increase of contract value by [Please state in Contract currency] (USD [Please state]) resulting in a revised&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Total Contract Value of [Please state in Contract currency] (USD [Please state]) as described herein. </span></p><p>&nbsp; &nbsp;<span style="color: darkmagenta"> c. Increase in value by [Please state in Contract currency] (USD [Please state]) resulting in a revised Total Contract Value of [Please state in Contract currency] (USD&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;[Please state]) as described herein.</span></p><p><span style="color: darkmagenta">&nbsp; &nbsp;d. amend Form of Agreement in order to remove Contract Ceiling Value and Schedule E in order to update the Articles related to Contract Ceiling Value. [strike out&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; whichever is not applicable].&nbsp;</span></p>';


                sHtmlValue = sHtmlValue.replace(/[{}]/g, ''); 


                sap.ui.require(["sap/ui/richtexteditor/RichTextEditor", "sap/ui/richtexteditor/library"],
                    function (RTE, library) {
                        var EditorType = library.EditorType;
                        that.oRichTextEditor = new RTE("myRTE", {
                            editorType: bIsTinyMCE5 ? EditorType.TinyMCE5 : EditorType.TinyMCE6,
                            width: "100%",
                            height: "600px",
                            customToolbar: true,
                            showGroupFont: true,
                            showGroupLink: true,
                            showGroupInsert: true,
                            value: sHtmlValue,
                            ready: function () {
                                bIsTinyMCE5 ? this.addButtonGroup("styleselect").addButtonGroup("table") : this.addButtonGroup("styles").addButtonGroup("table");
                            }
                        });

                        that.getView().byId("idVerticalLayout").addContent(that.oRichTextEditor);
                    });
            },
            initRichTextEditor2: function (bIsTinyMCE5) {
                var that = this,
sHtmlValue=``;

                sHtmlValue = sHtmlValue.replace(/[{}]/g, ''); 


                sap.ui.require(["sap/ui/richtexteditor/RichTextEditor", "sap/ui/richtexteditor/library"],
                    function (RTE, library) {
                        var EditorType = library.EditorType;
                        that.oRichTextEditor = new RTE("myRTE2", {
                            editorType: bIsTinyMCE5 ? EditorType.TinyMCE5 : EditorType.TinyMCE6,
                            width: "100%",
                            height: "600px",
                            customToolbar: true,
                            showGroupFont: true,
                            showGroupLink: true,
                            showGroupInsert: true,
                            value: sHtmlValue,
                            ready: function () {
                                bIsTinyMCE5 ? this.addButtonGroup("styleselect").addButtonGroup("table") : this.addButtonGroup("styles").addButtonGroup("table");
                            }
                        });

                        that.getView().byId("idVerticalLayout2").addContent(that.oRichTextEditor);
                    });
            },
            www: function () {
                let oModel = this.getOwnerComponent().getModel();

                let icoNo=this.getView().byId("idContractorNameInput").getValue();
                let contractTitle=this.getView().byId("idContractorNumberInput").getValue();
                let contractType=this.getView().byId("idContractNumberInput").getValue();
                let contractNo=this.getView().byId("idContractDescriptionInput").getValue();
                let Supplier=this.getView().byId("idFpalClassificationInput").getValue();

                let purpose = sap.ui.getCore().byId("myRTE").getValue()
                let background = sap.ui.getCore().byId("myRTE2").getValue()

                // console.log(icoNo,contractTitle,contractType,contractNo,Supplier,purpose,background);
                let data ={
                    ICO_No:icoNo,
                    contract_title:contractTitle,
                    contract_type:contractType,
                    contract_no:contractNo,
                    supplier:Supplier,
                    purpose:purpose,
                    bckground:background
                }


                oModel.create("/Approvals", data, {
                    success: function (res) {
                      sap.m.MessageToast.show("Data saved successfully!");
                    }.bind(this),
                    error: function (err) {
                      console.error("Error while saving data:", err);
                    }
                  });
            }
        });
    });
