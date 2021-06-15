(function() {
  
    'use strict';
    
    var isDrawing, lastPoint;
    var container19    = document.getElementById('js-container19'),
        canvas19       = document.getElementById('js-canvas19'),
        canvasWidth19  = canvas19.width,
        canvasHeight19 = canvas19.height,
        ctx19          = canvas19.getContext('2d'),
        image19        = new Image(),
        brush19        = new Image();
        
    // base64 Workaround because Same-Origin-Policy
    image19.src = 'data:image/jpeg;base64,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';
    image19.onload = function() {
      ctx19.drawImage(image19, 0, 0);
      // Show the form when Image is loaded.
      document.getElementById('form19').style.visibility = 'visible';
    };
    brush19.src = 'data:image/png;base64,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';
    
    canvas19.addEventListener('mousedown', handleMouseDown, false);
    canvas19.addEventListener('touchstart', handleMouseDown, false);
    canvas19.addEventListener('mousemove', handleMouseMove, false);
    canvas19.addEventListener('touchmove', handleMouseMove, false);
    canvas19.addEventListener('mouseup', handleMouseUp, false);
    canvas19.addEventListener('touchend', handleMouseUp, false);
    
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
      
      var pixels   = ctx19.getImageData(0, 0, canvasWidth19, canvasHeight19),
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
    
    function getMouse(e, canvas19) {
      var offsetX = 0, offsetY = 0, mx, my;
  
      if (canvas19.offsetParent !== undefined) {
        do {
          offsetX += canvas19.offsetLeft;
          offsetY += canvas19.offsetTop;
        } while ((canvas19 = canvas19.offsetParent));
      }
  
      mx = (e.pageX || e.touches[0].clientX) - offsetX;
      my = (e.pageY || e.touches[0].clientY) - offsetY;
  
      return {x: mx, y: my};
    }
    
    function handlePercentage(filledInPixels) {
      filledInPixels = filledInPixels || 0;
      console.log(filledInPixels + '%');
      if (filledInPixels > 50) {
        canvas19.parentNode.removeChild(canvas19);
      }
    }
    
    function handleMouseDown(e) {
      isDrawing = true;
      lastPoint = getMouse(e, canvas19);
    }
  
    function handleMouseMove(e) {
      if (!isDrawing) { return; }
      
      e.preventDefault();
  
      var currentPoint = getMouse(e, canvas19),
          dist = distanceBetween(lastPoint, currentPoint),
          angle = angleBetween(lastPoint, currentPoint),
          x, y;
      
      for (var i = 0; i < dist; i++) {
        x = lastPoint.x + (Math.sin(angle) * i) - 25;
        y = lastPoint.y + (Math.cos(angle) * i) - 25;
        ctx19.globalCompositeOperation = 'destination-out';
        ctx19.drawImage(brush19, x, y);
      }
      
      lastPoint = currentPoint;
      handlePercentage(getFilledInPixels(32));
    }
  
    function handleMouseUp(e) {
      isDrawing = false;
    }
    
  })();