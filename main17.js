(function() {
  
    'use strict';
    
    var isDrawing, lastPoint;
    var container17    = document.getElementById('js-container17'),
        canvas17       = document.getElementById('js-canvas17'),
        canvasWidth17  = canvas17.width,
        canvasHeight17 = canvas17.height,
        ctx17          = canvas17.getContext('2d'),
        image17        = new Image(),
        brush17        = new Image();
        
    // base64 Workaround because Same-Origin-Policy
    image17.src = 'data:image/png;base64,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';
    image17.onload = function() {
      ctx17.drawImage(image17, 0, 0);
      // Show the form when Image is loaded.
      document.getElementById('form17').style.visibility = 'visible';
    };
    brush17.src = 'data:image/png;base64,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';
    
    canvas17.addEventListener('mousedown', handleMouseDown, false);
    canvas17.addEventListener('touchstart', handleMouseDown, false);
    canvas17.addEventListener('mousemove', handleMouseMove, false);
    canvas17.addEventListener('touchmove', handleMouseMove, false);
    canvas17.addEventListener('mouseup', handleMouseUp, false);
    canvas17.addEventListener('touchend', handleMouseUp, false);
    
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
      
      var pixels   = ctx17.getImageData(0, 0, canvasWidth17, canvasHeight17),
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
    
    function getMouse(e, canvas17) {
      var offsetX = 0, offsetY = 0, mx, my;
  
      if (canvas17.offsetParent !== undefined) {
        do {
          offsetX += canvas17.offsetLeft;
          offsetY += canvas17.offsetTop;
        } while ((canvas17 = canvas17.offsetParent));
      }
  
      mx = (e.pageX || e.touches[0].clientX) - offsetX;
      my = (e.pageY || e.touches[0].clientY) - offsetY;
  
      return {x: mx, y: my};
    }
    
    function handlePercentage(filledInPixels) {
      filledInPixels = filledInPixels || 0;
      console.log(filledInPixels + '%');
      if (filledInPixels > 50) {
        canvas17.parentNode.removeChild(canvas17);
      }
    }
    
    function handleMouseDown(e) {
      isDrawing = true;
      lastPoint = getMouse(e, canvas17);
    }
  
    function handleMouseMove(e) {
      if (!isDrawing) { return; }
      
      e.preventDefault();
  
      var currentPoint = getMouse(e, canvas17),
          dist = distanceBetween(lastPoint, currentPoint),
          angle = angleBetween(lastPoint, currentPoint),
          x, y;
      
      for (var i = 0; i < dist; i++) {
        x = lastPoint.x + (Math.sin(angle) * i) - 25;
        y = lastPoint.y + (Math.cos(angle) * i) - 25;
        ctx17.globalCompositeOperation = 'destination-out';
        ctx17.drawImage(brush17, x, y);
      }
      
      lastPoint = currentPoint;
      handlePercentage(getFilledInPixels(32));
    }
  
    function handleMouseUp(e) {
      isDrawing = false;
    }
    
  })();