(function() {
  
    'use strict';
    
    var isDrawing, lastPoint;
    var container5    = document.getElementById('js-container5'),
        canvas5       = document.getElementById('js-canvas5'),
        canvasWidth5  = canvas5.width,
        canvasHeight5 = canvas5.height,
        ctx5          = canvas5.getContext('2d'),
        image5        = new Image(),
        brush5        = new Image();
        
    // base64 Workaround because Same-Origin-Policy
    image5.src = 'data:image/jpeg;base64,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';
    image5.onload = function() {
      ctx5.drawImage(image5, 0, 0);
      // Show the form when Image is loaded.
      document.getElementById('form5').style.visibility = 'visible';
    };
    brush5.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAAxCAYAAABNuS5SAAAKFklEQVR42u2aCXCcdRnG997NJtlkk83VJE3apEma9CQlNAR60UqrGSqW4PQSO9iiTkE8BxWtlGMqYCtYrLRQtfVGMoJaGRFliijaViwiWgQpyCEdraI1QLXG52V+n/5nzd3ENnX/M8/sJvvt933/533e81ufL7MyK7NOzuXPUDD0FQCZlVn/+xUUQhkXHny8M2TxGsq48MBjXdAhL9/7YN26dd5nI5aVRrvEc0GFEBNKhbDjwsHh3qP/FJK1EdYIedOFlFAOgREhPlICifZDYoBjTna3LYe4xcI4oSpNcf6RvHjuAJRoVszD0qFBGmgMChipZGFxbqzQkJWVZUSOF7JRX3S4LtLTeyMtkkqljMBkPzHRs2aYY5PcZH/qLY1EIo18byQ6hBytIr3WCAXcV4tQHYvFxg3w3N6+Bh3OQolEoqCoqCinlw16JzTFJSE6PYuZKqvztbC2ex7bzGxhKu+rerjJrEEq+r9ieElJSXFDQ0Mh9zYzOzu7FBUWcO4Q9xbD6HYvhXhGLccVD5ZAPyfMqaioyOrBUgEv8FZXV8caGxtz8vLykhCWTnZIKmsKhUJnEYeKcKk2YYERH41G7UYnck1/WvAPOxsdLJm2+bEY0Ay0RNeqkytXQkoBZM4U5oOaoYSUkBGRtvnesrBZK4e4F6ypqSkuLy+v4KI99ZQxkfc6vZ4jNAl1wkbhG8LrhfNBCdkxmhYacvj/GOce+3K9MHHbDHUmicOufREELRIWch/DljzMsglutr+VIJO5KjGrVfZAnpF8mnCd8G5hrnC60Cl8T/iw8C1hKd9P9eDCMcgo5HwBx8BB/g7xeRPkrBbeJ3xTeAxjvRGVV3NcshfPG1JX4tVDQae47GuVOknCi23xHr5nyrxe2C1sFlYJ7xe+Jlwm7BRulItP0ms957RzTMK1ws41jMS8eDxehopaOCYfxc3AIHcIX+K6nxW+ImyVF1i8PQ8DTuwtdC1atCja3NwcHkq5EuXmo85G+jq+yMm28V4q/zcIPxV+K9zPxnbgTi0ocybu6wX66fx/vfAB4T1gHt8xI1wlXMF5zEXnQKC56ruEjwhvEa4WrrXvK/Yt5Pt5I1UveeVKyKmT+lpG2gQ2npMmez8ZzFT3e+HXwj7hKXNf6rFZbDpJUjESLdFsFX4mfFv4Fd/7qPBm4UPCJ4RNwncwym4UfYVUtiAcDk/T+3NRmylwWzAY7BCBCwYYogZPnrJoRNm2IDc3tw4FVKXFm95UmGLzkTTFpog524WnhQPCQeGvwiPCCuFCYmk5GbEJt3tOeF54HPVeLLyXxHOv8BPhYaFLeFU4gsI7OWeZk3g+hpJNvVMGIIqhdRvy+biVISouq2TBqWxoIL1wgBhU5AR1SzJvFR4UnhX+Bl4RfsFGP0npUkTymIQ7fh8Cf4l6F0LgXkj6o3O+buGfwj+ElzGQETaNeJqPhxiahckYq8KJ9V6mP+4pTIATjsGCA8lCQVy9VbhB2CM8itu9IBxlkx6O4nbmmpcSi0KUExa3Psfn23DZC4lhlhRuIWs/R1Y9BrpR4WHcfiOq34bLl5DJm1B7BANPGO4+2OJfDcVwX+RZkL5d+DRqeRJ360IJx1CFp4w/8/lhVGXxay1xKp8asQ31rSbgz2az1aBBWCZsgKTfEFe7uM4xYus9KHWXcBv3eolwJe67hJLIN6yubMVpW1tbbllZWVxtzjRquvQe9981IG3RZHUQttH7hB8IP0cdLwp/YnNHcdsjEP1xsEruO56i2Fy3UWXMskAgYAH/EjOiCD6NDc/XZ4v12RqSy3WQ9rJD3jPClwkZz2Aoy8JnUEjPcwYWfgfHvcIW84h308mABQP4Xp02OY44M4tSZSfx7UXIewU3NpXuxw0vJzauYDP1XM8y8Ttx67fhylYrdlAMW1x7h/BF3NWI+4PwFwjbSha26/xQuBmib6HDqeI+m4m5wzrj9A/xO+O5qbm4yizcbDOKfAjVWeC/WzAFLSeI+4hN9WzQ65EvED7D8Tt4vwE33O64rIfD1JW3k6xeQoX3UN6chyG8In4tcbHuRAyKw2ktVIIM2U5XcA7t2FKy5vWQeBexbbrTpvmZiJwN6e3EwKspW/ajqBuAKfKQk8m7KIce5bgnMNQDkLWPUmkj511DSVV5HJOd417FzrDAK7RjZLMZiURigmLVFCYs5tI2PFhpcUj/n6z6sp72LwJKiU2rUdp62rA7IX4XytpJ3Weh4XfE1/0kk/uoFX8kbCHudZLld5E8vJIs2+mbT8iznaR60DHMBt0EE1DySVlSsOBvyrL6zkZG5qI2T/QSBYTHMYAlq2tw1+0MFO4kVj5GSbSbgvkA8fQQr1uIdfdD5mZ1GhZbP0XfuwlPmOp0SNkYbkQV2JdlEsq69VJS+rTER+NtZVC+TX+NRFq1XGeiHXbGUHMg6lk2/DiZ+mHU8wTueoTXLtS3F5e9l2PNZW9lyrOB5LGSmJokzMQ6OjqCA3wsMXLLhqrWoZgKe3lyZ5YtLiwsLLfMLhJL0ibW3rKa7oMQ+Ajq6gKHcMeHeP8qZcpRMvyt1J97SRabcNP1ZGsbKhSb6lF+5GR6shUnlqTSyPM7LZxV/PUqjOfTH6cvqx+XyN3aCfBPUWh3UZIcxC2/jgu/BJ7Eve/G1R/EXS9gaLCc0dgySqIm7jV4MhEYdAaN4R4eRHkBusJp3GNp56iSOscyYN0DaUch8Ai13X6yrg0PvotCO8nme0geKymBaulc1qO+NbxOOpHZtrcHR+nT6+wePvcnk8k8qv6iNBdyH4/OoGR5gXbv75D4NIX3NoruLSjtKmLlbTwCKER1NmV+QIqfS13aai0izUHsRKksAQE5g0w4fuehj9f+xb25Ym1tbcIhuw2COmkBn2cAcQAFbsclV1BTns49JZio3EQWPkgCySJpFIu8aor0UfeLigDTlUTa/8eimhRGuUiKOZPYtYNabh9EGik3Mkk+A9I8JTWoAiik/LEpzY8tY4uwWc4AJMjxQd8oXRHU8JqbW32orNyAiubZo0WR5wX9KyHrLpLD52nrxhFHa1CVV5w3081cRu/7BYichpEqfafA7/sCzhT7tVkhLZvhTeB8Gv1r6U+ty/gqtWHQCSNTcPOl9NmXM1S4hgRjBjjL1MdUJ8cx3uhe3d3dfh5Meb8qyKWsuJRidwtN/h20XEtxvTwya7tKncU8ACqmXVwLict5fy6TnFhra2uW7xT8dWk2BHptVBOx8GLKjo3g7bhrBQq1sdVsCvEkhLZIac1y/zmUSO0oO8fX/0P2Ub3cwaWpZSITnLnOpDlBWTIfMleJqFb10jXCBJUlMyORSIP14LhqNef6v/05bpZTdHulUyXKsufDNdRxZ4vIhSKwhQFG5vfLfcwZsx2X92Jhje8/P8OI+TK/oO+zeA84WTzkvI/6RuB3y6f68qf11xnyMiuzMms4178AwArmZmkkdGcAAAAASUVORK5CYII=';
    
    canvas5.addEventListener('mousedown', handleMouseDown, false);
    canvas5.addEventListener('touchstart', handleMouseDown, false);
    canvas5.addEventListener('mousemove', handleMouseMove, false);
    canvas5.addEventListener('touchmove', handleMouseMove, false);
    canvas5.addEventListener('mouseup', handleMouseUp, false);
    canvas5.addEventListener('touchend', handleMouseUp, false);
    
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
      
      var pixels   = ctx5.getImageData(0, 0, canvasWidth5, canvasHeight5),
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
    
    function getMouse(e, canvas5) {
      var offsetX = 0, offsetY = 0, mx, my;
  
      if (canvas5.offsetParent !== undefined) {
        do {
          offsetX += canvas5.offsetLeft;
          offsetY += canvas5.offsetTop;
        } while ((canvas5 = canvas5.offsetParent));
      }
  
      mx = (e.pageX || e.touches[0].clientX) - offsetX;
      my = (e.pageY || e.touches[0].clientY) - offsetY;
  
      return {x: mx, y: my};
    }
    
    function handlePercentage(filledInPixels) {
      filledInPixels = filledInPixels || 0;
      console.log(filledInPixels + '%');
      if (filledInPixels > 50) {
        canvas5.parentNode.removeChild(canvas5);
      }
    }
    
    function handleMouseDown(e) {
      isDrawing = true;
      lastPoint = getMouse(e, canvas5);
    }
  
    function handleMouseMove(e) {
      if (!isDrawing) { return; }
      
      e.preventDefault();
  
      var currentPoint = getMouse(e, canvas5),
          dist = distanceBetween(lastPoint, currentPoint),
          angle = angleBetween(lastPoint, currentPoint),
          x, y;
      
      for (var i = 0; i < dist; i++) {
        x = lastPoint.x + (Math.sin(angle) * i) - 25;
        y = lastPoint.y + (Math.cos(angle) * i) - 25;
        ctx5.globalCompositeOperation = 'destination-out';
        ctx5.drawImage(brush5, x, y);
      }
      
      lastPoint = currentPoint;
      handlePercentage(getFilledInPixels(32));
    }
  
    function handleMouseUp(e) {
      isDrawing = false;
    }
    
  })();