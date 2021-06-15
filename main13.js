(function() {
  
    'use strict';
    
    var isDrawing, lastPoint;
    var container13    = document.getElementById('js-container13'),
        canvas13       = document.getElementById('js-canvas13'),
        canvasWidth13  = canvas13.width,
        canvasHeight13 = canvas13.height,
        ctx13          = canvas13.getContext('2d'),
        image13        = new Image(),
        brush13        = new Image();
        
    // base64 Workaround because Same-Origin-Policy
    image13.src = 'data:image/jpeg;base64,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';
    image13.onload = function() {
      ctx13.drawImage(image13, 0, 0);
      // Show the form when Image is loaded.
      document.getElementById('form13').style.visibility = 'visible';
    };
    brush13.src = 'data:image/png;base64,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';
    
    canvas13.addEventListener('mousedown', handleMouseDown, false);
    canvas13.addEventListener('touchstart', handleMouseDown, false);
    canvas13.addEventListener('mousemove', handleMouseMove, false);
    canvas13.addEventListener('touchmove', handleMouseMove, false);
    canvas13.addEventListener('mouseup', handleMouseUp, false);
    canvas13.addEventListener('touchend', handleMouseUp, false);
    
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
      
      var pixels   = ctx13.getImageData(0, 0, canvasWidth13, canvasHeight13),
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
    
    function getMouse(e, canvas13) {
      var offsetX = 0, offsetY = 0, mx, my;
  
      if (canvas13.offsetParent !== undefined) {
        do {
          offsetX += canvas13.offsetLeft;
          offsetY += canvas13.offsetTop;
        } while ((canvas13 = canvas13.offsetParent));
      }
  
      mx = (e.pageX || e.touches[0].clientX) - offsetX;
      my = (e.pageY || e.touches[0].clientY) - offsetY;
  
      return {x: mx, y: my};
    }
    
    function handlePercentage(filledInPixels) {
      filledInPixels = filledInPixels || 0;
      console.log(filledInPixels + '%');
      if (filledInPixels > 50) {
        canvas13.parentNode.removeChild(canvas13);
      }
    }
    
    function handleMouseDown(e) {
      isDrawing = true;
      lastPoint = getMouse(e, canvas13);
    }
  
    function handleMouseMove(e) {
      if (!isDrawing) { return; }
      
      e.preventDefault();
  
      var currentPoint = getMouse(e, canvas13),
          dist = distanceBetween(lastPoint, currentPoint),
          angle = angleBetween(lastPoint, currentPoint),
          x, y;
      
      for (var i = 0; i < dist; i++) {
        x = lastPoint.x + (Math.sin(angle) * i) - 25;
        y = lastPoint.y + (Math.cos(angle) * i) - 25;
        ctx13.globalCompositeOperation = 'destination-out';
        ctx13.drawImage(brush13, x, y);
      }
      
      lastPoint = currentPoint;
      handlePercentage(getFilledInPixels(32));
    }
  
    function handleMouseUp(e) {
      isDrawing = false;
    }
    
  })();