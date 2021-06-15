(function() {
  
  'use strict';
  
  var isDrawing, lastPoint;
  var container4    = document.getElementById('js-container4'),
      canvas4       = document.getElementById('js-canvas4'),
      canvasWidth4  = canvas4.width,
      canvasHeight4 = canvas4.height,
      ctx4          = canvas4.getContext('2d'),
      image4        = new Image(),
      brush4        = new Image();
      
  // base64 Workaround because Same-Origin-Policy
  image4.src = 'data:image/jpeg;base64,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';
  image4.onload = function() {
    ctx4.drawImage(image4, 0, 0);
    // Show the form when Image is loaded.
    document.getElementById('form4').style.visibility = 'visible';
  };
  brush4.src = 'data:image/png;base64,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';
  
  canvas4.addEventListener('mousedown', handleMouseDown, false);
  canvas4.addEventListener('touchstart', handleMouseDown, false);
  canvas4.addEventListener('mousemove', handleMouseMove, false);
  canvas4.addEventListener('touchmove', handleMouseMove, false);
  canvas4.addEventListener('mouseup', handleMouseUp, false);
  canvas4.addEventListener('touchend', handleMouseUp, false);
  
  function distanceBetween(point1, point2) {
    return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
  }
  
  function angleBetween(point1, point2) {
    return Math.atan2( point2.x - point1.x, point2.y - point1.y );
  }
  
  // Only test every `stride` pixel. `stride`x faster,
  // but might lead to inaccuracy
  function getFilledInPixels(stride) {
    if (!stride || stride < 1) { stride = 1; }
    
    var pixels   = ctx4.getImageData(0, 0, canvasWidth4, canvasHeight4),
        pdata    = pixels.data,
        l        = pdata.length,
        total    = (l / stride),
        count    = 0;
    
    // Iterate over all pixels
    for(var i = count = 0; i < l; i += stride) {
      if (parseInt(pdata[i]) === 0) {
        count++;
      }
    }
    
    return Math.round((count / total) * 100);
  }
  
  function getMouse(e, canvas4) {
    var offsetX = 0, offsetY = 0, mx, my;

    if (canvas4.offsetParent !== undefined) {
      do {
        offsetX += canvas4.offsetLeft;
        offsetY += canvas4.offsetTop;
      } while ((canvas4 = canvas4.offsetParent));
    }

    mx = (e.pageX || e.touches[0].clientX) - offsetX;
    my = (e.pageY || e.touches[0].clientY) - offsetY;

    return {x: mx, y: my};
  }
  
  function handlePercentage(filledInPixels) {
    filledInPixels = filledInPixels || 0;
    console.log(filledInPixels + '%');
    if (filledInPixels > 50) {
      canvas4.parentNode.removeChild(canvas4);
    }
  }
  
  function handleMouseDown(e) {
    isDrawing = true;
    lastPoint = getMouse(e, canvas4);
  }

  function handleMouseMove(e) {
    if (!isDrawing) { return; }
    
    e.preventDefault();

    var currentPoint = getMouse(e, canvas4),
        dist = distanceBetween(lastPoint, currentPoint),
        angle = angleBetween(lastPoint, currentPoint),
        x, y;
    
    for (var i = 0; i < dist; i++) {
      x = lastPoint.x + (Math.sin(angle) * i) - 25;
      y = lastPoint.y + (Math.cos(angle) * i) - 25;
      ctx4.globalCompositeOperation = 'destination-out';
      ctx4.drawImage(brush4, x, y);
    }
    
    lastPoint = currentPoint;
    handlePercentage(getFilledInPixels(32));
  }

  function handleMouseUp(e) {
    isDrawing = false;
  }
  
})();