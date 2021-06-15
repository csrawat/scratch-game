(function() {
  
    'use strict';
    
    var isDrawing, lastPoint;
    var container7    = document.getElementById('js-container7'),
        canvas7       = document.getElementById('js-canvas7'),
        canvasWidth7  = canvas7.width,
        canvasHeight7 = canvas7.height,
        ctx7          = canvas7.getContext('2d'),
        image7        = new Image(),
        brush7        = new Image();
        
    // base64 Workaround because Same-Origin-Policy
    image7.src = 'data:image/jpeg;base64,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';
    image7.onload = function() {
      ctx7.drawImage(image7, 0, 0);
      // Show the form when Image is loaded.
      document.getElementById('form7').style.visibility = 'visible';
    };
    brush7.src = 'data:image/png;base64,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';
    
    canvas7.addEventListener('mousedown', handleMouseDown, false);
    canvas7.addEventListener('touchstart', handleMouseDown, false);
    canvas7.addEventListener('mousemove', handleMouseMove, false);
    canvas7.addEventListener('touchmove', handleMouseMove, false);
    canvas7.addEventListener('mouseup', handleMouseUp, false);
    canvas7.addEventListener('touchend', handleMouseUp, false);
    
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
      
      var pixels   = ctx7.getImageData(0, 0, canvasWidth7, canvasHeight7),
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
    
    function getMouse(e, canvas7) {
      var offsetX = 0, offsetY = 0, mx, my;
  
      if (canvas7.offsetParent !== undefined) {
        do {
          offsetX += canvas7.offsetLeft;
          offsetY += canvas7.offsetTop;
        } while ((canvas7 = canvas7.offsetParent));
      }
  
      mx = (e.pageX || e.touches[0].clientX) - offsetX;
      my = (e.pageY || e.touches[0].clientY) - offsetY;
  
      return {x: mx, y: my};
    }
    
    function handlePercentage(filledInPixels) {
      filledInPixels = filledInPixels || 0;
      console.log(filledInPixels + '%');
      if (filledInPixels > 50) {
        canvas7.parentNode.removeChild(canvas7);
      }
    }
    
    function handleMouseDown(e) {
      isDrawing = true;
      lastPoint = getMouse(e, canvas7);
    }
  
    function handleMouseMove(e) {
      if (!isDrawing) { return; }
      
      e.preventDefault();
  
      var currentPoint = getMouse(e, canvas7),
          dist = distanceBetween(lastPoint, currentPoint),
          angle = angleBetween(lastPoint, currentPoint),
          x, y;
      
      for (var i = 0; i < dist; i++) {
        x = lastPoint.x + (Math.sin(angle) * i) - 25;
        y = lastPoint.y + (Math.cos(angle) * i) - 25;
        ctx7.globalCompositeOperation = 'destination-out';
        ctx7.drawImage(brush7, x, y);
      }
      
      lastPoint = currentPoint;
      handlePercentage(getFilledInPixels(32));
    }
  
    function handleMouseUp(e) {
      isDrawing = false;
    }
    
  })();