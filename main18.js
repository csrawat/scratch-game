(function() {
  
    'use strict';
    
    var isDrawing, lastPoint;
    var container18    = document.getElementById('js-container18'),
        canvas18       = document.getElementById('js-canvas18'),
        canvasWidth18  = canvas18.width,
        canvasHeight18 = canvas18.height,
        ctx18          = canvas18.getContext('2d'),
        image18        = new Image(),
        brush18        = new Image();
        
    // base64 Workaround because Same-Origin-Policy
    image18.src = 'data:image/jpeg;base64,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';
    image18.onload = function() {
      ctx18.drawImage(image18, 0, 0);
      // Show the form when Image is loaded.
      document.getElementById('form18').style.visibility = 'visible';
    };
    brush18.src = 'data:image/png;base64,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';
    
    canvas18.addEventListener('mousedown', handleMouseDown, false);
    canvas18.addEventListener('touchstart', handleMouseDown, false);
    canvas18.addEventListener('mousemove', handleMouseMove, false);
    canvas18.addEventListener('touchmove', handleMouseMove, false);
    canvas18.addEventListener('mouseup', handleMouseUp, false);
    canvas18.addEventListener('touchend', handleMouseUp, false);
    
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
      
      var pixels   = ctx18.getImageData(0, 0, canvasWidth18, canvasHeight18),
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
    
    function getMouse(e, canvas18) {
      var offsetX = 0, offsetY = 0, mx, my;
  
      if (canvas18.offsetParent !== undefined) {
        do {
          offsetX += canvas18.offsetLeft;
          offsetY += canvas18.offsetTop;
        } while ((canvas18 = canvas18.offsetParent));
      }
  
      mx = (e.pageX || e.touches[0].clientX) - offsetX;
      my = (e.pageY || e.touches[0].clientY) - offsetY;
  
      return {x: mx, y: my};
    }
    
    function handlePercentage(filledInPixels) {
      filledInPixels = filledInPixels || 0;
      console.log(filledInPixels + '%');
      if (filledInPixels > 50) {
        canvas18.parentNode.removeChild(canvas18);
      }
    }
    
    function handleMouseDown(e) {
      isDrawing = true;
      lastPoint = getMouse(e, canvas18);
    }
  
    function handleMouseMove(e) {
      if (!isDrawing) { return; }
      
      e.preventDefault();
  
      var currentPoint = getMouse(e, canvas18),
          dist = distanceBetween(lastPoint, currentPoint),
          angle = angleBetween(lastPoint, currentPoint),
          x, y;
      
      for (var i = 0; i < dist; i++) {
        x = lastPoint.x + (Math.sin(angle) * i) - 25;
        y = lastPoint.y + (Math.cos(angle) * i) - 25;
        ctx18.globalCompositeOperation = 'destination-out';
        ctx18.drawImage(brush18, x, y);
      }
      
      lastPoint = currentPoint;
      handlePercentage(getFilledInPixels(32));
    }
  
    function handleMouseUp(e) {
      isDrawing = false;
    }
    
  })();