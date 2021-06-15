(function() {
  
    'use strict';
    
    var isDrawing, lastPoint;
    var container1    = document.getElementById('js-container1'),
        canvas1       = document.getElementById('js-canvas1'),
        canvasWidth1  = canvas1.width,
        canvasHeight1 = canvas1.height,
        ctx1          = canvas1.getContext('2d'),
        image1        = new Image(),
        brush1        = new Image();
        
    // base64 Workaround because Same-Origin-Policy
    image1.src = 'data:image/jpeg;base64,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';
    image1.onload = function() {
      ctx1.drawImage(image1, 0, 0);
      // Show the form when Image is loaded.
      document.getElementById('form1').style.visibility = 'visible';
    };
    brush1.src = 'data:image/png;base64,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';
    
    canvas1.addEventListener('mousedown', handleMouseDown, false);
    canvas1.addEventListener('touchstart', handleMouseDown, false);
    canvas1.addEventListener('mousemove', handleMouseMove, false);
    canvas1.addEventListener('touchmove', handleMouseMove, false);
    canvas1.addEventListener('mouseup', handleMouseUp, false);
    canvas1.addEventListener('touchend', handleMouseUp, false);
    
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
      
      var pixels   = ctx1.getImageData(0, 0, canvasWidth1, canvasHeight1),
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
    
    function getMouse(e, canvas1) {
      var offsetX = 0, offsetY = 0, mx, my;
  
      if (canvas1.offsetParent !== undefined) {
        do {
          offsetX += canvas1.offsetLeft;
          offsetY += canvas1.offsetTop;
        } while ((canvas1 = canvas1.offsetParent));
      }
  
      mx = (e.pageX || e.touches[0].clientX) - offsetX;
      my = (e.pageY || e.touches[0].clientY) - offsetY;
  
      return {x: mx, y: my};
    }
    
    function handlePercentage(filledInPixels) {
      filledInPixels = filledInPixels || 0;
      console.log(filledInPixels + '%');
      if (filledInPixels > 50) {
        canvas1.parentNode.removeChild(canvas1);
      }
    }
    
    function handleMouseDown(e) {
      isDrawing = true;
      lastPoint = getMouse(e, canvas1);
    }
  
    function handleMouseMove(e) {
      if (!isDrawing) { return; }
      
      e.preventDefault();
  
      var currentPoint = getMouse(e, canvas1),
          dist = distanceBetween(lastPoint, currentPoint),
          angle = angleBetween(lastPoint, currentPoint),
          x, y;
      
      for (var i = 0; i < dist; i++) {
        x = lastPoint.x + (Math.sin(angle) * i) - 25;
        y = lastPoint.y + (Math.cos(angle) * i) - 25;
        ctx1.globalCompositeOperation = 'destination-out';
        ctx1.drawImage(brush1, x, y);
      }
      
      lastPoint = currentPoint;
      handlePercentage(getFilledInPixels(32));
    }
  
    function handleMouseUp(e) {
      isDrawing = false;
    }
    
  })();