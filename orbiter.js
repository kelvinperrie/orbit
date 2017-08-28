
// a cleverer way to do this would be to specify how long the overall arc should take, then
// break it into chunks based on how big the arc is and do each little arc
$.fn.orbit = function (settings) {

    var params = {
        step: 0.05,
        timeStep: 50,
        initialAngle: 0,
        targetAngle: 360,
        radius: 200,
        direction: "clockwise",
        center: {},
        initialized: false
    }
    $.extend(params, settings);

    if (!params.initialized) {
        if (!params.center.x) {
            // put the center where the object starts is?
            var top = $(this).css("top").replace("px", "");
            var left = $(this).css("left").replace("px", "");
            console.log(top);
            params.center.x = parseInt(left);
            params.center.y = parseInt(top);
        }
        params.initial = ((2 * Math.PI) / 360) * params.initialAngle;
        params.progress = params.initial;
        var target = ((2 * Math.PI / 360) * params.targetAngle);
        params.target = target;
        params.directionAdjuster = params.direction === "clockwise" ? 1 : -1;
        params.initialized = true;
        console.log(params);
    }

    // step us along the progress
    params.progress += params.step * params.directionAdjuster;

    // work out what our current angle is
    // ugh. ugh? ugh
    var currentAngle = (params.progress / (2 * Math.PI / 360));
    console.log(currentAngle);
    if (params.direction === "anticlockwise") {
        if (currentAngle >= 0) {
            currentAngle = params.initialAngle + (params.initialAngle - currentAngle);
        } else {
            console.log((currentAngle * -1) + " + " + params.initialAngle * 2);
            currentAngle = (currentAngle * -1) + params.initialAngle * 2;
        }
    }

    // have we rotated as far as we want to?
    if (currentAngle >= params.targetAngle) {
        // if there is a complete call back then call it
        if (params.complete) {
            params.complete();
        }
        return;
    }

    // work out the x and y of the object being rotated and the move it to there
    var newLeft = Math.floor(params.center.x + (params.radius * Math.cos(params.progress)));
    var newTop = Math.floor(params.center.y + (params.radius * Math.sin(params.progress)));
    $(this).animate({
        top: newTop,
        left: newLeft
    }, params.timeStep, "linear", function () {
        $(this).show();
        $(this).orbit(params);
    });
}