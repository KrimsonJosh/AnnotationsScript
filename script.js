(function autoSelectStronglyAgree() {
  
  const clickedButtons = new Set();
  const intervalTime = 1000; 
  const duration = 3000; 
  let intervalId = null;
  let observer = null;  

  function selectStronglyAgree() {
   
    const forms = document.querySelectorAll('form');

    forms.forEach((form) => {
      const agreeButtons = form.querySelectorAll('input[type="radio"][value="Strongly Agree"]');
      agreeButtons.forEach((input) => {
        if (!input.checked && !clickedButtons.has(input)) {
          input.click();
      
          clickedButtons.add(input);
        }
      });
    });
  }


  function startContinuousSelection() {
    selectStronglyAgree();
    
    intervalId = setInterval(selectStronglyAgree, intervalTime);

    observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
          selectStronglyAgree();
        }
      }
    });

 
    observer.observe(document.body, { childList: true, subtree: true });

   
    setTimeout(stopContinuousSelection, duration);
  }


  function stopContinuousSelection() {
    if (intervalId) {
      clearInterval(intervalId);
    }

    if (observer) {
      observer.disconnect();
    }
  }

  startContinuousSelection();

})();
