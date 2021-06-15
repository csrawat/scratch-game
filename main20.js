(function() {
  
    'use strict';
    
    var isDrawing, lastPoint;
    var container20    = document.getElementById('js-container20'),
        canvas20       = document.getElementById('js-canvas20'),
        canvasWidth20  = canvas20.width,
        canvasHeight20 = canvas20.height,
        ctx20          = canvas20.getContext('2d'),
        image20        = new Image(),
        brush20        = new Image();
        
    // base64 Workaround because Same-Origin-Policy
    image20.src = 'data:image/png;base64,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';
    image20.onload = function() {
      ctx20.drawImage(image20, 0, 0);
      // Show the form when Image is loaded.
      document.getElementById('form20').style.visibility = 'visible';
    };
    brush20.src = 'data:image/png;base64,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';
    
    canvas20.addEventListener('mousedown', handleMouseDown, false);
    canvas20.addEventListener('touchstart', handleMouseDown, false);
    canvas20.addEventListener('mousemove', handleMouseMove, false);
    canvas20.addEventListener('touchmove', handleMouseMove, false);
    canvas20.addEventListener('mouseup', handleMouseUp, false);
    canvas20.addEventListener('touchend', handleMouseUp, false);
    
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
      
      var pixels   = ctx20.getImageData(0, 0, canvasWidth20, canvasHeight20),
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
    
    function getMouse(e, canvas20) {
      var offsetX = 0, offsetY = 0, mx, my;
  
      if (canvas20.offsetParent !== undefined) {
        do {
          offsetX += canvas20.offsetLeft;
          offsetY += canvas20.offsetTop;
        } while ((canvas20 = canvas20.offsetParent));
      }
  
      mx = (e.pageX || e.touches[0].clientX) - offsetX;
      my = (e.pageY || e.touches[0].clientY) - offsetY;
  
      return {x: mx, y: my};
    }
    
    function handlePercentage(filledInPixels) {
      filledInPixels = filledInPixels || 0;
      console.log(filledInPixels + '%');
      if (filledInPixels > 50) {
        canvas20.parentNode.removeChild(canvas20);
      }
    }
    
    function handleMouseDown(e) {
      isDrawing = true;
      lastPoint = getMouse(e, canvas20);
    }
  
    function handleMouseMove(e) {
      if (!isDrawing) { return; }
      
      e.preventDefault();
  
      var currentPoint = getMouse(e, canvas20),
          dist = distanceBetween(lastPoint, currentPoint),
          angle = angleBetween(lastPoint, currentPoint),
          x, y;
      
      for (var i = 0; i < dist; i++) {
        x = lastPoint.x + (Math.sin(angle) * i) - 25;
        y = lastPoint.y + (Math.cos(angle) * i) - 25;
        ctx20.globalCompositeOperation = 'destination-out';
        ctx20.drawImage(brush20, x, y);
      }
      
      lastPoint = currentPoint;
      handlePercentage(getFilledInPixels(32));
    }
  
    function handleMouseUp(e) {
      isDrawing = false;
    }
    
  })();