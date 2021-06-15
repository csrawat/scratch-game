(function() {
  
    'use strict';
    
    var isDrawing, lastPoint;
    var container21    = document.getElementById('js-container21'),
        canvas21       = document.getElementById('js-canvas21'),
        canvasWidth21  = canvas21.width,
        canvasHeight21 = canvas21.height,
        ctx21          = canvas21.getContext('2d'),
        image21        = new Image(),
        brush21        = new Image();
        
    // base64 Workaround because Same-Origin-Policy
    image21.src = 'data:image/png;base64,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';
    image21.onload = function() {
      ctx21.drawImage(image21, 0, 0);
      // Show the form when Image is loaded.
      document.getElementById('form21').style.visibility = 'visible';
    };
    brush21.src = 'data:image/png;base64,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';
    
    canvas21.addEventListener('mousedown', handleMouseDown, false);
    canvas21.addEventListener('touchstart', handleMouseDown, false);
    canvas21.addEventListener('mousemove', handleMouseMove, false);
    canvas21.addEventListener('touchmove', handleMouseMove, false);
    canvas21.addEventListener('mouseup', handleMouseUp, false);
    canvas21.addEventListener('touchend', handleMouseUp, false);
    
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
      
      var pixels   = ctx21.getImageData(0, 0, canvasWidth21, canvasHeight21),
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
    
    function getMouse(e, canvas21) {
      var offsetX = 0, offsetY = 0, mx, my;
  
      if (canvas21.offsetParent !== undefined) {
        do {
          offsetX += canvas21.offsetLeft;
          offsetY += canvas21.offsetTop;
        } while ((canvas21 = canvas21.offsetParent));
      }
  
      mx = (e.pageX || e.touches[0].clientX) - offsetX;
      my = (e.pageY || e.touches[0].clientY) - offsetY;
  
      return {x: mx, y: my};
    }
    
    function handlePercentage(filledInPixels) {
      filledInPixels = filledInPixels || 0;
      console.log(filledInPixels + '%');
      if (filledInPixels > 50) {
        canvas21.parentNode.removeChild(canvas21);
      }
    }
    
    function handleMouseDown(e) {
      isDrawing = true;
      lastPoint = getMouse(e, canvas21);
    }
  
    function handleMouseMove(e) {
      if (!isDrawing) { return; }
      
      e.preventDefault();
  
      var currentPoint = getMouse(e, canvas21),
          dist = distanceBetween(lastPoint, currentPoint),
          angle = angleBetween(lastPoint, currentPoint),
          x, y;
      
      for (var i = 0; i < dist; i++) {
        x = lastPoint.x + (Math.sin(angle) * i) - 25;
        y = lastPoint.y + (Math.cos(angle) * i) - 25;
        ctx21.globalCompositeOperation = 'destination-out';
        ctx21.drawImage(brush21, x, y);
      }
      
      lastPoint = currentPoint;
      handlePercentage(getFilledInPixels(32));
    }
  
    function handleMouseUp(e) {
      isDrawing = false;
    }
    
  })();