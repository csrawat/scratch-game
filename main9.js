(function() {
  
    'use strict';
    
    var isDrawing, lastPoint;
    var container9    = document.getElementById('js-container9'),
        canvas9       = document.getElementById('js-canvas9'),
        canvasWidth9  = canvas9.width,
        canvasHeight9 = canvas9.height,
        ctx9          = canvas9.getContext('2d'),
        image9        = new Image(),
        brush9        = new Image();
        
    // base64 Workaround because Same-Origin-Policy
    image9.src = 'data:image/jpeg;base64,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';
    image9.onload = function() {
      ctx9.drawImage(image9, 0, 0);
      // Show the form when Image is loaded.
      document.getElementById('form9').style.visibility = 'visible';
    };
    brush9.src = 'data:image/png;base64,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';
    
    canvas9.addEventListener('mousedown', handleMouseDown, false);
    canvas9.addEventListener('touchstart', handleMouseDown, false);
    canvas9.addEventListener('mousemove', handleMouseMove, false);
    canvas9.addEventListener('touchmove', handleMouseMove, false);
    canvas9.addEventListener('mouseup', handleMouseUp, false);
    canvas9.addEventListener('touchend', handleMouseUp, false);
    
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
      
      var pixels   = ctx9.getImageData(0, 0, canvasWidth9, canvasHeight9),
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
    
    function getMouse(e, canvas9) {
      var offsetX = 0, offsetY = 0, mx, my;
  
      if (canvas9.offsetParent !== undefined) {
        do {
          offsetX += canvas9.offsetLeft;
          offsetY += canvas9.offsetTop;
        } while ((canvas9 = canvas9.offsetParent));
      }
  
      mx = (e.pageX || e.touches[0].clientX) - offsetX;
      my = (e.pageY || e.touches[0].clientY) - offsetY;
  
      return {x: mx, y: my};
    }
    
    function handlePercentage(filledInPixels) {
      filledInPixels = filledInPixels || 0;
      console.log(filledInPixels + '%');
      if (filledInPixels > 50) {
        canvas9.parentNode.removeChild(canvas9);
      }
    }
    
    function handleMouseDown(e) {
      isDrawing = true;
      lastPoint = getMouse(e, canvas9);
    }
  
    function handleMouseMove(e) {
      if (!isDrawing) { return; }
      
      e.preventDefault();
  
      var currentPoint = getMouse(e, canvas9),
          dist = distanceBetween(lastPoint, currentPoint),
          angle = angleBetween(lastPoint, currentPoint),
          x, y;
      
      for (var i = 0; i < dist; i++) {
        x = lastPoint.x + (Math.sin(angle) * i) - 25;
        y = lastPoint.y + (Math.cos(angle) * i) - 25;
        ctx9.globalCompositeOperation = 'destination-out';
        ctx9.drawImage(brush9, x, y);
      }
      
      lastPoint = currentPoint;
      handlePercentage(getFilledInPixels(32));
    }
  
    function handleMouseUp(e) {
      isDrawing = false;
    }
    
  })();