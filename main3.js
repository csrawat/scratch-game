(function() {
  
    'use strict';
    
    var isDrawing, lastPoint;
    var container3    = document.getElementById('js-container3'),
        canvas3       = document.getElementById('js-canvas3'),
        canvasWidth3  = canvas3.width,
        canvasHeight3 = canvas3.height,
        ctx3          = canvas3.getContext('2d'),
        image3        = new Image(),
        brush3        = new Image();
        
    // base64 Workaround because Same-Origin-Policy
    image3.src = 'data:image/jpeg;base64,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';
    image3.onload = function() {
      ctx3.drawImage(image3, 0, 0);
      // Show the form when Image is loaded.
      document.getElementById('form3').style.visibility = 'visible';
    };
    brush3.src = 'data:image/png;base64,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';
    
    canvas3.addEventListener('mousedown', handleMouseDown, false);
    canvas3.addEventListener('touchstart', handleMouseDown, false);
    canvas3.addEventListener('mousemove', handleMouseMove, false);
    canvas3.addEventListener('touchmove', handleMouseMove, false);
    canvas3.addEventListener('mouseup', handleMouseUp, false);
    canvas3.addEventListener('touchend', handleMouseUp, false);
    
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
      
      var pixels   = ctx3.getImageData(0, 0, canvasWidth3, canvasHeight3),
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
    
    function getMouse(e, canvas3) {
      var offsetX = 0, offsetY = 0, mx, my;
  
      if (canvas3.offsetParent !== undefined) {
        do {
          offsetX += canvas3.offsetLeft;
          offsetY += canvas3.offsetTop;
        } while ((canvas3 = canvas3.offsetParent));
      }
  
      mx = (e.pageX || e.touches[0].clientX) - offsetX;
      my = (e.pageY || e.touches[0].clientY) - offsetY;
  
      return {x: mx, y: my};
    }
    
    function handlePercentage(filledInPixels) {
      filledInPixels = filledInPixels || 0;
      console.log(filledInPixels + '%');
      if (filledInPixels > 50) {
        canvas3.parentNode.removeChild(canvas3);
      }
    }
    
    function handleMouseDown(e) {
      isDrawing = true;
      lastPoint = getMouse(e, canvas3);
    }
  
    function handleMouseMove(e) {
      if (!isDrawing) { return; }
      
      e.preventDefault();
  
      var currentPoint = getMouse(e, canvas3),
          dist = distanceBetween(lastPoint, currentPoint),
          angle = angleBetween(lastPoint, currentPoint),
          x, y;
      
      for (var i = 0; i < dist; i++) {
        x = lastPoint.x + (Math.sin(angle) * i) - 25;
        y = lastPoint.y + (Math.cos(angle) * i) - 25;
        ctx3.globalCompositeOperation = 'destination-out';
        ctx3.drawImage(brush3, x, y);
      }
      
      lastPoint = currentPoint;
      handlePercentage(getFilledInPixels(32));
    }
  
    function handleMouseUp(e) {
      isDrawing = false;
    }
    
  })();