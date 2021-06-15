(function() {
  
  'use strict';
  
  var isDrawing, lastPoint;
  var container14    = document.getElementById('js-container14'),
      canvas14       = document.getElementById('js-canvas14'),
      canvasWidth14  = canvas14.width,
      canvasHeight14 = canvas14.height,
      ctx14          = canvas14.getContext('2d'),
      image14        = new Image(),
      brush14        = new Image();
      
  // base64 Workaround because Same-Origin-Policy
  image14.src = 'data:image/jpeg;base64,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';
  image14.onload = function() {
    ctx14.drawImage(image14, 0, 0);
    // Show the form when Image is loaded.
    document.getElementById('form14').style.visibility = 'visible';
  };
  brush14.src = 'data:image/png;base64,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';
  
  canvas14.addEventListener('mousedown', handleMouseDown, false);
  canvas14.addEventListener('touchstart', handleMouseDown, false);
  canvas14.addEventListener('mousemove', handleMouseMove, false);
  canvas14.addEventListener('touchmove', handleMouseMove, false);
  canvas14.addEventListener('mouseup', handleMouseUp, false);
  canvas14.addEventListener('touchend', handleMouseUp, false);
  
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
    
    var pixels   = ctx14.getImageData(0, 0, canvasWidth14, canvasHeight14),
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
  
  function getMouse(e, canvas14) {
    var offsetX = 0, offsetY = 0, mx, my;

    if (canvas14.offsetParent !== undefined) {
      do {
        offsetX += canvas14.offsetLeft;
        offsetY += canvas14.offsetTop;
      } while ((canvas14 = canvas14.offsetParent));
    }

    mx = (e.pageX || e.touches[0].clientX) - offsetX;
    my = (e.pageY || e.touches[0].clientY) - offsetY;

    return {x: mx, y: my};
  }
  
  function handlePercentage(filledInPixels) {
    filledInPixels = filledInPixels || 0;
    console.log(filledInPixels + '%');
    if (filledInPixels > 50) {
      canvas14.parentNode.removeChild(canvas14);
    }
  }
  
  function handleMouseDown(e) {
    isDrawing = true;
    lastPoint = getMouse(e, canvas14);
  }

  function handleMouseMove(e) {
    if (!isDrawing) { return; }
    
    e.preventDefault();

    var currentPoint = getMouse(e, canvas14),
        dist = distanceBetween(lastPoint, currentPoint),
        angle = angleBetween(lastPoint, currentPoint),
        x, y;
    
    for (var i = 0; i < dist; i++) {
      x = lastPoint.x + (Math.sin(angle) * i) - 25;
      y = lastPoint.y + (Math.cos(angle) * i) - 25;
      ctx14.globalCompositeOperation = 'destination-out';
      ctx14.drawImage(brush14, x, y);
    }
    
    lastPoint = currentPoint;
    handlePercentage(getFilledInPixels(32));
  }

  function handleMouseUp(e) {
    isDrawing = false;
  }
  
})();