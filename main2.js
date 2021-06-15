(function() {
  
    'use strict';
    
    var isDrawing, lastPoint;
    var container2    = document.getElementById('js-container2'),
        canvas2       = document.getElementById('js-canvas2'),
        canvasWidth2  = canvas2.width,
        canvasHeight2 = canvas2.height,
        ctx2          = canvas2.getContext('2d'),
        image2        = new Image(),
        brush2        = new Image();
        
    // base64 Workaround because Same-Origin-Policy
    image2.src = 'data:image/jpeg;base64,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';

    image2.onload = function() {
      ctx2.drawImage(image2, 0, 0);
      // Show the form when Image is loaded.
      document.getElementById('form2').style.visibility = 'visible';
    };

    brush2.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAAxCAYAAABNuS5SAAAKFklEQVR42u2aCXCcdRnG997NJtlkk83VJE3apEma9CQlNAR60UqrGSqW4PQSO9iiTkE8BxWtlGMqYCtYrLRQtfVGMoJaGRFliijaViwiWgQpyCEdraI1QLXG52V+n/5nzd3ENnX/M8/sJvvt933/533e81ufL7MyK7NOzuXPUDD0FQCZlVn/+xUUQhkXHny8M2TxGsq48MBjXdAhL9/7YN26dd5nI5aVRrvEc0GFEBNKhbDjwsHh3qP/FJK1EdYIedOFlFAOgREhPlICifZDYoBjTna3LYe4xcI4oSpNcf6RvHjuAJRoVszD0qFBGmgMChipZGFxbqzQkJWVZUSOF7JRX3S4LtLTeyMtkkqljMBkPzHRs2aYY5PcZH/qLY1EIo18byQ6hBytIr3WCAXcV4tQHYvFxg3w3N6+Bh3OQolEoqCoqCinlw16JzTFJSE6PYuZKqvztbC2ex7bzGxhKu+rerjJrEEq+r9ieElJSXFDQ0Mh9zYzOzu7FBUWcO4Q9xbD6HYvhXhGLccVD5ZAPyfMqaioyOrBUgEv8FZXV8caGxtz8vLykhCWTnZIKmsKhUJnEYeKcKk2YYERH41G7UYnck1/WvAPOxsdLJm2+bEY0Ay0RNeqkytXQkoBZM4U5oOaoYSUkBGRtvnesrBZK4e4F6ypqSkuLy+v4KI99ZQxkfc6vZ4jNAl1wkbhG8LrhfNBCdkxmhYacvj/GOce+3K9MHHbDHUmicOufREELRIWch/DljzMsglutr+VIJO5KjGrVfZAnpF8mnCd8G5hrnC60Cl8T/iw8C1hKd9P9eDCMcgo5HwBx8BB/g7xeRPkrBbeJ3xTeAxjvRGVV3NcshfPG1JX4tVDQae47GuVOknCi23xHr5nyrxe2C1sFlYJ7xe+Jlwm7BRulItP0ms957RzTMK1ws41jMS8eDxehopaOCYfxc3AIHcIX+K6nxW+ImyVF1i8PQ8DTuwtdC1atCja3NwcHkq5EuXmo85G+jq+yMm28V4q/zcIPxV+K9zPxnbgTi0ocybu6wX66fx/vfAB4T1gHt8xI1wlXMF5zEXnQKC56ruEjwhvEa4WrrXvK/Yt5Pt5I1UveeVKyKmT+lpG2gQ2npMmez8ZzFT3e+HXwj7hKXNf6rFZbDpJUjESLdFsFX4mfFv4Fd/7qPBm4UPCJ4RNwncwym4UfYVUtiAcDk/T+3NRmylwWzAY7BCBCwYYogZPnrJoRNm2IDc3tw4FVKXFm95UmGLzkTTFpog524WnhQPCQeGvwiPCCuFCYmk5GbEJt3tOeF54HPVeLLyXxHOv8BPhYaFLeFU4gsI7OWeZk3g+hpJNvVMGIIqhdRvy+biVISouq2TBqWxoIL1wgBhU5AR1SzJvFR4UnhX+Bl4RfsFGP0npUkTymIQ7fh8Cf4l6F0LgXkj6o3O+buGfwj+ElzGQETaNeJqPhxiahckYq8KJ9V6mP+4pTIATjsGCA8lCQVy9VbhB2CM8itu9IBxlkx6O4nbmmpcSi0KUExa3Psfn23DZC4lhlhRuIWs/R1Y9BrpR4WHcfiOq34bLl5DJm1B7BANPGO4+2OJfDcVwX+RZkL5d+DRqeRJ360IJx1CFp4w/8/lhVGXxay1xKp8asQ31rSbgz2az1aBBWCZsgKTfEFe7uM4xYus9KHWXcBv3eolwJe67hJLIN6yubMVpW1tbbllZWVxtzjRquvQe9981IG3RZHUQttH7hB8IP0cdLwp/YnNHcdsjEP1xsEruO56i2Fy3UWXMskAgYAH/EjOiCD6NDc/XZ4v12RqSy3WQ9rJD3jPClwkZz2Aoy8JnUEjPcwYWfgfHvcIW84h308mABQP4Xp02OY44M4tSZSfx7UXIewU3NpXuxw0vJzauYDP1XM8y8Ttx67fhylYrdlAMW1x7h/BF3NWI+4PwFwjbSha26/xQuBmib6HDqeI+m4m5wzrj9A/xO+O5qbm4yizcbDOKfAjVWeC/WzAFLSeI+4hN9WzQ65EvED7D8Tt4vwE33O64rIfD1JW3k6xeQoX3UN6chyG8In4tcbHuRAyKw2ktVIIM2U5XcA7t2FKy5vWQeBexbbrTpvmZiJwN6e3EwKspW/ajqBuAKfKQk8m7KIce5bgnMNQDkLWPUmkj511DSVV5HJOd417FzrDAK7RjZLMZiURigmLVFCYs5tI2PFhpcUj/n6z6sp72LwJKiU2rUdp62rA7IX4XytpJ3Weh4XfE1/0kk/uoFX8kbCHudZLld5E8vJIs2+mbT8iznaR60DHMBt0EE1DySVlSsOBvyrL6zkZG5qI2T/QSBYTHMYAlq2tw1+0MFO4kVj5GSbSbgvkA8fQQr1uIdfdD5mZ1GhZbP0XfuwlPmOp0SNkYbkQV2JdlEsq69VJS+rTER+NtZVC+TX+NRFq1XGeiHXbGUHMg6lk2/DiZ+mHU8wTueoTXLtS3F5e9l2PNZW9lyrOB5LGSmJokzMQ6OjqCA3wsMXLLhqrWoZgKe3lyZ5YtLiwsLLfMLhJL0ibW3rKa7oMQ+Ajq6gKHcMeHeP8qZcpRMvyt1J97SRabcNP1ZGsbKhSb6lF+5GR6shUnlqTSyPM7LZxV/PUqjOfTH6cvqx+XyN3aCfBPUWh3UZIcxC2/jgu/BJ7Eve/G1R/EXS9gaLCc0dgySqIm7jV4MhEYdAaN4R4eRHkBusJp3GNp56iSOscyYN0DaUch8Ai13X6yrg0PvotCO8nme0geKymBaulc1qO+NbxOOpHZtrcHR+nT6+wePvcnk8k8qv6iNBdyH4/OoGR5gXbv75D4NIX3NoruLSjtKmLlbTwCKER1NmV+QIqfS13aai0izUHsRKksAQE5g0w4fuehj9f+xb25Ym1tbcIhuw2COmkBn2cAcQAFbsclV1BTns49JZio3EQWPkgCySJpFIu8aor0UfeLigDTlUTa/8eimhRGuUiKOZPYtYNabh9EGik3Mkk+A9I8JTWoAiik/LEpzY8tY4uwWc4AJMjxQd8oXRHU8JqbW32orNyAiubZo0WR5wX9KyHrLpLD52nrxhFHa1CVV5w3081cRu/7BYichpEqfafA7/sCzhT7tVkhLZvhTeB8Gv1r6U+ty/gqtWHQCSNTcPOl9NmXM1S4hgRjBjjL1MdUJ8cx3uhe3d3dfh5Meb8qyKWsuJRidwtN/h20XEtxvTwya7tKncU8ACqmXVwLict5fy6TnFhra2uW7xT8dWk2BHptVBOx8GLKjo3g7bhrBQq1sdVsCvEkhLZIac1y/zmUSO0oO8fX/0P2Ub3cwaWpZSITnLnOpDlBWTIfMleJqFb10jXCBJUlMyORSIP14LhqNef6v/05bpZTdHulUyXKsufDNdRxZ4vIhSKwhQFG5vfLfcwZsx2X92Jhje8/P8OI+TK/oO+zeA84WTzkvI/6RuB3y6f68qf11xnyMiuzMms4178AwArmZmkkdGcAAAAASUVORK5CYII=';
    
    canvas2.addEventListener('mousedown', handleMouseDown, false);
    canvas2.addEventListener('touchstart', handleMouseDown, false);
    canvas2.addEventListener('mousemove', handleMouseMove, false);
    canvas2.addEventListener('touchmove', handleMouseMove, false);
    canvas2.addEventListener('mouseup', handleMouseUp, false);
    canvas2.addEventListener('touchend', handleMouseUp, false);
    
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
      
      var pixels   = ctx2.getImageData(0, 0, canvasWidth2, canvasHeight2),
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
    
    function getMouse(e, canvas2) {
      var offsetX = 0, offsetY = 0, mx, my;
  
      if (canvas2.offsetParent !== undefined) {
        do {
          offsetX += canvas2.offsetLeft;
          offsetY += canvas2.offsetTop;
        } while ((canvas2 = canvas2.offsetParent));
      }
  
      mx = (e.pageX || e.touches[0].clientX) - offsetX;
      my = (e.pageY || e.touches[0].clientY) - offsetY;
  
      return {x: mx, y: my};
    }
    
    function handlePercentage(filledInPixels) {
      filledInPixels = filledInPixels || 0;
      console.log(filledInPixels + '%');
      if (filledInPixels > 50) {
        canvas2.parentNode.removeChild(canvas2);
      }
    }
    
    function handleMouseDown(e) {
      isDrawing = true;
      lastPoint = getMouse(e, canvas2);
    }
  
    function handleMouseMove(e) {
      if (!isDrawing) { return; }
      
      e.preventDefault();
  
      var currentPoint = getMouse(e, canvas2),
          dist = distanceBetween(lastPoint, currentPoint),
          angle = angleBetween(lastPoint, currentPoint),
          x, y;
      
      for (var i = 0; i < dist; i++) {
        x = lastPoint.x + (Math.sin(angle) * i) - 25;
        y = lastPoint.y + (Math.cos(angle) * i) - 25;
        ctx2.globalCompositeOperation = 'destination-out';
        ctx2.drawImage(brush2, x, y);
      }
      
      lastPoint = currentPoint;
      handlePercentage(getFilledInPixels(32));
    }
  
    function handleMouseUp(e) {
      isDrawing = false;
    }
    
  })();