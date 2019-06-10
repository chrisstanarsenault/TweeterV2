$(document).ready( () => {
  $("#text-area").on("keypress", function() {
    let counterMaxValue = 140;
    let valueLength = this.value.length + 1;
    let counter = this.parentNode.childNodes[5];
    counter.innerHTML =  counterMaxValue - valueLength

    if (counter.innerHTML < 0) {
      counter.className = "counterRed";
    }
  });


});