// Remove popup
document.querySelector(".ui-widget-overlay.ui-front").remove();
document
  .querySelector(
    ".ui-dialog.ui-corner-all.ui-widget.ui-widget-content.ui-front"
  )
  .remove();

// Remove button waiting + Show button download
document.querySelector("button#dlw").remove();
document.querySelector("input#dlb").style.display = "block";
