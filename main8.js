(function() {
  
    'use strict';
    
    var isDrawing, lastPoint;
    var container8    = document.getElementById('js-container8'),
        canvas8       = document.getElementById('js-canvas8'),
        canvasWidth8  = canvas8.width,
        canvasHeight8 = canvas8.height,
        ctx8          = canvas8.getContext('2d'),
        image8        = new Image(),
        brush8        = new Image();
        
    // base64 Workaround because Same-Origin-Policy
    image8.src = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCACWAJYDASIAAhEBAxEB/8QAHAABAAEFAQEAAAAAAAAAAAAAAAECAwUGBwQI/8QAPxAAAQMDAgMEBwUFCAMAAAAAAQACAwQFEQYhEjFBBxNRYRQiMnGBkaEVJEJSwTNicoKxCBYjQ1NzosKSsvD/xAAZAQADAQEBAAAAAAAAAAAAAAAAAQIDBAX/xAAlEQACAgEDAwQDAAAAAAAAAAAAAQIRAxIhMQQTQSIjMlEUJJH/2gAMAwEAAhEDEQA/AOBoiKyQiIkwClESAIinCQEIpwmEAQinChCAhFKJgQiImgCIiYBERABERJgSiKQpAlThMKoBKxopwpwqgFnaLR2orjbftCis9RLSbkSgABwHPAJyR7lMpxjy6Got8GAwmFnYNI6gn4e7tFZg9XR8A+ZwvV/cPUn4qCMfxVkLf6vWfex38l/S+1P6NYwows5U6T1BSsdJJZ6p0QBJlhZ3rAPNzMgLC+0tVJPghprlFvChXCFBCaEUKFWqU0IhERUgCIiYAKURQBIVQQKoBJsYAVYCgLcqXQU0tK2SouLKSZ4yGOhLmNPQPcDkeeGux5pJOXA0zUOH1Xe5fVGnNU6ZrNJ0VTBcaOmhgp2tfA+RrDCWtALS3PTHTn0XzHU0U9FWzUlTE6OaCQxyxnfhc04IyOfLmFSIm/lXF1OGOZJSfBrjlo3R1S89sQ9PqIbdZ4JaZjyGTSyuBkAOx4QNsrEntSMv7fT8Tv8Abqi3+rCtEbE572taxznHkAMknyC9U1nudPTuqJrZXRQAZMr6d7WAeOSMYULpcC20mneycpm5w610/VSsdNT11tm4tnt4ZmsPjxN4XD4NJXtraCkv9I6pl9Gu9PsDVRvxPGTyy/HGDvsJAR+6uY8KvUNdWWqsFVRVD4J27B7DzHUEciD1ByD1VfjrnE6ZS6hvbIrR675pqS0h1TA909CSBxlvC+InkHjofBwyD5HIGAIXYbFX0mrbfKRFGyrYzhrKYD1HtO3E39045c2kfwlcyv1pfZLvUUbuJzW+tE534mnkT58x7wVfT55Sk8eTlEZsKS1w4MSVQrhCoK7FwcpChSoKYBERMCVIUKQkMrCrAVIVbVDY0VA8PrN9obj3hd8u4prXZW3G58UcTI2GTuWcTi52BhoJG+T1IHmuC/gcvo7tSoG1XZXHcaT1ovu0x4fyuIGfqFpinpTG0cKulc673eruLomxuqJC4Rg5DByAz1w0AZ64yq7Va57tdaa3UjeKaokETM8sk8z5Dn8F5o2rb+zuogoNd2eebhazvSzJ5AuBaD8yF508nk2jHY60KfR3ZFa6d00XpFzlG0gYHTykYyQT7Lc48PirNv7bNPVlU2Gto66iY84794a9jffg5A88Fa/2z2itffKS6d1JJRGmEPGBkRvDnEg+GQQfPB8FzCGilqqiOmpopJ5pDhkUTeJzj4ABYOUZladrOs9rHZ9bZbJNqizQxRTwgS1LIAAyeMneQAbAjPFkcxnOThcJc1fUN1pnaf7EaqhuL2tnhsxpXb5AkdH3bWg9fWcGhfMsjV0xtIhGR0ZcXWnV1vl/ypJRBKOjmPIBz7iQ74LcO2izNo5LXWtZ+044T54wR/UrRLLSSVmorbTQt4nyVUTBj+Ib/Lf4Lrfb+5kVuskH431Eknwa0D+rllNfswkjSEvbaODkKgq45UFekjkLaKSoTAhERMRKrCoVYSAqarjVbarjVDKL7F9H9l16t+rezuTTVz9d1NEaOZpO7onAhpB8cbZ8QvnBi3zs1iroL+26wS9xSQ5jnyM9+CMmMDx5Hi/Dsd+RWO3LTRXizwah01XaTvk1rrcng3hmA9WaM8nj9R0OQvLA1dg11frDVadbTXqJ0tW4F1H3RAlYeXFk8m7ddjhcggcuLq4aJUmb4nZ1nTfafJHSMor7TuqowOH0hmC4j95p2Pv+i2VvaPo22xOkp2ua/G8cNGWuPlnAH1XE4puBW538S8yKalZu4RaM/r3X1Xq50dLFC6ktkL+JsHFl0juQc8jwB2A2GTz2xz+ULITFe7Ss+nafUUEmpqeee3t3LYt2h2di9vNzfEDn4EZC74Sb3MJJJUb72M6DmmrY9V3GIxwRj7hG4YLydjJ/CBkDxyTywTp3a/qWPUmtpG07uOit7fRo3A7OcDl5Hx2+C+gL6KnUeiKhuk7lTsfUQ4p52bsLerQR7JI2z08F8kVlJPQVc1JVxSQVEDzHLE8YLCOYK3xOMpX9GXg8ZVsq4VbK60ZlBUKSoVoRCIiYiVIUKQkMuBVtVsKsKB2eulhdVVEcEftyPDR7ycZK6aa6DTNn75rGubABFBC7lJIckcWOmxcfHGNshaJpWPvb7C7/AE2Pd8cY/VZfWNR94oIPwiN8vllzsf8AT6rSHog5+QW5ipq2evq5qurmdPUSnifK7m48vgMAAAbAAAbBemm72WWOKNjpHvIDWjcknoFiWOW2aL4ftOapd7ULAG+Rdnf5A/NcSxdydeTdT0o6Lpjsvoqil9Jv1zMW2TBA4N4B5vP6D4rZGdmuia9jo6F/fyAbmKuLnDzwDj6Li+rL9U19zkpnSu9Fgw1sWdicbkjqVr7Kh1PK2aB7opWHLZGOLXNPiHDcH3K5LFjlpURLU9zfNc9nlTpeL02kmkqbfkCTvAOOHOwJI2c3zAGM8uq53I5fSHZ3dna+0BU0t3/x6iFz6KaVw3lBYCHHzw4AnqW56r5sqm9xUTQ/6b3Mz44JH6IniikpRFrb2ZtnZ9rup0demCSVzrTUPAqoCdm527wDo4dfEfBbn26abglp6LVlE1p4y2GpLeTwRlj/APrnzauKvK7zFP8Abn9neYVHrvioXbnc5idkH/iFx5/ZyRyLy6LirTPn0qgqolUFepFHNRSVCFCmBCIiYiUUBSkBWFUCrYVYKVWMzulpe6v8DXf5ge344J/RZfWcPDLQVP4Sx8JPTLTkf+5+RWoU87qWoinj9uN4c33g5wunTU1NqOy9y2ZsbagCWnmecCOQZA4j0G5afDJPRaQjqxuIWc6a5bBpa4Npbk6GR/C2cBoJ/MDsPqR8lr1RBPRVU1NVxPiqIXlskcgwWkcwVQHLmjcZakaNpqjd73Yp6qrdV0XDI5+O8jJDTkbZBO3JY+l0pe62URtp44R1fNUMa1o8Tvk/ygnyXmoNWV1ExsczG1LBy4jwu/8ALf6hZePXkEXrfZMkj/OsAHxxHkj5LZxwy9Te5KbSo6lp65UPZ1ouoa2Xve7DpppccPfzOAAwDyGzWjO+BnmSvnyWZ0r3SO9t5Lne8nJWTvuprhfnxtqnMjp4zmKngBDGnGM7kknzcSegwNlhS5TNp8AnW5cZHLUSthgY+SV5w1jGklx8ABzXbDI6w9h1RSVB4JjROY5juYdIcY9/rfRc10LWQUt7m7zhbPJTllOScevxNJA8yAR57jqtp1td436VmpJv2sjmd007HIIOce7K8jrHKWfHira0zu6eC7UptnKiVSUJVBXsLZHnXe4RFCYBERMApUImwJUhQikC4Ctl0pqOK1y+hV/F9nzHPeNHE6B5/EB1HLLfLI3GDq+VVlNScXaGdWvtlgvNLFM6WOQ8AFPXQEPD2DYAn8QHLBw5vLbGFolZp25UfF93M7Pzwet9OY+S8duvFwtbneh1DmNJy6P2mOPmDtnz5rYaXW49mtovW/NAef8AKeXzVvRP5cgas7MbuGQFjvBwwfkVT3jfzj5rf49V2aX2pnx/7kTjj5ArIUuq7RH+yv0dN7o52n/jGUuzH7Czn9utFwuksfo9PL3Tzgzlh7tg6kuxj/7CzVx0bLS0Uk9NV9++Nhc6Mx44gOeNz8lsFz1rastLrjVXKXpwxu4R/NIWn6LEXHWlI+3yR0UUvfyMLcvaAGZGMnc5KajjUQNKJUF/F7XrdNznZQqSsqAFQiJoRCIipAEREwCIiAClQiTAlFClSBOUyoRAFeUyqEQBOUyoRABEUIAlQiKkARETAIiIAIiIAIiIAIiIAIiJMAiIkARETQBERMAiIgAiIgAiIgD/2Q==';
    image8.onload = function() {
      ctx8.drawImage(image8, 0, 0);
      // Show the form when Image is loaded.
      document.getElementById('form8').style.visibility = 'visible';
    };
    brush8.src = 'data:image/png;base64,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';
    
    canvas8.addEventListener('mousedown', handleMouseDown, false);
    canvas8.addEventListener('touchstart', handleMouseDown, false);
    canvas8.addEventListener('mousemove', handleMouseMove, false);
    canvas8.addEventListener('touchmove', handleMouseMove, false);
    canvas8.addEventListener('mouseup', handleMouseUp, false);
    canvas8.addEventListener('touchend', handleMouseUp, false);
    
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
      
      var pixels   = ctx8.getImageData(0, 0, canvasWidth8, canvasHeight8),
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
    
    function getMouse(e, canvas8) {
      var offsetX = 0, offsetY = 0, mx, my;
  
      if (canvas8.offsetParent !== undefined) {
        do {
          offsetX += canvas8.offsetLeft;
          offsetY += canvas8.offsetTop;
        } while ((canvas8 = canvas8.offsetParent));
      }
  
      mx = (e.pageX || e.touches[0].clientX) - offsetX;
      my = (e.pageY || e.touches[0].clientY) - offsetY;
  
      return {x: mx, y: my};
    }
    
    function handlePercentage(filledInPixels) {
      filledInPixels = filledInPixels || 0;
      console.log(filledInPixels + '%');
      if (filledInPixels > 50) {
        canvas8.parentNode.removeChild(canvas8);
      }
    }
    
    function handleMouseDown(e) {
      isDrawing = true;
      lastPoint = getMouse(e, canvas8);
    }
  
    function handleMouseMove(e) {
      if (!isDrawing) { return; }
      
      e.preventDefault();
  
      var currentPoint = getMouse(e, canvas8),
          dist = distanceBetween(lastPoint, currentPoint),
          angle = angleBetween(lastPoint, currentPoint),
          x, y;
      
      for (var i = 0; i < dist; i++) {
        x = lastPoint.x + (Math.sin(angle) * i) - 25;
        y = lastPoint.y + (Math.cos(angle) * i) - 25;
        ctx8.globalCompositeOperation = 'destination-out';
        ctx8.drawImage(brush8, x, y);
      }
      
      lastPoint = currentPoint;
      handlePercentage(getFilledInPixels(32));
    }
  
    function handleMouseUp(e) {
      isDrawing = false;
    }
    
  })();