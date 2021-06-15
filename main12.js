(function() {
  
    'use strict';
    
    var isDrawing, lastPoint;
    var container12    = document.getElementById('js-container12'),
        canvas12       = document.getElementById('js-canvas12'),
        canvasWidth12  = canvas12.width,
        canvasHeight12 = canvas12.height,
        ctx12          = canvas12.getContext('2d'),
        image12        = new Image(),
        brush12        = new Image();
        
    // base64 Workaround because Same-Origin-Policy
    image12.src = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgFBgcGBQgHBgcJCAgJDBMMDAsLDBgREg4THBgdHRsYGxofIywlHyEqIRobJjQnKi4vMTIxHiU2OjYwOiwwMTD/2wBDAQgJCQwKDBcMDBcwIBsgMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDD/wAARCACWAJYDASIAAhEBAxEB/8QAHAABAAIDAQEBAAAAAAAAAAAAAAUGAwQHAQII/8QARRAAAQMDAgIHBAYGBwkAAAAAAQACAwQFEQYhEjEHE0FRYYGRFCJxoTJSscHR4RUjJTNCchYkRGKCk9ImNDVDVIOS8PH/xAAaAQEAAgMBAAAAAAAAAAAAAAAABAUBAgMG/8QAMREAAgICAQIDBgQHAQAAAAAAAAECAwQRIRIxQVFhBRMUIjJxgbHB8CMzQlKR0eGh/9oADAMBAAIRAxEAPwDhCIimmoREQBERAEREAREQBEXuE2DxE7cIgCIiAIiIAiIgCIiAIiIAiL3BxyTa8Q+ByO+EAzjB5+BXQdG2i20tCKm9U8DmNjdPI6dgPCDgAb58D5qwXu12GbSddXUFBRcBppHxTMgDeQ2IyMrlKxxeiEsuDk0lxvRx1ejngb/DdSunbBW3+4GloW7MHFJI4e7G3tJ7z3D81eZ9O2LS9KZ66OGeThy11SQ4yHua3l8l0i1J9O+Syx6o3TcFJJrnlnMcHtHpuvee2R6q0UN7oYKmSSckiQHJbFtn4LcnutmrSIhSRVLn7YezgPk4b5Wk3NW+6itrzJqxKpQ6/erfkUwsIiDyOZI9MfivnGDg7HuKulz0pBT2KCphmll4JpXuomcIqGjhj5jOwGMkgEgEZaFT3vDne7G2NvY1ucfn5rMW9ECUXB6ZiREW5oEREAREQBERAERe52QeJY9OaIu+oKA1tC6nbCJTEeseQQQAeQB23CvOmujG2UhdVairJap7RtDSjhYw95e7c/DA8crB0aXQUGkerMT8yVcha8tJafdZsPEfeFHVFLdL3g6j1A98IOTBAwhvnsB8isOVcVvpbZ5e7MzJXzr61CCfly/sRev7tQuqX2+yVbqmlzmSRwA4jnkCD7w2zn8Fusnlk0W1j5HljaQhrc7dqw60gt9PYIIbZGxjWVOHcOd3cJ5ntK3NO0r6uxUdOxvG6VgbjwJKxCTntzWmd5SSxoOCa+bx7/tk5YKm36X0DLUSwg1EZ4pGk4dJK76Lfhj0wfOgwtqL1cP0ne3yTslJJw7hLgDyG2zQe781YulMCgtVuoWZcZnvmkP1nNAA9OMqFvMvstAGQnAjY2JmNv4cOPmST5rrRGFr6pLhErEoddcrHL5pv76Nu6wWGnp3RRx0jJBjYOLj48yT81ES0bQwyW9/VvcPptO7vAHmFBDGMEZUlYpeGofFn3HN4gPELemUG+iUeC3xK+iHupPbb3s2rRXvFPDRyOcHRyyPYc7g4YOf+H5LSvbCyrLiA7rPeDu3z7/NK/8Aq92Dxtu2T8fvWzf2jqI343a4jPxH5LfpTra8UyVLcoOMvAhkRFGIoREQBERAEREAREQFms+t7hatNyWKKkopaV8xn4po3Oe15AGQeIAY4R2LQkv10q3ta6pc0FwHDH7md+8b/NRC2be9sdwp3SfRbKwnbxCb12OEqauZOO2Sl8ld7GyIOPVmXi4ee4BGSPM+q6XoyOnotO2+TgJdPThxeeexO32bqodINZbKyjgfR7ziY8bzE5m3CeeQFOaTuWNGcUr+t/R0EjgD7mRji6vO+/Pfx8F29qOUuuWtaS/0U+TK6+iucI6e+z/FGj0uU09W63S0sUkscbZGvcxpIaSW4BxyJUJqS3yxWJs8gP7xgx2DZWGl6UrZBCYxp2SUEAfrKwE7cv4PsUHq7W8N/tnsEVsNKwStkDzOHkAAjGOEd6rsW+5RcJVtevBPjRfGNe2uO+inqV0vSvrLqI2bYY5xOM4CiiOfbhdK6IdPVVRFU3FkZDJT1LJHDAwN3H1wPIrXMyPh6XPx8C8wVGWRGUuy5f4FR1VSCO8w00LTkxMGOZJOcfcsuqojT5ge0tLJu0Y7D+IUvZ2x3/pPkq2PEtJSSGo4hsHsiwGf+Tg0f4li6U5opLvC1uTMYy+Y95yceex9VjFznCxUSW3KPPoyTelbC2+PC6lopfYiIp/qVQREWAEREAREQBERAFsUTWuq4g7iIL2j5ha62bXvcaUHl1zftC1k2k2jpXzNbWyza1t0dHSxSQlxaZeH3+Y2PapiiMEXR+5gfh76d7nNIOS4g7/cnSpj9EUoB/tG+B/dK0X3CCTR9LSQjMzaUh7uQaN9vjsqevLuyceFk3vb5/6W2V7LxcnJlUotRik0k/H/AEUfAJzyQDKFZqKkkrKlkEfCC7m5xw1viSrhyUVt9iojCU5dEVt+RJaSsM+or5T2+Fwia8/rZTyYwAkn44Gw7Sut9I99pdH6SisdqIiqJoepiYD70UXJzz48wD2kk9iqlvq6HR9DFVwObM9rmuaAcOqHg5we4dngpTQOna3Ut4drHVABjLusp43tw1xHJ2DyY3kB4A+J8vl2q+ayLv5UOy8ZSLnJw/g9Vp7sa59P2jXslBFo7SwnuBEVdXtbPM0neOIZDGHxO5I55x3LmlyrZLhXTVU5JdK7OO4dg9MKx9IuomXu9zupjxRNcQH/AFhn3QPAD5kqpK5waHFO+1fPLl/v0IeXZGMY49faPf1YREViV4REQBERAEREAREQBZqJ3V1cL/qvafmsKy0/79g/vD7VrJcM6VfWvuWnW95lulFDE+JsbWSF2QcknC0qccNlbvzhdj1KxX//AHdng/7lM26kYNLOmO7jSv3PZueSrEo0UxS8/wAz1qjvMtiv7CoQ08k8zIYRxyPPC1o7VfqGnpNM2l8tS4F5x1sjd3Pd2Nbn/wB7Vg6OrCx9I+6VRLC7LISf4Wg4c71BHkVodXJq/UXs8D3Nt9PuX4xhmccXxPZ+RXDJu+IsdbeoR+p/oRcBQwqffa3bPiK8vUyWCzz6puZuFe0x0YOA1oxxH6o8O8+PpbelLXQo6WTT1nLRMYxHVSx8om4wYmeRwe4cs9kdrG/R2CgZbbYxsdS5mGcP/JZ3/E/muaPeXuc5zi4uJJJ33K54+M8yyORatQj9K/VkDOtUF7tPcu8n6s+cdx8l4vcrxX5UPjgIiLJgIiIAiIgCIiAIiIAstMCamIDm54A9ViWWlcWVETu1r2kfHKw1vjxMp6ey160oxR22BgYQTNu5w3dspCgZ/sY1o3c6mcAB35IWPX9R7RY6EglwMucn+U7KwaThjfpu3te0H3A5xIzydnzVbZQ7KPlelDl79PA9biZcbcqyxLvHRp6vqY7JpEUFKffextK3GxxjDifiAfVNBW91DpmeulaY4wx1TUzEZ9xvJo7zjO3isPTM+m9msxpoWQ9Y2YytZkDI4Owbd/qujNsMV20BS2ZsrqWKejhDpIxk7BpPmcYPfleestVeHXv+uW2/s9MjSyIxyJuMeYx0t+D8z88V1XNcK2arqCXyyu4neHh9notcZOfDvXV7n0WWegYf2vUvlxswMZsfHdfDeiSjIH7SnPeOqDfnuvU4d9WTH+Anpemjxub7Rx8WzpyJrqf4nKxv/wDF5ju3+C64Oii0gZkuNwH8jGP+3CqXSLpa3aY9iFBV1NSajrOsFQxg4OHhxjhJ7ypjjKPLRzx/aeNkS93VLbfgVBERYLEIiIAiIgCIiAIiIAvuE/rWfzD7V8INjkcwiemn5Au1RQVF8tMdJC9jH08vGTITjhIPLAPaVddEW2b2KG2yTR8cMWxwcOOc45LktPe7jTPL6epMbiME8Dd/kt2m1lf6WYSwXAscDkHqY/8ASoPtOizInNYz1GX5vv8A+8kzFvVElI6HrfQt1vU9L1ctLTxQtk45JnHh33zsD9X7FX3aa1TE/qYtQl7WYa3gqpw3HZjZREvSNquaGSKW7F0creF7fZ4hkHn/AArTGsb4G49sGAMAdRH/AKVBxMbMqrULXFpduCL7RtuvfXjtKT777E27S2oHP4nXsEnYkzSkn5LNJpPUrHYbqNr/ABbUS/goD+m1/wD+uH+Uz8EGs76P7bn/ALTPwVpV76H1Ja9OChnj58nvcP8AH/C0WnTuoqS409TU3oyQxyse9gqJTxAEEjcLU6V2/wDDiCM5m7Dv9BQQ1rqDO9eP8ln4LRu98r7w2IXCfrepyWYY1uCcZ5Adw9FJ6/la13NacHK+KjfdKPG+y14EaiIsF8EREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAe4TCItTIwmERAMJhEQDCYREAwmERAMJhEQDCYREAwmERAMJhEQDCIiA//Z';

    image12.onload = function() {
      ctx12.drawImage(image12, 0, 0);
      // Show the form when Image is loaded.
      document.getElementById('form12').style.visibility = 'visible';
    };

    brush12.src = 'data:image/png;base64,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';
    
    canvas12.addEventListener('mousedown', handleMouseDown, false);
    canvas12.addEventListener('touchstart', handleMouseDown, false);
    canvas12.addEventListener('mousemove', handleMouseMove, false);
    canvas12.addEventListener('touchmove', handleMouseMove, false);
    canvas12.addEventListener('mouseup', handleMouseUp, false);
    canvas12.addEventListener('touchend', handleMouseUp, false);
    
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
      
      var pixels   = ctx12.getImageData(0, 0, canvasWidth12, canvasHeight12),
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
    
    function getMouse(e, canvas12) {
      var offsetX = 0, offsetY = 0, mx, my;
  
      if (canvas12.offsetParent !== undefined) {
        do {
          offsetX += canvas12.offsetLeft;
          offsetY += canvas12.offsetTop;
        } while ((canvas12 = canvas12.offsetParent));
      }
  
      mx = (e.pageX || e.touches[0].clientX) - offsetX;
      my = (e.pageY || e.touches[0].clientY) - offsetY;
  
      return {x: mx, y: my};
    }
    
    function handlePercentage(filledInPixels) {
      filledInPixels = filledInPixels || 0;
      console.log(filledInPixels + '%');
      if (filledInPixels > 50) {
        canvas12.parentNode.removeChild(canvas12);
      }
    }
    
    function handleMouseDown(e) {
      isDrawing = true;
      lastPoint = getMouse(e, canvas12);
    }
  
    function handleMouseMove(e) {
      if (!isDrawing) { return; }
      
      e.preventDefault();
  
      var currentPoint = getMouse(e, canvas12),
          dist = distanceBetween(lastPoint, currentPoint),
          angle = angleBetween(lastPoint, currentPoint),
          x, y;
      
      for (var i = 0; i < dist; i++) {
        x = lastPoint.x + (Math.sin(angle) * i) - 25;
        y = lastPoint.y + (Math.cos(angle) * i) - 25;
        ctx12.globalCompositeOperation = 'destination-out';
        ctx12.drawImage(brush12, x, y);
      }
      
      lastPoint = currentPoint;
      handlePercentage(getFilledInPixels(32));
    }
  
    function handleMouseUp(e) {
      isDrawing = false;
    }
    
  })();