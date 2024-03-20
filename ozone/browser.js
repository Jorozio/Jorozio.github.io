
function getBrowserInfo() {
    var ua = navigator.userAgent, tem,
    M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
       tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
       return 'IE '+(tem[1] || '');
    }
    if(M[1] === 'Chrome'){
       tem = ua.match(/\bOPR|Edge\/(\d+)/)
       if(tem != null) return 'Opera ' + tem[1];
    }
    M = M[2] ? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
    console.log(M[1])
    return M[1];
   
   }
   
   
   function errorMsg() {
     let browserName = getBrowserInfo();
     if (browserName !== '122') {
       const errorImg = document.getElementById("error-img")
       const errorTxt = document.getElementById("error-txt")
       errorImg.style.display = 'block'
       errorTxt.style.display = 'block'
   
        var coverDiv = document.createElement('div');
        coverDiv.style.position = 'fixed';
        coverDiv.style.top = '0';
        coverDiv.style.left = '0';
        coverDiv.style.width = '100vw';
        coverDiv.style.height = '100vh';
        coverDiv.style.backgroundColor = 'rgb(0, 0, 0)'; // Example background color
        coverDiv.style.zIndex = '999'; // Ensure it's on top of other content
        document.body.appendChild(coverDiv);
     }
    }
    
    // Call the function to check the browser and display the div if necessary
    document.addEventListener('DOMContentLoaded', function() {
     errorMsg();
    });
    
    function windowResized() {
        location.reload(); // Refresh the page
      
       }