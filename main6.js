(function() {
  
    'use strict';
    
    var isDrawing, lastPoint;
    var container6    = document.getElementById('js-container6'),
        canvas6       = document.getElementById('js-canvas6'),
        canvasWidth6  = canvas6.width,
        canvasHeight6 = canvas6.height,
        ctx6          = canvas6.getContext('2d'),
        image6        = new Image(),
        brush6        = new Image();
        
    // base64 Workaround because Same-Origin-Policy
    image6.src = 'data:image/jpeg;base64,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';
    image6.onload = function() {
      ctx6.drawImage(image6, 0, 0);
      // Show the form when Image is loaded.
      document.getElementById('form6').style.visibility = 'visible';
    };
    brush6.src = 'data:image/png;base64,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';
    
    canvas6.addEventListener('mousedown', handleMouseDown, false);
    canvas6.addEventListener('touchstart', handleMouseDown, false);
    canvas6.addEventListener('mousemove', handleMouseMove, false);
    canvas6.addEventListener('touchmove', handleMouseMove, false);
    canvas6.addEventListener('mouseup', handleMouseUp, false);
    canvas6.addEventListener('touchend', handleMouseUp, false);
    
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
      
      var pixels   = ctx6.getImageData(0, 0, canvasWidth6, canvasHeight6),
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
    
    function getMouse(e, canvas6) {
      var offsetX = 0, offsetY = 0, mx, my;
  
      if (canvas6.offsetParent !== undefined) {
        do {
          offsetX += canvas6.offsetLeft;
          offsetY += canvas6.offsetTop;
        } while ((canvas6 = canvas6.offsetParent));
      }
  
      mx = (e.pageX || e.touches[0].clientX) - offsetX;
      my = (e.pageY || e.touches[0].clientY) - offsetY;
  
      return {x: mx, y: my};
    }
    
    function handlePercentage(filledInPixels) {
      filledInPixels = filledInPixels || 0;
      console.log(filledInPixels + '%');
      if (filledInPixels > 50) {
        canvas6.parentNode.removeChild(canvas6);
      }
    }
    
    function handleMouseDown(e) {
      isDrawing = true;
      lastPoint = getMouse(e, canvas6);
    }
  
    function handleMouseMove(e) {
      if (!isDrawing) { return; }
      
      e.preventDefault();
  
      var currentPoint = getMouse(e, canvas6),
          dist = distanceBetween(lastPoint, currentPoint),
          angle = angleBetween(lastPoint, currentPoint),
          x, y;
      
      for (var i = 0; i < dist; i++) {
        x = lastPoint.x + (Math.sin(angle) * i) - 25;
        y = lastPoint.y + (Math.cos(angle) * i) - 25;
        ctx6.globalCompositeOperation = 'destination-out';
        ctx6.drawImage(brush6, x, y);
      }
      
      lastPoint = currentPoint;
      handlePercentage(getFilledInPixels(32));
    }
  
    function handleMouseUp(e) {
      isDrawing = false;
    }
    
  })();