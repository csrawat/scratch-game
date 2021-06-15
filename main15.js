(function() {
  
    'use strict';
    
    var isDrawing, lastPoint;
    var container15    = document.getElementById('js-container15'),
        canvas15       = document.getElementById('js-canvas15'),
        canvasWidth15  = canvas15.width,
        canvasHeight15 = canvas15.height,
        ctx15          = canvas15.getContext('2d'),
        image15        = new Image(),
        brush15        = new Image();
        
    // base64 Workaround because Same-Origin-Policy
    image15.src = 'data:image/jpeg;base64,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';
    image15.onload = function() {
      ctx15.drawImage(image15, 0, 0);
      // Show the form when Image is loaded.
      document.getElementById('form15').style.visibility = 'visible';
    };
    brush15.src = 'data:image/png;base64,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';
    
    canvas15.addEventListener('mousedown', handleMouseDown, false);
    canvas15.addEventListener('touchstart', handleMouseDown, false);
    canvas15.addEventListener('mousemove', handleMouseMove, false);
    canvas15.addEventListener('touchmove', handleMouseMove, false);
    canvas15.addEventListener('mouseup', handleMouseUp, false);
    canvas15.addEventListener('touchend', handleMouseUp, false);
    
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
      
      var pixels   = ctx15.getImageData(0, 0, canvasWidth15, canvasHeight15),
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
    
    function getMouse(e, canvas15) {
      var offsetX = 0, offsetY = 0, mx, my;
  
      if (canvas15.offsetParent !== undefined) {
        do {
          offsetX += canvas15.offsetLeft;
          offsetY += canvas15.offsetTop;
        } while ((canvas15 = canvas15.offsetParent));
      }
  
      mx = (e.pageX || e.touches[0].clientX) - offsetX;
      my = (e.pageY || e.touches[0].clientY) - offsetY;
  
      return {x: mx, y: my};
    }
    
    function handlePercentage(filledInPixels) {
      filledInPixels = filledInPixels || 0;
      console.log(filledInPixels + '%');
      if (filledInPixels > 50) {
        canvas15.parentNode.removeChild(canvas15);
      }
    }
    
    function handleMouseDown(e) {
      isDrawing = true;
      lastPoint = getMouse(e, canvas15);
    }
  
    function handleMouseMove(e) {
      if (!isDrawing) { return; }
      
      e.preventDefault();
  
      var currentPoint = getMouse(e, canvas15),
          dist = distanceBetween(lastPoint, currentPoint),
          angle = angleBetween(lastPoint, currentPoint),
          x, y;
      
      for (var i = 0; i < dist; i++) {
        x = lastPoint.x + (Math.sin(angle) * i) - 25;
        y = lastPoint.y + (Math.cos(angle) * i) - 25;
        ctx15.globalCompositeOperation = 'destination-out';
        ctx15.drawImage(brush15, x, y);
      }
      
      lastPoint = currentPoint;
      handlePercentage(getFilledInPixels(32));
    }
  
    function handleMouseUp(e) {
      isDrawing = false;
    }
    
  })();